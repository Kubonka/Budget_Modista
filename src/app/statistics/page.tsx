"use client";
import { getStatistics } from "@/actions/statistics";
import React, { useEffect, useState } from "react";

export default function StatisticsPage() {
	const [statistics, setStatistics] = useState<MonthRevenue[]>();
	async function getAllStatistics() {
		const result: MonthRevenue[] = await getStatistics();
		if (result) {
			console.log("result", result);
			setStatistics(result);
		}
	}
	useEffect(() => {
		getAllStatistics();
	}, []);
	return (
		<div>
			{statistics?.map((md, i) => (
				<div key={i}>{"month"}</div>
			))}
		</div>
	);
}
