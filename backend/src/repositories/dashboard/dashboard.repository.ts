import { Product } from "@/models/Product";
import { Purchase } from "@/models/Purchase";
import { PurchaseItem } from "@/models/PurchaseItem";
import { Sale } from "@/models/Sale";
import { SaleItem } from "@/models/SaleItem";
import { StockMovement } from "@/models/StockMovement";
import { STOCK_MOVEMENT_TYPES } from "@/utils/constants";
import type {
  DashboardCharts,
  DashboardSummary,
  LowStockProduct,
  RecentActivityItem,
} from "@/types/dashboard";

function getTodayRange() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

function getMonthsAgo(months: number) {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export class DashboardRepository {
  async getSummary(): Promise<DashboardSummary> {
    const { start, end } = getTodayRange();

    const [totalProducts, stockStats, lowStockProducts, todaysPurchases, todaysSales] =
      await Promise.all([
        Product.countDocuments(),
        Product.aggregate<{ totalStock: number; inventoryValue: number }>([
          {
            $group: {
              _id: null,
              totalStock: { $sum: "$currentStock" },
              inventoryValue: {
                $sum: { $multiply: ["$currentStock", "$costPrice"] },
              },
            },
          },
        ]),
        Product.countDocuments({
          $expr: { $lte: ["$currentStock", "$minimumStock"] },
        }),
        Purchase.countDocuments({ date: { $gte: start, $lte: end } }),
        Sale.countDocuments({ date: { $gte: start, $lte: end } }),
      ]);

    const stats = stockStats[0] ?? { totalStock: 0, inventoryValue: 0 };

    return {
      totalProducts,
      totalStock: stats.totalStock,
      lowStockProducts,
      todaysPurchases,
      todaysSales,
      inventoryValue: Math.round(stats.inventoryValue * 100) / 100,
    };
  }

  async getLowStockProducts(limit = 10): Promise<LowStockProduct[]> {
    const products = await Product.find({
      $expr: { $lte: ["$currentStock", "$minimumStock"] },
    })
      .sort({ currentStock: 1 })
      .limit(limit)
      .select("sku name category currentStock minimumStock")
      .lean();

    return products.map((p) => ({
      _id: p._id.toString(),
      sku: p.sku,
      name: p.name,
      category: p.category,
      currentStock: p.currentStock,
      minimumStock: p.minimumStock,
    }));
  }

  async getRecentActivity(limit = 10): Promise<RecentActivityItem[]> {
    const [purchases, sales, adjustments] = await Promise.all([
      Purchase.find()
        .sort({ date: -1 })
        .limit(limit)
        .populate("supplier", "supplierName")
        .lean(),
      Sale.find().sort({ date: -1 }).limit(limit).lean(),
      StockMovement.find({ type: STOCK_MOVEMENT_TYPES.ADJUSTMENT })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate("productId", "name")
        .populate("createdBy", "name")
        .lean(),
    ]);

    const purchaseIds = purchases.map((p) => p._id);
    const saleIds = sales.map((s) => s._id);

    const [purchaseItems, saleItems] = await Promise.all([
      PurchaseItem.find({ purchaseId: { $in: purchaseIds } })
        .populate("productId", "name")
        .lean(),
      SaleItem.find({ saleId: { $in: saleIds } })
        .populate("productId", "name")
        .lean(),
    ]);

    const purchaseItemMap = new Map<string, typeof purchaseItems>();
    for (const item of purchaseItems) {
      const key = item.purchaseId.toString();
      if (!purchaseItemMap.has(key)) purchaseItemMap.set(key, []);
      purchaseItemMap.get(key)!.push(item);
    }

    const saleItemMap = new Map<string, typeof saleItems>();
    for (const item of saleItems) {
      const key = item.saleId.toString();
      if (!saleItemMap.has(key)) saleItemMap.set(key, []);
      saleItemMap.get(key)!.push(item);
    }

    const activities: RecentActivityItem[] = [];

    for (const purchase of purchases) {
      const items = purchaseItemMap.get(purchase._id.toString()) ?? [];
      const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
      const productName =
        items.length === 1
          ? ((items[0].productId as { name?: string })?.name ?? "Product")
          : items.length > 1
            ? `${items.length} products`
            : "Purchase order";

      activities.push({
        id: purchase._id.toString(),
        type: "purchase",
        product: productName,
        quantity: totalQty || 1,
        user: "System",
        date: purchase.date.toISOString(),
        referenceNumber: purchase.purchaseNumber,
      });
    }

    for (const sale of sales) {
      const items = saleItemMap.get(sale._id.toString()) ?? [];
      const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
      const productName =
        items.length === 1
          ? ((items[0].productId as { name?: string })?.name ?? "Product")
          : items.length > 1
            ? `${items.length} products`
            : sale.customerName;

      activities.push({
        id: sale._id.toString(),
        type: "sale",
        product: productName,
        quantity: totalQty || 1,
        user: "System",
        date: sale.date.toISOString(),
        referenceNumber: sale.salesNumber,
      });
    }

    for (const movement of adjustments) {
      activities.push({
        id: movement._id.toString(),
        type: "adjustment",
        product:
          (movement.productId as { name?: string })?.name ?? "Unknown product",
        quantity: movement.quantity,
        user: (movement.createdBy as { name?: string })?.name ?? "Unknown",
        date: movement.createdAt.toISOString(),
        referenceNumber: movement.referenceNumber,
      });
    }

    return activities
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }

  async getCharts(): Promise<DashboardCharts> {
    const since = getMonthsAgo(5);

    const [categoryAgg, salesAgg, purchaseAgg] = await Promise.all([
      Product.aggregate<{ _id: string; value: number }>([
        {
          $group: {
            _id: "$category",
            value: {
              $sum: { $multiply: ["$currentStock", "$costPrice"] },
            },
          },
        },
        { $sort: { value: -1 } },
      ]),
      Sale.aggregate<{ _id: { year: number; month: number }; amount: number }>([
        { $match: { date: { $gte: since } } },
        {
          $group: {
            _id: { year: { $year: "$date" }, month: { $month: "$date" } },
            amount: { $sum: "$totalAmount" },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
      Purchase.aggregate<{ _id: { year: number; month: number }; amount: number }>([
        { $match: { date: { $gte: since } } },
        {
          $group: {
            _id: { year: { $year: "$date" }, month: { $month: "$date" } },
            amount: { $sum: "$totalAmount" },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
    ]);

    return {
      inventoryValueByCategory: categoryAgg.map((c) => ({
        category: c._id,
        value: Math.round(c.value * 100) / 100,
      })),
      monthlySalesTrend: salesAgg.map((s) => ({
        month: `${MONTH_LABELS[s._id.month - 1]} ${s._id.year}`,
        amount: Math.round(s.amount * 100) / 100,
      })),
      monthlyPurchaseTrend: purchaseAgg.map((p) => ({
        month: `${MONTH_LABELS[p._id.month - 1]} ${p._id.year}`,
        amount: Math.round(p.amount * 100) / 100,
      })),
    };
  }
}

export const dashboardRepository = new DashboardRepository();
