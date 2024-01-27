import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardFooter,
	CardContent,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function ErrorCard() {
	return (
		<Card className="w-[400px] shadow-md">
			<CardHeader>
				<CardTitle>Algo salio mal</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="w-full flex justify-center items-center">
					<ExclamationTriangleIcon className="text-destructive" />
				</div>
			</CardContent>
			<CardFooter>
				<Button asChild>
					<Link href="/auth/login">Volver</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
