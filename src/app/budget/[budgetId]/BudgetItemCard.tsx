"use client";
import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { capitalize } from "@/lib/utils";

type Props = {
	data: TItemData;
	acceptedStatus: boolean;
	onDeleteItem: (itemId: string) => void;
};

function BudgetItemCard({
	data: { category, subcategory, unit, price, count, description, refId },
	acceptedStatus,
	onDeleteItem,
}: Props) {
	return (
		<Card className="relative flex flex-row items-center ">
			<div className="flex w-full flex-row items-center justify-between px-2 py-2">
				<div className="flex w-full flex-col ">
					<div className="flex w-full flex-row flex-wrap gap-2 ">
						<p>
							{description === ""
								? capitalize(category)
								: capitalize(description)}
						</p>
						<p>
							{subcategory === "default" || subcategory === "Personalizada"
								? ""
								: subcategory}
						</p>
					</div>
					<div className="flex flex-row gap-2">
						<p className="text-sm italic">{!description && count}</p>
						<p className="text-sm italic">{!description && unit}</p>
					</div>
				</div>
				<div className=" flex w-[40%] flex-nowrap justify-end ">
					<p> {`$ ${price}`}</p>
				</div>
			</div>
			<Button
				className={`${
					acceptedStatus && "bg-primary-disabled "
				} absolute right-[-23px] flex  h-[20px] w-[20px] items-center justify-center rounded-full p-0`}
				onClick={() => onDeleteItem(refId)}
				disabled={acceptedStatus}
			>
				<X />
			</Button>
		</Card>
	);
}

export default BudgetItemCard;
