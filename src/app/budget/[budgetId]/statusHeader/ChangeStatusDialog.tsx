import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
	openDialog: boolean;
	setOpenDialog: (status: boolean) => void;
	onSubmit: () => void;
};
export default function ChangeStatusDialog({
	openDialog,
	setOpenDialog,
	onSubmit,
}: Props) {
	const [open, setOpen] = useState(false);
	return (
		<Dialog
			open={openDialog}
			onOpenChange={(open) => {
				setOpenDialog(open);
			}}
		>
			{/* <DialogTrigger disabled={acceptedStatus} asChild> */}
			{/* </DialogTrigger> */}
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Aceptar presupuesto </DialogTitle>
					<DialogDescription>
						Estas a punto de aceptar un presupuesto.
					</DialogDescription>
					<DialogDescription>Esta acción es irreversible.</DialogDescription>
				</DialogHeader>
				<DialogFooter className="flex flex-row gap-4">
					<Button
						type="submit"
						onClick={() => setOpen(false)}
						className="w-full"
					>
						Cancelar
					</Button>
					<Button
						type="submit"
						onClick={() => {
							onSubmit();
							setOpenDialog(false);
							// setAcceptedStatus(true);
							// status.current = true;
							// handleSaveBudget();
							// setOpen(false);
						}}
						className="w-full"
					>
						Aceptar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
