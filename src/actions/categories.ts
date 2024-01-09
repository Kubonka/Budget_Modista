"use server";
import CategoryRepo from "@/lib/repo/CategoryRepo";
export async function getAllCategories(
	options: { active: boolean },
	userId: string
) {
	return await CategoryRepo.getInstance().getAll(options, userId);
}
export async function createCategory(categoryData: Category) {
	return await CategoryRepo.getInstance().create(categoryData);
}
export async function updateCategory(categoryData: Category) {
	return await CategoryRepo.getInstance().update(categoryData);
}
export async function deleteCategory(categoryData: Category) {
	return await CategoryRepo.getInstance().delete(categoryData);
}
