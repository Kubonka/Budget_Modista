"use client";
import { useRouter, usePathname, useParams } from "next/navigation";

export default function Title() {
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();
	let title = "";
	switch (pathname) {
		case "/manage-categories":
			title = "ADMINISTRAR CATEGORIAS";
			break;
		case "/manage-subcategories":
			title = "ADMINISTRAR SUBCATEGORIAS";
			break;
		case "/manage-prices":
			title = "ADMINISTRAR PRECIOS";
			break;
		case "/budget/0":
			{
				const query = params;
				if (query.budgetId !== undefined && query.budgetId !== null) {
					if (query.budgetId === "0") {
						title = "NUEVO PRESUPUESTO";
					} else {
						title = `PRESUPUESTO ID:${query.budgetId}`;
					}
				}
			}
			break;
		case "/all-budgets":
			title = "PRESUPUESTOS";
			break;

		default:
			{
				if (pathname.split("/")[1] === "budget") {
					const query = params;
					title = `PRESUPUESTO ID:${query.budgetId}`;
				}
			}
			break;
	}
	return <p className=" text-[16px] font-bold">{title}</p>;
}
