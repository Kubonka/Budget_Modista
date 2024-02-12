import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

type Props = {
	maxItems: number;
	currentIndex: number;
	label: string;
	onPrev: () => void;
	onNext: () => void;
};

function MonthSelector({
	maxItems,
	currentIndex,
	label,
	onPrev,
	onNext,
}: Props) {
	return (
		<div className="flex flex-row gap-2 w-full  justify-between items-center rounded-lg border-[1px] border-slate-400">
			<Button
				className={`text-sm rounded-r-none ${
					currentIndex > 0 ? "" : "bg-slate-300"
				}`}
				onClick={() => onPrev()}
				variant={currentIndex > 0 ? "default" : "outline"}
				disabled={!(currentIndex > 0)}
			>
				<ChevronLeft className="w-4 h-4" />
			</Button>
			<div className="text-sm font-semibold">{label}</div>
			<Button
				className={`text-sm rounded-l-none ${
					currentIndex < maxItems - 1 ? "" : "bg-slate-300"
				}`}
				onClick={() => onNext()}
				variant={currentIndex < maxItems - 1 ? "default" : "outline"}
				disabled={!(currentIndex < maxItems - 1)}
			>
				<ChevronRight className="w-4 h-4" />
			</Button>
		</div>
	);
}

export default MonthSelector;
