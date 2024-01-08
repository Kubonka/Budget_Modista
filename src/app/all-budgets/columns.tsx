"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<PBudget>[] = [
	{
		accessorKey: "to",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="w-full text-center text-[12px] font-bold"
				>
					DESTINATARIO
					<ArrowUpDown className="ml-[2px] h-4 w-4" />
				</Button>
			);
		},

		cell: ({ row }) => (
			<p className="w-full text-center text-[12px]">{row.original.to}</p>
		),
	},
	{
		id: "date",
		accessorKey: "date",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="w-full text-center text-[12px] font-bold"
				>
					FECHA
					<ArrowUpDown className="ml-[2px] h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<p className="w-full text-center text-[12px]">{row.original.date}</p>
		),
		sortingFn: (rowA: any, rowB: any, columnId: string): number => {
			let a = rowA.getValue(columnId).split("/");
			let b = rowB.getValue(columnId).split("/");
			//20/12/2023
			a = [parseInt(a[0]), parseInt(a[1]), parseInt(a[2])];
			b = [parseInt(b[0]), parseInt(b[1]), parseInt(b[2])];
			const c = [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
			if (c[2] < 0) {
				return -1;
			} else if (c[2] > 0) {
				return 1;
			} else if (c[1] < 0) {
				return -1;
			} else if (c[1] > 0) {
				return 1;
			} else if (c[0] < 0) {
				return -1;
			} else return 1;
		},
	},
	{
		id: "actions",
		header: ({ column }) => {
			return <div className="w-full"></div>;
		},
		cell: ({ row, table }) => {
			const r = row.original;
			return (
				<div className="w-full">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreVertical className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>ID : {r.id}</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => table.options.meta?.navigateTo(r.id)}
							>
								{r.accepted ? "Ver detalles" : "Editar"}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => table.options.meta?.openDialog(r.id)}
							>
								Eliminar
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
	{
		id: "accepted",
		accessorKey: "accepted",
		enableHiding: true,
	},
];
