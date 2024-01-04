"use client";
import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
type Props = {
	onDelete: (subcategory: Subcategory) => void;
	subcategory: Subcategory;
};
export default function SubcategoryDialogDelete({
	onDelete,
	subcategory,
}: Props) {
	const [dialogOpen, setDialogOpen] = useState(false);
	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger>
				<Button
					className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary p-1"
					variant={"outline"}
					asChild
				>
					<Trash2 className=" text-white" size={20} />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>Desea eliminar la subcategoría ?</DialogHeader>
				<DialogFooter className="flex flex-row gap-4">
					<Button
						type="submit"
						onClick={() => setDialogOpen(false)}
						className="w-full"
					>
						Cancelar
					</Button>
					<Button
						type="submit"
						onClick={() => onDelete(subcategory)}
						className="w-full"
					>
						Aceptar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
