import prisma from "../db";
import { faker } from "@faker-js/faker";
import units from "./units.json";
import categories from "./categories.json";
import subcategories from "./subcategories.json";
import { Item, Budget as PBudget } from "@prisma/client";
import SubcategoryRepo from "@/lib/repo/SubcategoryRepo";
import CategoryRepo from "@/lib/repo/CategoryRepo";
import BudgetRepo from "@/lib/repo/BudgetRepo";
import ItemRepo from "@/lib/repo/ItemRepo";

class DummyDb {
	public async reset() {
		await prisma.unit.deleteMany({});
		await prisma.category.deleteMany({});
		await prisma.subcategory.deleteMany({});
		// await prisma.budgetItem.deleteMany({});
		// await prisma.item.deleteMany({});
		// await prisma.budget.deleteMany({});
	}
	public async initBaseTables() {
		await this.initUnits(units);
		await this.initCategories(categories);
		await this.initSubcategories(subcategories);
		//await this.initBudgets();
	}
	private async initUnits(units: Partial<Unit>[]) {
		for (let i = 0; i < units.length; i++) {
			const unit = units[i];
			await prisma.unit.create({
				data: {
					singular: unit.singular as string,
					plural: unit.plural as string,
				},
			});
		}
	}
	private async initCategories(categories: Partial<Category>[]) {
		const categoryRepo = CategoryRepo.getInstance();
		for (let i = 0; i < categories.length; i++) {
			const category = categories[i];
			await categoryRepo.create({
				name: category.name as string,
				unitId: category.unitId as number,
				id: 0,
				active: true,
			});
		}
	}
	private async initSubcategories(subcategories: Partial<Subcategory>[]) {
		const subcategoryRepo = SubcategoryRepo.getInstance();
		for (let i = 0; i < subcategories.length; i++) {
			const subcategory = subcategories[i];
			await subcategoryRepo.create({
				id: 0,
				name: subcategory.name as string,
				categoryId: subcategory.categoryId as number,
				active: true,
			});
		}
	}
	public async initBudgets() {
		const maxBudgets = 16; //$ SET
		for (let i = 1; i < maxBudgets; i++) {
			const firstName = faker.person.firstName();
			const lastName = faker.person.lastName();
			const date = this.generateRandomDate();
			const accepted = Math.random() < 0.5 ? true : false;
			const items = await this.rndItems(
				faker.number.int({ min: 1, max: 5 }),
				i
			);
			const newBudgetBody: PBudget = {
				to: `${firstName} ${lastName}`,
				date: date,
				total: this.calculateTotal(items),
				accepted: accepted,
				active: true,
				id: 0,
			};
			await BudgetRepo.getInstance().create(newBudgetBody);
			const itemRepo = ItemRepo.getInstance();
			await itemRepo.create(items);
		}
	}
	private async rndItems(
		itemCount: number,
		budgetId: number
	): Promise<Omit<Item, "id">[]> {
		//?count , subcategory_id = 6+ , description , price
		const items: Omit<Item, "id">[] = [];
		for (let i = 0; i < itemCount; i++) {
			const subcategoryId = faker.number.int({ min: 6, max: 13 });
			const newItem: Omit<Item, "id"> = {
				subcategoryId,
				budgetId,
				count: faker.number.int({ min: 1, max: 4 }),
				price: faker.number.int({ min: 100, max: 1700 }),
				description: "",
			};
			items.push(newItem);
		}
		return items;
	}
	private calculateTotal(items: Omit<Item, "id" | "budgetId">[]): number {
		return items.reduce((total, current) => {
			return (total + current.price) as number;
		}, 0);
	}
	private generateRandomDate() {
		const startDate = new Date("2022-01-01").getTime();
		const endDate = new Date("2023-12-31").getTime();
		const dates = [];
		const randomTime = Math.random() * (endDate - startDate) + startDate;
		const date = new Date(randomTime);
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();
		const formattedDate = `${day}/${month}/${year}`;
		dates.push(formattedDate);
		return formattedDate;
	}
}

export default DummyDb;
