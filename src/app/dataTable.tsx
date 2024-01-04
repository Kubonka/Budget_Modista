"use client";
import React, { useState, CSSProperties, useRef } from "react";
import { toast } from "@/components/ui/use-toast";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	ColumnDef,
	Row,
	SortingState,
	flexRender,
	getCoreRowModel,
	ColumnFiltersState,
	useReactTable,
	RowData,
	VisibilityState,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { deleteBudget } from "@/actions/budgets";
interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	refresh: () => void;
}

declare module "@tanstack/table-core" {
	interface TableMeta<TData extends RowData> {
		getRowStyles: (row: Row<TData>) => CSSProperties;
		navigateTo: (id: number) => void;
		openDialog: (id: number) => void;
	}
}
export function DataTable<TData extends PBudget, TValue>({
	columns,
	data,
	refresh,
}: DataTableProps<TData, TValue>) {
	const router = useRouter();
	const [dialogOpen, setDialogOpen] = useState(false);
	const deleteId = useRef<number>(0);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
		accepted: false,
	});
	const table = useReactTable({
		data,
		columns,
		getPaginationRowModel: getPaginationRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
		meta: {
			getRowStyles: (row: Row<TData>) =>
				row.original.accepted
					? { backgroundColor: "#7ee797", fontWeight: "500" }
					: { backgroundColor: "#deaf21", fontWeight: "500" },
			navigateTo: (id: number) => {
				router.push(`/budget/${id}`);
			},
			openDialog: (id: number) => {
				setDialogOpen(true);
				deleteId.current = id;
			},
		},
	});
	async function handleDeleteRow() {
		setDialogOpen(false);
		const result: TStatusMessage = await deleteBudget(deleteId.current);
		console.log(result);
		if (result.status === "SUCCESS") {
			toast({
				description: "Presupuesto eliminado con éxito!",
				duration: 3000,
			});
		} else {
			toast({
				variant: "destructive",
				description: "Hubo un error al eliminar el presupuesto",
				duration: 3000,
			});
		}
		refresh();
	}
	return (
		<div>
			<div className="m-2 flex flex-row items-center gap-2 pt-2">
				<Input
					placeholder="Filtrar destinatario..."
					value={(table.getColumn("to")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("to")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<Select
					onValueChange={(value) => {
						if (value === "all")
							table.getColumn("accepted")?.setFilterValue(null);
						if (value === "true")
							table.getColumn("accepted")?.setFilterValue(true);
						if (value === "false")
							table.getColumn("accepted")?.setFilterValue(false);
					}}
				>
					<SelectTrigger className="w-[220px]">
						<SelectValue placeholder="Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="all">Todos</SelectItem>
							<SelectItem value="true">Aceptado</SelectItem>
							<SelectItem value="false">Pendiente</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div className="m-2 h-full rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									style={table.options.meta?.getRowStyles(row)}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									Sin resultados.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="m-2 flex items-center justify-end space-x-2 py-2">
				<Button
					size="sm"
					variant="outline"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
					className="border-2 border-primary"
				>
					Anterior
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
					className="border-2 border-primary"
				>
					Siguiente
				</Button>
			</div>

			{/* //$DIALOG */}
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent>
					<DialogHeader>Desea eliminar el presupuesto</DialogHeader>
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
							onClick={() => handleDeleteRow()}
							className="w-full"
						>
							Aceptar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
