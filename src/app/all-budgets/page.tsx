"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./dataTable";
import { columns } from "./columns";
import { getBudgets } from "@/actions/budgets";
import { useSession } from "next-auth/react";

function AllBudgets() {
	const [budgetTableData, setBudgetTableData] = useState<PBudget[]>(
		[] as PBudget[]
	);
  const session = useSession()
	//$ func
	useEffect(() => {
		loadBudgets();
	}, []);
	async function loadBudgets() {
		const res: PBudget[] | null = await getBudgets(session.data?.user.);

		if (res) setBudgetTableData(res);
		else setBudgetTableData([]);
	}
	//$ markup
	return (
		<div className="h-full w-full">
			<DataTable
				columns={columns}
				data={budgetTableData}
				refresh={() => loadBudgets()}
			/>
		</div>
	);
}

export default AllBudgets;
