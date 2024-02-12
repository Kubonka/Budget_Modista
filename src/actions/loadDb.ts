"use server";
import DummyDb from "@/lib/db/dummyDb/DummyDb";
export async function loadUnits() {
	const dummyDb = new DummyDb();
	//await dummyDb.reset();
	await dummyDb.initBaseTables();
	//await prisma.unit.create({ data: { singular: "hola", plural: "chau" } });
}
export async function loadBudgets() {
	const dummyDb = new DummyDb();
	//await dummyDb.reset();
	await dummyDb.initBudgets();
	//await prisma.unit.create({ data: { singular: "hola", plural: "chau" } });
}
