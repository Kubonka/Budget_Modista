import prisma from "../db/db";

import PriceRepo from "./PriceRepo";
import UserRepo from "./UserRepo";

type TOptions = { active: boolean };
type TSubcategoryRepo = {
	create(body: Subcategory): Promise<TStatusMessage>;
	update(body: Subcategory): Promise<TStatusMessage>;
	getAll(options: TOptions): Promise<Subcategory[]>;
	getByCategory(category: Category, options: TOptions): Promise<Subcategory[]>;
	delete(body: Subcategory): Promise<TStatusMessage>;
	getAllWithCat(): Promise<Subcategory[]>;
};
class SubcategoryRepo implements TSubcategoryRepo {
	private static instance: SubcategoryRepo | null = null;
	public static getInstance(): SubcategoryRepo {
		if (!SubcategoryRepo.instance) {
			SubcategoryRepo.instance = new SubcategoryRepo();
		}
		return SubcategoryRepo.instance;
	}
	public async create(body: Subcategory): Promise<TStatusMessage> {
		const newSubcategory = await prisma.subcategory.create({
			data: {
				name: body.name as string,
				categoryId: body.categoryId as number,
				userId: body.userId,
			},
		});
		if (newSubcategory) {
			const priceRepo = PriceRepo.getInstance();
			await priceRepo.create({
				value: 0,
				subcategoryId: newSubcategory.id,
				userId: body.userId,
			});
			return { status: "SUCCESS", message: "Subcategory created" };
		}
		return { status: "ERROR", message: "Subcategory failed to create" };
	}
	public async getAll({ active }: TOptions): Promise<Subcategory[]> {
		const userId = await UserRepo.getInstance().getUserIdFromSession();
		if (!userId) return [];
		if (active)
			return await prisma.subcategory.findMany({
				where: { active: true, userId },
			});
		return await prisma.subcategory.findMany({ where: { userId } });
	}
	public async getByCategory(
		category: Category,
		{ active }: TOptions
	): Promise<Subcategory[]> {
		if (active)
			return await prisma.subcategory.findMany({
				where: { categoryId: category.id, active: true },
			});
		return await prisma.subcategory.findMany({
			where: { categoryId: category.id },
		});
	}
	public async update(body: Subcategory): Promise<TStatusMessage> {
		const res = await prisma.subcategory.update({
			where: { id: body.id },
			data: { name: body.name },
		});
		if (!res)
			return { status: "ERROR", message: "Failed to update Subcategory" };
		return { status: "SUCCESS", message: "Subcategory updated" };
	}
	public async delete(body: Subcategory): Promise<TStatusMessage> {
		try {
			const res = await prisma.subcategory.update({
				where: { id: body.id },
				data: { active: false, price: { update: { active: false } } },
				include: { price: true },
			});
			if (!res)
				return { status: "ERROR", message: "Failed to delete Subcategory" };
			const allSubs = await prisma.subcategory.findMany({
				where: { categoryId: body.categoryId, active: true },
			});

			if (!allSubs.length) {
				await this.create({
					id: 0,
					name: "default",
					categoryId: body.categoryId,
					active: true,
					userId: body.userId,
				});
			}
			return { status: "SUCCESS", message: "Subcategory deleted" };
		} catch (error) {
			return { status: "ERROR", message: "Failed to delete Subcategory" };
		}
	}
	public async getAllWithCat(): Promise<
		(Subcategory & { category: Category })[]
	> {
		try {
			const userId = await UserRepo.getInstance().getUserIdFromSession();
			if (!userId) throw new Error("failed to get categories");
			const a = await prisma.subcategory.findMany({
				where: { userId, active: true },
				include: { category: true },
			});
			return a;
		} catch (error) {
			throw new Error("failed to get categories");
		}
	}
}
export default SubcategoryRepo;
