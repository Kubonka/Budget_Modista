import prisma from "../db/db";
import type { Unit } from "@prisma/client";

type TUnitRepo = {
	create(body: Unit): Promise<void>;
	getAll(): Promise<Unit[]>;
};
class UnitRepo implements TUnitRepo {
	private static instance: UnitRepo | null = null;

	public static getInstance(): UnitRepo {
		if (!UnitRepo.instance) {
			UnitRepo.instance = new UnitRepo();
		}
		return UnitRepo.instance;
	}
	public async create(body: Unit) {
		await prisma.unit.create({
			data: { singular: body.singular, plural: body.plural },
		});
	}
	public async getAll(): Promise<Unit[]> {
		return await prisma.unit.findMany();
	}
	// public async create(singular: string, plural: string): Promise<void> {
	// 	try {
	// 		await Unit.create({ singular, plural });
	// 	} catch (error) {
	// 		throw new Error("Failed to create Unit");
	// 	}
	// }
	// public async retrieveAll(): Promise<Unit[]> {
	// 	try {
	// 		return await Unit.findAll();
	// 	} catch (error) {
	// 		throw new Error("Failed to retrieve Units");
	// 	}
	// }
	// public async init(units: TUnit[]): Promise<void> {
	// 	try {
	// 		await Unit.bulkCreate(units);
	// 		//const newUnit = await Unit.create({ singular: "holis", plural: "chau" });
	// 		//console.log(newUnit);
	// 	} catch (error) {
	// 		throw new Error("Failed to create Units");
	// 	}
	// }
}
export default UnitRepo;
