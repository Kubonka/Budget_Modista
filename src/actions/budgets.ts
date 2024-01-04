"use server";
import { Budget as PBudget } from "@prisma/client";
import BudgetRepo from "@/lib/repo/BudgetRepo";
export async function getBudgets() {
	return await BudgetRepo.getInstance().get();
}
export async function getBudgetById(budgetId: number) {
	return await BudgetRepo.getInstance().getById(budgetId);
}
export async function createBudget(budget: PBudget) {
	return await BudgetRepo.getInstance().create(budget);
}
export async function updateBudget(budget: PBudget) {
	return await BudgetRepo.getInstance().update(budget);
}
export async function deleteBudget(budgetId: number) {
	return await BudgetRepo.getInstance().delete(budgetId);
}
