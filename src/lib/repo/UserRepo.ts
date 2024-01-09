import prisma from "../db/db";
import { Item, User as PUser } from "@prisma/client";

type TUserRepo = {
	upsert(user: Partial<PUser>): Promise<TStatusMessage>;
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
	public async upsert(user: Partial<PUser>): Promise<TStatusMessage> {
		try {
			const foundUser = await prisma.user.upsert({
				where: { email: user.email as string },
				create: {
					email: user.email as string,
					name: user.name as string,
					image: user.image as string,
				},
				update: { name: user.name as string },
			});
			return { status: "SUCCESS", message: foundUser.email as string };
		} catch (error) {
			return { status: "ERROR", message: "Fetch user failed" };
		}
	}
	public async getByEmail(email: string): Promise<string> {
		try {
			const foundUser = await prisma.user.findUnique({
				where: { email: email },
			});
			return foundUser?.id || "";
		} catch (error) {
			return "";
		}
	}
}
export default UserRepo;
