export const APP_NAME = "Inventory Management System";

export const USER_ROLES = {
  ADMIN: "admin",
  STAFF: "staff",
} as const;

export const PRODUCT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  DISCONTINUED: "discontinued",
} as const;

export const STOCK_MOVEMENT_TYPES = {
  PURCHASE: "purchase",
  SALE: "sale",
  ADJUSTMENT: "adjustment",
} as const;

export const DEFAULT_PAGE_SIZE = 10;

export const LOW_STOCK_THRESHOLD_MULTIPLIER = 1;
