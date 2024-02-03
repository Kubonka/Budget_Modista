"use server";
import { getObjectDate } from "@/lib/utils";
import BudgetRepo from "@/lib/repo/BudgetRepo";
import SubcategoryRepo from "@/lib/repo/SubcategoryRepo";
export async function getStatistics(): Promise<MonthRevenue[]> {
	// 1 - agarrar todos los budgets activos y accepted y todas las categorias y subcategorias activas
	const allBudgets: Budget[] | null =
		await BudgetRepo.getInstance().getAllWithItems();
	// 2 - ordenar por fecha
	const subcat = await SubcategoryRepo.getInstance().getAllWithCat();
	if (!allBudgets) return [];
	allBudgets.sort((a, b) => {
		const dateA = getObjectDate(a.date);
		const dateB = getObjectDate(b.date);
		if (dateA.year < dateB.year) {
			return -1;
		} else if (dateA.year > dateB.year) {
			return 1;
		} else {
			if (dateA.month < dateB.month) {
				return -1;
			} else if (dateA.month > dateB.month) {
				return 1;
			} else {
				return -1;
			}
		}
	});
	// 3 - mapear a MonthRevenue
	// 3.1 - agrupar por meses
	const groupedMonths = allBudgets.reduce<Budget[][]>((acc, curr) => {
		if (acc.length) {
		}
		const lastGroup: Budget[] = acc[acc.length - 1];
		console.log("lastGroup", lastGroup);
		if (lastGroup && lastGroup.length) {
			const lastDate = getObjectDate(lastGroup[0].date);
			const currDate = getObjectDate(curr.date);
			if (
				lastDate.year === currDate.year &&
				lastDate.month === currDate.month
			) {
				lastGroup.push(curr);
			} else {
				acc.push([curr]);
			}
		} else {
			acc.push([curr]);
		}
		return acc;
	}, []);

	// 3.2 - calcular y generar output
	const result: MonthRevenue[] = [];
	for (let i = 0; i < groupedMonths.length; i++) {
		const group = groupedMonths[i];
		const date = getObjectDate(group[0].date);

		const monthRevenue: MonthRevenue = {
			year: date.year,
			month: date.month,
			monthProfit: {
				totalProfit: group.reduce((acc, curr) => acc + curr.total, 0),
				budgetsCount: group.length,
				subcategories: subcat.map((s) => {
					return {
						name: `${s.category.name} ${s.name}`,
						profit: group.reduce((subcatProfit, budget) => {
							return (
								subcatProfit +
								budget.items
									.filter((item) => item.subcategoryId === s.id)
									.reduce((itemProfit, item) => itemProfit + item.price, 0)
							);
						}, 0),
					};
				}),
			} as MonthProfit,
		};
		result.push(monthRevenue);
	}
	// 4 - retornar array
	return result;
}

//todo 1- un array con cada año con sus respectivos meses que tienen los valores :
//todo {
//todo    month : number
//todo    year:number
//todo    monthProfit : MonthProfit
//todo }
//todo MonthProfit :{ totalProfit : number ; budgetsCount : number ; subcategories : SubcategoryProfit[]}
//todo SubcategoryProfit : { name : string , profit : number}
