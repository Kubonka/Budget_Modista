"use server";
import UnitRepo from "@/lib/repo/UnitRepo";
export async function getAllUnits() {
	return await UnitRepo.getInstance().getAll();
}
