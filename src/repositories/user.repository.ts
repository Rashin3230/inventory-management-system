import { User, type IUser } from "@/models/User";
import { hashPassword } from "@/lib/auth/password";
import type { CreateUserInput, UpdateUserInput } from "@/validators/user.schema";
import type { SafeUser } from "@/types";

function toSafeUser(user: IUser): SafeUser {
  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export class UserRepository {
  async findByEmail(email: string, includePassword = false): Promise<IUser | null> {
    const query = User.findOne({ email: email.toLowerCase() });
    if (includePassword) {
      query.select("+password");
    }
    return query.exec();
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id).exec();
  }

  async findByIdSafe(id: string): Promise<SafeUser | null> {
    const user = await this.findById(id);
    return user ? toSafeUser(user) : null;
  }

  async create(data: CreateUserInput): Promise<SafeUser> {
    const hashedPassword = await hashPassword(data.password);
    const user = await User.create({
      ...data,
      email: data.email.toLowerCase(),
      password: hashedPassword,
    });
    return toSafeUser(user);
  }

  async update(id: string, data: UpdateUserInput): Promise<SafeUser | null> {
    const updateData: UpdateUserInput & { password?: string } = { ...data };

    if (data.password) {
      updateData.password = await hashPassword(data.password);
    }

    if (data.email) {
      updateData.email = data.email.toLowerCase();
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).exec();

    return user ? toSafeUser(user) : null;
  }

  async count(): Promise<number> {
    return User.countDocuments().exec();
  }
}

export const userRepository = new UserRepository();
