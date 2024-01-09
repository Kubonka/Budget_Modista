"use server";
import UserRepo from "@/lib/repo/UserRepo";
type TGoogleUser = {
	email: string;
	name: string;
	image: string;
};
export async function upsertUser(user: TGoogleUser) {
	return await UserRepo.getInstance().upsert(user);
}
export async function getUserByEmail(email: string) {
	return await UserRepo.getInstance().getByEmail(email);
}
