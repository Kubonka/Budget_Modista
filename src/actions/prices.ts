"use server";
import PriceRepo from "@/lib/repo/PriceRepo";
export async function getAllPrices() {
	return await PriceRepo.getInstance().getAll();
}
export async function updatePrice(body: Price) {
	return await PriceRepo.getInstance().update(body);
}
