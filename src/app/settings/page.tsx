"use client";
import { getUser, updateUserData, upsertUser } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type FormData = {
	b_logo: string;
	b_name: string;
	b_location: string;
	b_adress: string;
	b_phone: string;
	b_email: string;
};
type TResponse = {
	message: string;
	url: string;
};
export default function Settings() {
	const [user, setUser] = useState<User>({} as User);
	const [data, setData] = useState<FormData>({} as FormData);
	//$ func
	async function getUserFromDb() {
		const user = await getUser();
		if (user) {
			setUser(user);
			setData({
				...data,
				b_logo: user.b_logo as string,
				b_name: user.b_name as string,
				b_location: user.b_location as string,
				b_adress: user.b_adress as string,
				b_phone: user.b_phone as string,
				b_email: user.b_email as string,
			});
		}
	}
	useEffect(() => {
		getUserFromDb();
	}, []);
	async function handleSetLogo(file: File) {
		//todo hacer el fetch
		console.log(file);
		const fData = new FormData();
		fData.append("image", file);
		const response = await fetch("api/upload/set-logo", {
			method: "POST",
			body: fData,
		});
		const responseData: TResponse = await response.json();
		if (responseData.message) {
			if (data.b_logo) {
				const responseDelete = await fetch("api/upload/delete-logo", {
					method: "POST",
					body: JSON.stringify({ url: data.b_logo }),
				});
				console.log("DELETED", responseDelete);
			}
			setData({ ...data, b_logo: responseData.url });
		}
		console.log(responseData);
	}

	async function handleSave() {
		console.log(data);
		const response = await updateUserData({ ...user, ...data });
		console.log("RES", response);
	}
	//$ markup
	//todo implementar el llamado a api/upload para subir la imagen al back
	return (
		<Card className="p-2">
			<CardContent>
				<div className="flex flex-col gap-2">
					<Label htmlFor="b_logo" className="text-[16px]">
						Logo de la empresa
					</Label>
					<Input
						id="b_logo"
						type="file"
						onChange={(e) => {
							if (e.target.files?.length) {
								//todo mandar al back y a cloudinary
								console.log(e.target.files[0]);
								handleSetLogo(e.target.files[0]);
								//setData({ ...data, b_logo: e.target.files[0] });
								//console.log("->", e.target.files?.length && e.target.files[0]);
							}
						}}
					/>

					{data.b_logo && (
						<div className="flex justify-center">
							<Image
								src={data.b_logo}
								alt={"No IMAGE"}
								width="0"
								height="0"
								className="h-[140px] w-auto object-contain"
							/>
						</div>
					)}

					<Label htmlFor="b_name" className="text-[16px]">
						Nombre de la empresa
					</Label>
					<Input
						id="b_name"
						value={data.b_name || ""}
						type="text"
						onChange={(e) => {
							setData((p) => ({ ...p, b_name: e.target.value }));
						}}
					/>
					<Label htmlFor="b_location" className="text-[16px]">
						Localidad
					</Label>
					<Input
						id="b_location"
						value={data.b_location || ""}
						type="text"
						onChange={(e) => {
							setData((p) => ({ ...p, b_location: e.target.value }));
						}}
					/>
					<Label htmlFor="b_adress" className="text-[16px]">
						Domicilio
					</Label>
					<Input
						id="b_address"
						value={data.b_adress || ""}
						type="text"
						onChange={(e) => {
							setData((p) => ({ ...p, b_adress: e.target.value }));
						}}
					/>
					<Label htmlFor="b_phone" className="text-[16px]">
						Teléfono
					</Label>
					<Input
						id="b_phone"
						value={data.b_phone || ""}
						type="number"
						onChange={(e) => {
							setData((p) => ({ ...p, b_phone: e.target.value }));
						}}
					/>
					<Label htmlFor="b_email" className="text-[16px]">
						Email
					</Label>
					<Input
						id="b_email"
						value={data.b_email || ""}
						type="email"
						onChange={(e) => {
							setData((p) => ({ ...p, b_email: e.target.value }));
						}}
					/>
				</div>
			</CardContent>
			<CardFooter>
				<Button onClick={handleSave} className="w-full">
					Guardar cambios
				</Button>
			</CardFooter>
		</Card>
	);
}
