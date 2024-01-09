import prisma from "../db/db";
import { Item, Budget as PBudget } from "@prisma/client";
import ItemRepo from "./ItemRepo";
type TBudgetRepo = {
	create(body: PBudget): Promise<TStatusMessage>;
	update(body: PBudget): Promise<TStatusMessage>;
	getById(budgetId: number): Promise<Budget | null>;
	getAll(userId: string): Promise<PBudget[] | null>;
	delete(budgetId: number): Promise<TStatusMessage>;
};
class BudgetRepo implements TBudgetRepo {
	private static instance: BudgetRepo | null = null;
	// private constructor() {
	// 	throw new Error("Not instantiable.");
	// }
	public static getInstance(): BudgetRepo {
		if (!BudgetRepo.instance) {
			BudgetRepo.instance = new BudgetRepo();
		}
		return BudgetRepo.instance;
	}
	public async getAll(userId: string): Promise<PBudget[] | null> {
		try {
			return await prisma.budget.findMany({
				where: { active: true, userId },
				orderBy: { id: "desc" },
			});
		} catch (error) {
			return null;
		}
	}
	public async getById(budgetId: number): Promise<Budget | null> {
		try {
			const res = await prisma.budget.findUnique({
				where: { id: budgetId },
				include: { items: true },
			});
			return res;
		} catch (error) {
			return null;
		}
	}
	public async create(body: PBudget): Promise<TStatusMessage> {
		//Partial<Budget> & { items: Omit<Item, "id">[] }) {
		const newBudget = await prisma.budget.create({
			data: {
				date: body.date as string,
				to: body.to as string,
				total: body.total as number,
				accepted: body.accepted as boolean,
				userId: body.userId,
			},
		});
		return { status: "SUCCESS", message: `${newBudget.id}` };
	}
	public async update(body: PBudget): Promise<TStatusMessage> {
		const newBudget = await prisma.budget.update({
			where: { id: body.id },
			data: {
				date: body.date as string,
				to: body.to as string,
				total: body.total as number,
				accepted: body.accepted as boolean,
			},
		});
		return { status: "SUCCESS", message: `${newBudget.id}` };
	}
	public async delete(budgetId: number): Promise<TStatusMessage> {
		try {
			await prisma.budget.update({
				where: { id: budgetId },
				data: { active: false },
			});
			return { status: "SUCCESS", message: "Budget deleted" };
		} catch (error) {
			return { status: "ERROR", message: "Failed to delete budget" };
		}
	}
}
export default BudgetRepo;
