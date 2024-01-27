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
	create: boolean;
	selecting: boolean;
	data: Subcategory;
	onSubmit: (subcategoryData: Subcategory) => void;
};
function SubcategoryDialogCreate({ selecting, create, data, onSubmit }: Props) {
	const [open, setOpen] = useState(false);
	const [error, setError] = useState(false);
	const [subcategoryData, setSubCategoryData] = useState<Subcategory>({
		name: data.name,
		active: true,
		id: data.id,
		categoryId: data.categoryId,
	} as Subcategory);
	function validateForm() {
		if (subcategoryData.name === "") {
			setError(true);
			return false;
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
				{create ? (
					<Button
						className="h-8 w-[72px]"
						onClick={() => {
							console.log(subcategoryData);
							setSubCategoryData({
								name: "",
								id: 0,
								categoryId: data.categoryId,
								active: true,
								userId: data.userId,
							});
							setOpen(true);
						}}
						disabled={selecting}
					>
						Crear
					</Button>
				) : (
					<Button
						className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary p-1"
						variant={"outline"}
						onClick={() => {
							setSubCategoryData({
								name: subcategoryData.name,
								id: subcategoryData.id,
								categoryId: subcategoryData.categoryId,
								active: true,
								userId: subcategoryData.userId,
							});
							setOpen(true);
						}}
						asChild
					>
						<FileEdit className="text-white" size={20} />
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{create ? "Crear Subcategoría" : "Editar Subcategoría"}
					</DialogTitle>
					<DialogDescription>
						{create
							? "Elige un nombre para tu subcategoría y luego dale a aceptar."
							: "Modifica el nombre de tu subcategoría y luego dale a aceptar."}
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="name" className="text-left">
							Nombre
						</Label>
						<Input
							id="name"
							defaultValue={data.name}
							onChange={(e) =>
								setSubCategoryData((p) => ({ ...p, name: e.target.value }))
							}
						/>
					</div>
				</div>
				<DialogFooter>
					<CategoryAlert className={error ? "mt-2" : "hidden"} />
					<Button
						type="submit"
						onClick={() => {
							if (validateForm()) {
								onSubmit(subcategoryData);
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
export default SubcategoryDialogCreate;
