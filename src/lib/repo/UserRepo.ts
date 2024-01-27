import prisma from "../db/db";
import { getServerSession } from "next-auth";
import { Item, User as PUser } from "@prisma/client";
import CategoryRepo from "./CategoryRepo";

type TUserRepo = {
	upsert(user: Partial<PUser>): Promise<TStatusMessage>;
	getByEmail(email: string): Promise<User | null>;
};
class UserRepo implements TUserRepo {
	private static instance: UserRepo | null = null;
	// private constructor() {
	// 	throw new Error("Not instantiable.");
	// }
	public static getInstance(): UserRepo {
		if (!UserRepo.instance) {
			UserRepo.instance = new UserRepo();
		}
		return UserRepo.instance;
	}
	public async update(user: User): Promise<TStatusMessage> {
		try {
			const { id, ...partialUser } = user;
			const updatedUser = await prisma.user.update({
				where: { id: user.id },
				data: partialUser as PUser,
			});
			return { status: "SUCCESS", message: "User updated" };
		} catch (error) {
			return { status: "ERROR", message: "Fetch user failed" };
		}
	}
	public async upsert(user: Partial<PUser>): Promise<TStatusMessage> {
		try {
			const foundUser = await prisma.user.findUnique({
				where: { email: user.email as string },
			});
			if (foundUser) {
				foundUser.name = user.name as string;
			} else {
				const newUser = await prisma.user.create({
					data: {
						email: user.email as string,
						name: user.name as string,
						image: user.image as string,
					},
				});
				//?seteo de categorya personalizada
				await CategoryRepo.getInstance().create({
					unitId: 1,
					active: true,
					custom: true,
					name: "Personalizada",
					userId: newUser.id,
					id: 0,
				});
			}
			return { status: "SUCCESS", message: "user upsert" };
			// const foundUser = await prisma.user.upsert({
			// 	where: { email: user.email as string },
			// 	create: {
			// 		email: user.email as string,
			// 		name: user.name as string,
			// 		image: user.image as string,
			// 	},
			// 	update: { name: user.name as string },
			// });
			//return { status: "SUCCESS", message: foundUser.email as string };
		} catch (error) {
			return { status: "ERROR", message: "Fetch user failed" };
		}
	}
	public async getByEmail(email: string): Promise<User | null> {
		try {
			const foundUser = await prisma.user.findUnique({
				where: { email: email },
			});
			if (foundUser) return foundUser;
			return null;
		} catch (error) {
			return null;
		}
	}
	public async get(): Promise<User | null> {
		try {
			const userId = (await this.getUserIdFromSession()) as string;
			const foundUser = await prisma.user.findUnique({
				where: { id: userId },
			});
			if (!foundUser) return null;
			return foundUser;
		} catch (error) {
			return null;
		}
	}
	public async getUserIdFromSession(): Promise<string | null> {
		const session = await getServerSession();
		if (!session) return null;
		const user = await this.getByEmail(session.user.email);
		if (user) return user.id;
		return null;
	}
}
export default UserRepo;
