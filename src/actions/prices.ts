"use server";
import PriceRepo from "@/lib/repo/PriceRepo";
export async function getAllPrices(userId: string) {
	return await PriceRepo.getInstance().getAll(userId);
}
export async function updatePrice(body: Price) {
	return await PriceRepo.getInstance().update(body);
}
