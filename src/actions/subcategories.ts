"use server";
import SubcategoryRepo from "@/lib/repo/SubcategoryRepo";
export async function getAllSubcategories(
	options: { active: boolean },
	userId: string
) {
	return await SubcategoryRepo.getInstance().getAll(options, userId);
}
export async function getSubcategoriesByCategory(
	category: Category,
	options: { active: boolean }
) {
	return await SubcategoryRepo.getInstance().getByCategory(category, options);
}
export async function createSubcategory(body: Subcategory) {
	return await SubcategoryRepo.getInstance().create(body);
}
export async function updateSubcategory(body: Subcategory) {
	return await SubcategoryRepo.getInstance().update(body);
}
export async function deleteSubcategory(body: Subcategory) {
	return await SubcategoryRepo.getInstance().delete(body);
}
