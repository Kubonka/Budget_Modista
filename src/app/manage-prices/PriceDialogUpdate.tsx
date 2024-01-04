"use client";
import { useState } from "react";
import { FileEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CategoryAlert from "@/components/CategoryAlert";

type Props = {
	data: Price;
	onSubmit: (priceData: Price) => void;
};
function PriceDialogUpdate({ data, onSubmit }: Props) {
	const [open, setOpen] = useState(false);
	const [error, setError] = useState(false);
	const [priceData, setPriceData] = useState<Price>({ ...data });
	function validateInput(inputValue: string) {
		if (inputValue === "" || isNaN(parseInt(inputValue))) {
			setError(true);
			return;
		}
		setError(false);
		return true;
	}

	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				setError(false);
				setOpen(open);
			}}
		>
			<DialogTrigger asChild>
				<Button
					className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary p-0"
					variant={"outline"}
					onClick={() => {
						setOpen(true);
					}}
				>
					<FileEdit className="text-white" size={20} />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Modificar Valor</DialogTitle>
					<DialogDescription>
						Realiza cambios en el precio de la subcategoría. Aceptar para
						finalizar.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="name" className="text-left">
							Valor
						</Label>
						<Input
							id="value"
							defaultValue={data.value}
							onChange={(e) => {
								if (validateInput(e.target.value))
									setPriceData((p) => ({
										...p,
										value: parseInt(e.target.value),
									}));
							}}
						/>
					</div>
				</div>
				<DialogFooter>
					<CategoryAlert className={error ? "mt-2" : "hidden"} />
					<Button
						type="submit"
						onClick={() => {
							if (!error) {
								onSubmit(priceData);
								setOpen(false);
							}
						}}
					>
						Aceptar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
export default PriceDialogUpdate;
