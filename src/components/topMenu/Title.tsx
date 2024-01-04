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
				console.log("p", params);
				if (query.budgetId !== undefined && query.budgetId !== null) {
					if (query.budgetId === "0") {
						title = "NUEVO PRESUPUESTO";
					} else {
						title = `PRESUPUESTO Nº ${query.budgetId}`;
					}
				}
			}
			break;
		case "/":
			title = "PRESUPUESTOS";
			break;

		default:
			{
				console.log(pathname);
				if (pathname.split("/")[1] === "budget") {
					const query = params;
					title = `PRESUPUESTO Nº ${query.budgetId}`;
				}
			}
			break;
	}
	return <p className=" text-[16px] font-bold">{title}</p>;
}
