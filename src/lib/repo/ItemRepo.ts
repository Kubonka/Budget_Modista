import prisma from "../db/db";

type TOptions = { active: boolean };
type TItemRepo = {
	create(body: Omit<Item, "id">[]): Promise<TStatusMessage>;
	delete(body: Item): Promise<TStatusMessage>;
	getAll(budgetId: number): Promise<Item[]>;
};

class ItemRepo implements TItemRepo {
	private static instance: ItemRepo | null = null;
	public static getInstance(): ItemRepo {
		if (!ItemRepo.instance) {
			ItemRepo.instance = new ItemRepo();
		}
		return ItemRepo.instance;
	}
	public async create(body: Omit<Item, "id">[]): Promise<TStatusMessage> {
		if (body.length) {
			await prisma.item.deleteMany({ where: { budgetId: body[0].budgetId } });
			await prisma.item.createMany({
				data: body.map((item) => {
					if (item.description === "") return item;
					return { ...item, subcategoryId: 1 };
				}),
			});
			return { status: "SUCCESS", message: "Items created" };
		}
		return { status: "ERROR", message: "Items not created" };
	}

	public async delete(body: Item): Promise<TStatusMessage> {
		// const itemFound = await prisma.item.update({
		// 	where: { id: body.id },
		// 	data: { active: false },
		// });
		// if (!itemFound)
		// 	return { status: "ERROR", message: "Item not found" };
		return { status: "SUCCESS", message: "Item deleted" };
	}

	public async getAll(budgetId: number): Promise<Item[]> {
		try {
			return [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}
}
export default ItemRepo;
