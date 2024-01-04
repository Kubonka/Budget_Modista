"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import ChangeStatusDialog from "./ChangeStatusDialog";
import { Switch } from "@/components/ui/switch";

type Props = {
	acceptedStatus: boolean | undefined;
	onStatusChange: () => void;
};
export default function StatusHeader({
	acceptedStatus,
	onStatusChange,
}: Props) {
	const [openDialog, setOpenDialog] = useState(false);
	//$ func

	//$ markup
	return (
		<div className="flex flex-row gap-2 pb-2">
			<div className="flex w-full items-center    pt-2">
				<Badge
					className={`flex h-8 w-24 items-center justify-center  text-[16px] text-title-strong ${
						acceptedStatus ? "bg-[#29d651]" : "bg-[#deaf21]"
					}`}
				>
					{acceptedStatus ? "Aceptado" : "Pendiente"}
				</Badge>
			</div>
			<div className="flex flex-col items-center justify-center">
				<Label
					htmlFor="acceptedStatus"
					className={` text-[16px] ${
						acceptedStatus ? "text-gray-300" : " text-title-strong"
					}`}
				>
					Status
				</Label>
				<Switch
					id="acceptedStatus"
					checked={acceptedStatus}
					disabled={acceptedStatus}
					onClick={() => setOpenDialog(true)}
					className="bg-primary-disabled"
				/>
				<ChangeStatusDialog
					openDialog={openDialog}
					setOpenDialog={setOpenDialog}
					onSubmit={onStatusChange}
				/>
			</div>
		</div>
	);
}
