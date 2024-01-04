import prisma from "../db/db";
import type { Price } from "@prisma/client";

type TPriceRepo = {
	create(body: Partial<Price>): Promise<void>;
	update(body: Price): Promise<TStatusMessage>;
	delete(body: Price): Promise<TStatusMessage>;
	getAll(): Promise<Price[]>;
};
class PriceRepo implements TPriceRepo {
	private static instance: PriceRepo | null = null;
	public static getInstance(): PriceRepo {
		if (!PriceRepo.instance) {
			PriceRepo.instance = new PriceRepo();
		}
		return PriceRepo.instance;
	}
	public async getAll(): Promise<Price[]> {
		return await prisma.price.findMany({ where: { active: true } });
	}
	public async create(body: Partial<Price>) {
		await prisma.price.create({
			data: {
				value: body.value as number,
				subcategoryId: body.subcategoryId as number,
			},
		});
	}
	public async update(body: Price): Promise<TStatusMessage> {
		const res = await prisma.price.update({
			where: { id: body.id },
			data: { value: body.value },
		});
		if (!res) return { status: "ERROR", message: "Failed to update price" };
		return { status: "SUCCESS", message: "Price updated" };
	}
	public async delete(body: Price): Promise<TStatusMessage> {
		const res = await prisma.price.update({
			where: { id: body.id },
			data: { active: false },
		});
		if (!res) return { status: "ERROR", message: "Failed to delete price" };
		return { status: "SUCCESS", message: "Price deleted" };
	}
}
export default PriceRepo;
