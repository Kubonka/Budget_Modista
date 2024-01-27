"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import React from "react";
import { signIn } from "next-auth/react";

export default function LogInCard() {
	return (
		<Card className="mt-16 mx-2 pt-2">
			<CardHeader>
				<p className="text-center font-bold pb-2">
					Bienvenido al generador de presupuestos
				</p>
			</CardHeader>
			<CardContent className="flex items-center justify-center">
				<Button onClick={() => signIn("google")} variant={"outline"}>
					<FcGoogle className="h-10 w-10 pr-4" />
					Ingresar con Google
				</Button>
			</CardContent>
		</Card>
	);
}
