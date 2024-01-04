"use client";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type CategoryAlertProps = { className: string };
export function CategoryAlert({ className }: CategoryAlertProps) {
	return (
		<Alert variant="destructive" className={className}>
			<AlertCircle className="h-4 w-4" />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>
				Es necesario completar todos los campos.
			</AlertDescription>
		</Alert>
	);
}
export default CategoryAlert;
