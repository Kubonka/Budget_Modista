import prisma from "../db/db";
import type { Category } from "@prisma/client";
import SubcategoryRepo from "./SubcategoryRepo";

type TOptions = { active: boolean };
type TCategoryRepo = {
	create(body: Category): Promise<TStatusMessage>;
	update(body: Category): Promise<TStatusMessage>;
	delete(body: Category): Promise<TStatusMessage>;
	getAll(options: TOptions): Promise<Category[]>;
};

class CategoryRepo implements TCategoryRepo {
	private static instance: CategoryRepo | null = null;
	public static getInstance(): CategoryRepo {
		if (!CategoryRepo.instance) {
			CategoryRepo.instance = new CategoryRepo();
		}
		return CategoryRepo.instance;
	}
	public async create(body: Category): Promise<TStatusMessage> {
		const newCategory = await prisma.category.create({
			data: { name: body.name.toLowerCase(), unitId: body.unitId },
		});
		if (newCategory) {
			const subcategoryRepo = SubcategoryRepo.getInstance();
			await subcategoryRepo.create({
				id: 0,
				name: "default",
				categoryId: newCategory.id,
				active: true,
			});
			return { status: "SUCCESS", message: "Category created" };
		}
		return { status: "ERROR", message: "Category already exist" };
	}
	public async update(body: Category): Promise<TStatusMessage> {
		const categoryFound = await prisma.category.update({
			where: { id: body.id },
			data: { name: body.name, unitId: body.unitId, active: body.active },
		});
		if (!categoryFound)
			return { status: "ERROR", message: "Category not found" };
		return { status: "SUCCESS", message: "Category updated" };
	}
	public async delete(body: Category): Promise<TStatusMessage> {
		const categoryFound = await prisma.category.update({
			where: { id: body.id },
			data: { active: false },
		});
		if (!categoryFound)
			return { status: "ERROR", message: "Category not found" };
		return { status: "SUCCESS", message: "Category deleted" };
	}
	public async getAll({ active }: TOptions): Promise<Category[]> {
		if (active)
			return await prisma.category.findMany({ where: { active: true } });
		return await prisma.category.findMany();
	}
}
export default CategoryRepo;
