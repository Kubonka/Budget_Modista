"use client";
import { getStatistics } from "@/actions/statistics";
import React, { useEffect, useMemo, useState } from "react";
import MonthSelector from "./MonthSelector";
import { getStringMonth } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

type TAreaData = {
	year: number;
	month: number;
	total: number;
	id: number;
	label: string;
};
type TPieData = {
	name: string;
	total: number;
	id: number;
};
export default function StatisticsPage() {
	const [rawData, setRawData] = useState<MonthRevenue[]>([] as MonthRevenue[]);
	const [monthIndex, setMonthIndex] = useState<number>(0);
	const [pieData, setPieData] = useState<TPieData[]>([]);
	const [areaData, setAreaData] = useState<TAreaData[]>([] as TAreaData[]);
	const rData = useMemo(() => setData(), [monthIndex]);
	function setData() {
		console.log("A", monthIndex);
		setAreaData(
			rawData.map((monthR, index) => ({
				year: monthR.year,
				month: monthR.month,
				total: monthR.monthProfit.totalProfit,
				label:
					monthR.month.toString().padStart(2, "0") +
					"/" +
					monthR.year.toString().slice(2),
				id: index,
			}))
		);
		//todo seguir por aca con PIE DATA
		setPieData(
			rawData.length
				? rawData[monthIndex].monthProfit.subcategories.map((s, index) => ({
						name: s.name.toUpperCase(),
						total: s.profit,
						id: index,
				  }))
				: []
		);
	}
	async function getAllStatistics() {
		const result: MonthRevenue[] = await getStatistics();
		if (!result) return;
		console.log("raw", result);
		setRawData(result);
		setAreaData(
			result.map((monthR, index) => ({
				year: monthR.year,
				month: monthR.month,
				total: monthR.monthProfit.totalProfit,
				label:
					monthR.month.toString().padStart(2, "0") +
					"/" +
					monthR.year.toString().slice(2),
				id: index,
			}))
		);
		//todo seguir por aca con PIE DATA
		setPieData(
			result.length
				? result[result.length - 1].monthProfit.subcategories.map(
						(s, index) => ({
							name: s.name.toUpperCase(),
							total: s.profit,
							id: index,
						})
				  )
				: []
		);
	}

	useEffect(() => {
		getAllStatistics();
	}, []);

	//$ markup
	return (
		<div className="w-full flex flex-col ">
			<Card className=" m-2 pt-2 px-2">
				<CardContent className="w-full flex flex-col px-0 justify-center items-center">
					<MonthSelector
						maxItems={rawData.length}
						currentIndex={monthIndex}
						label={`${getStringMonth(monthIndex + 1)} de ${
							rawData.length && rawData[monthIndex].year.toString()
						}`}
						onPrev={() => setMonthIndex((p) => p - 1)}
						onNext={() => setMonthIndex((p) => p + 1)}
					/>
					<BarChart
						layout="vertical"
						width={350}
						height={500}
						data={pieData ? pieData : []}
						margin={{
							top: 8,
							left: -16,
							right: 4,
						}}
						className="pl-[-20px] ml-[-24px]"
					>
						<CartesianGrid stroke="#f5f5f5" />
						<XAxis type="number" />
						<YAxis dataKey={"id"} type="category" fontSize={14} />
						<Tooltip content={<CustomizedTooltipPie pieData={pieData} />} />
						<Bar dataKey={"total"} fill="#e11d48" opacity={0.5} />
					</BarChart>
					<ul className="flex flex-col justify-start items-start w-full pl-4">
						{pieData.map((s, i) => (
							<li
								key={i}
								className="text-sm font-semibold"
							>{`${s.id} - ${s.name}`}</li>
						))}
					</ul>
				</CardContent>
			</Card>
			<Card className=" m-2 pt-2 px-2">
				<CardContent className="w-full flex flex-col px-0 justify-center items-center">
					<p className="font-semibold pb-4 pt-4"> ULTIMOS 12 MESES </p>

					<AreaChart
						width={320}
						height={300}
						data={areaData}
						margin={{ left: 0 }}
					>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
						</linearGradient>
						<XAxis dataKey="label" fontSize={8} interval={1} textAnchor="0" />
						<CartesianGrid strokeDasharray="3 3" />
						<Tooltip
							content={<CustomizedTooltipArea />}
							cursor={{ fill: "transparent" }}
						/>
						<Area
							type="monotone"
							dataKey="total"
							stroke="#ff1d48"
							fillOpacity={0.5}
							fill="#e11d48"
						/>
					</AreaChart>
				</CardContent>
			</Card>
			{/* {rawData?.map((monthR, i) => (
				<div key={i}>
					<p>{`${monthR.month} ${monthR.year}`}</p>
					<div className="flex flex-row">
						{monthR.monthProfit.subcategories.map((mp) => (
							<div className=" flex flex-col">
								<p>{mp.name}</p>
								<p>{mp.profit}</p>
							</div>
						))}
					</div>
				</div>
			))} 
      */}
		</div>
	);
}

interface CustomizedAxisTickProps {
	x?: number;
	y?: number;
	stroke?: string;
	payload?: any;
}
interface CustomizedTooltipProps {
	active?: boolean;
	payload?: any;
	label?: any;
	pieData?: any;
}
const CustomizedAxisTick: React.FC<CustomizedAxisTickProps> = ({
	x,
	y,
	stroke,
	payload,
}) => (
	<g transform={`translate(${x},${y})`}>
		<text x={0} y={0} dy={16} textAnchor="end" fill="#666" fontSize={6}>
			{payload.value.toString()}
		</text>
	</g>
);

const CustomizedTooltipArea: React.FC<CustomizedTooltipProps> = ({
	active,
	payload,
	label,
}) => {
	if (active && payload && payload.length) {
		return (
			<div className="custom-tooltip">
				<div>
					{payload.map((pld: any, index: number) => (
						<div
							key={index}
							className="bg-slate-100/[.5] flex flex-col justify-center items-center p-2 rounded-sm border-[1px] border-black"
						>
							<div>{pld.dataKey.toUpperCase()}</div>
							<div>{`$ ${pld.value}`}</div>
						</div>
					))}
				</div>
			</div>
		);
	}
};
const CustomizedTooltipPie: React.FC<CustomizedTooltipProps> = ({
	active,
	payload,
	label,
	pieData,
}) => {
	if (active && payload && payload.length) {
		return (
			<div className="custom-tooltip">
				<div>
					{payload.map((pld: any, index: number) => (
						<div
							key={index}
							className="bg-slate-100/[.5] flex flex-col justify-center items-center p-2 rounded-sm border-[1px] border-black"
						>
							<div className="text-sm">{pieData[label].name}</div>
							<div>{`$ ${pld.value}`}</div>
						</div>
					))}
				</div>
			</div>
		);
	}
};
