"use client";
import { useRouter, useParams, usePathname } from "next/navigation";
import { Menu as MenuIcon, LogOut } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export default function Menu() {
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="rounded-full" size="icon">
					<MenuIcon strokeWidth={2.75} size={24} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mt-1 w-[150px]">
				<DropdownMenuLabel className="text-[16px] font-bold">
					PRESUPUESTO
				</DropdownMenuLabel>
				<DropdownMenuItem
					onClick={() => {
						// console.log(params);
						if (pathname === "/budget/0") {
							router.refresh();
							console.log(pathname);
						} else {
							router.push("/budget/0");
						}

						// setTimeout(() => {
						// 	router.push("/budget/0");
						// }, 300);
					}}
					className="ml-2 text-[16px] font-semibold"
				>
					Nuevo
				</DropdownMenuItem>
				<DropdownMenuItem
					className="ml-2 text-[16px] font-semibold"
					onClick={() => router.push("/all-budgets")}
				>
					Ver todos
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuLabel className="text-[16px] font-bold">
					ADMINISTRAR
				</DropdownMenuLabel>
				<DropdownMenuItem
					className="ml-2 text-[16px] font-semibold"
					onClick={() => router.push("/manage-categories")}
				>
					Categorías
				</DropdownMenuItem>
				<DropdownMenuItem
					className="ml-2 text-[16px] font-semibold"
					onClick={() => router.push("/manage-subcategories")}
				>
					Subcategorías
				</DropdownMenuItem>
				<DropdownMenuItem
					className="ml-2 text-[16px] font-semibold"
					onClick={() => router.push("/manage-prices")}
				>
					Precios
				</DropdownMenuItem>
				<DropdownMenuItem
					className="ml-2 text-[16px] font-semibold"
					onClick={() => router.push("/settings")}
				>
					Imagen de salida
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuLabel className="text-[16px] font-bold">
					ESTADISTICAS
				</DropdownMenuLabel>
				<DropdownMenuItem
					className="ml-2 text-[16px] font-semibold"
					onClick={() => router.push("/statistics")}
				>
					Estadisticas
				</DropdownMenuItem>
				<DropdownMenuSeparator />

				<DropdownMenuItem
					className="ml-2 text-[16px] font-semibold flex flex-row gap-4 justify-between"
					onClick={() => signOut()}
				>
					<p>Logout</p>
					<LogOut size={20} />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
