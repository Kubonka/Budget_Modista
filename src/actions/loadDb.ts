"use server";
import prisma from "@/lib/db/db";
import DummyDb from "@/lib/db/dummyDb/DummyDb";
export async function loadDb() {
	const dummyDb = new DummyDb();
	//await dummyDb.reset();
	await dummyDb.initBaseTables();
	//await prisma.unit.create({ data: { singular: "hola", plural: "chau" } });
}
