"use client";
import { loadUnits, loadBudgets } from "@/actions/loadDb";

export default function page() {
	return (
		<main className="border-2 border-red-300 flex flex-col">
			<button
				className="p-2 w-full border-2 border-slate-600"
				onClick={async () => loadUnits()}
			>
				GENERAR UNITS
			</button>
			<button
				className="p-2 w-full border-2 border-slate-600"
				onClick={async () => loadBudgets()}
			>
				GENERAR BUDGETS
			</button>
		</main>
	);
}
