"use server";
import ItemRepo from "@/lib/repo/ItemRepo";

export async function createItem(itemData: Omit<Item, "id">[]) {
	return await ItemRepo.getInstance().create(itemData);
}
// export async function deleteItem(itemData: Item) {
// 	return await ItemRepo.getInstance().delete(itemData);
// }
