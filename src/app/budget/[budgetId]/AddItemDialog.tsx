"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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
import { capitalize } from "@/lib/utils";
import CategoryAlert from "@/components/CategoryAlert";

//todo implementar
//import CategoryAlert from "../Alerts/CategoryAlert";

type Props = {
	acceptedStatus: boolean;
	onSubmit: (item: TItemData) => void;
	dbTables: {
		categories: Category[];
		prices: Price[];
		units: Unit[];
		allSubcategories: Subcategory[];
	};
};
function AddItemDialog({ acceptedStatus, onSubmit, dbTables }: Props) {
	const [open, setOpen] = useState(false);
	const [error, setError] = useState(false);
	const [extraValue, setExtraValue] = useState(0);
	const [item, setItem] = useState<TItemData>({} as TItemData);
	const [subcategories, setSubcategories] = useState<Subcategory[]>(
		[] as Subcategory[]
	);

	//$func
	useEffect(() => {
		const categoryId = dbTables.categories.find((c) => c.name === item.category)
			?.id as number;
		setSubcategories(
			dbTables.allSubcategories.filter((sub) => sub.categoryId === categoryId)
		);
	}, [item.category]);
	// useEffect(() => {
	//   if (addItemData.category_id !== 0)
	//     dispatch(getSubcategoriesById(addItemData.category_id));
	// }, [addItemData.category_id]);
	useEffect(() => {
		//todo ejecutar funcion que determine el total usando la lista de precios y multiplicando por el count
		setItem((p) => ({ ...p, price: calculatePrice() }));
	}, [item.count, extraValue]);

	function calculatePrice(): number {
		const subcategoryId = dbTables.allSubcategories.find(
			(s) => s.name === item.subcategory
		)?.id as number;
		const foundPrice = dbTables.prices.find(
			(price) => price.subcategoryId === subcategoryId
		) as Price;
		if (foundPrice) return foundPrice.value * item.count + extraValue;
		return 0;
	}
	//todo checkear esta funcion
	function validateForm() {
		if (item.category === "Personalizada") {
			if (item.description === "") {
				setError(true);
				return false;
			}
		} else {
			if (item.category === "" || item.subcategory === "" || item.count === 0) {
				setError(true);
				return false;
			}
		}
		setError(false);
		return true;
	}

	//$ markup
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
					disabled={acceptedStatus}
					className={`flex h-[28px] w-full items-center justify-center rounded-full p-0 ${
						acceptedStatus && "bg-primary-disabled"
					}`}
					onClick={() => {
						setItem({
							category: "",
							subcategory: "",
							count: 0,
							unit: "",
							price: 0,
							description: "",
							refId: uuidv4(),
							id: 0,
						});
						setOpen(true);
					}}
				>
					Agregar item
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Nuevo Item</DialogTitle>
					<DialogDescription>
						Selecciona una categoría, subcategoría y una cantidad.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4 w-full">
					{/* //$ category */}
					<Label htmlFor="category" className="text-left">
						Categoría
					</Label>
					<Select
						onValueChange={(value) => {
							if (value === "Personalizada") {
								{
									setItem((p) => ({ ...p, subcategory: "Personalizada" }));
									// setAddItemData((p) => ({
									//   ...p,
									//   subcategory_id: allSubcategories.find((s) => {
									//     console.log(s);
									//     return s.category_id === 1;
									//   })?.id as number,
									// }));
								}
							}
							const unitId = dbTables.categories.find((c) => c.name === value)
								?.unitId as number;
							setItem((p) => ({
								...p,
								category: value,
								unit: dbTables.units.find((u) => u.id === unitId)
									?.plural as string,
							}));
						}}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Seleccionar Categoría" />
						</SelectTrigger>
						<SelectContent className="max-w-[320px]">
							<SelectGroup>
								{dbTables.categories.map((category) => (
									<SelectItem key={category.id} value={category.name}>
										{capitalize(category.name)}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
					{item.category !== "Personalizada" ? (
						<>
							{/* //$ subcategory */}
							<Label htmlFor="subcategory" className="text-left">
								Subcategoría
							</Label>
							<Select
								onValueChange={(value) =>
									setItem((p) => ({
										...p,
										subcategory: value,
									}))
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Seleccionar Subcategoría" />
								</SelectTrigger>
								<SelectContent className="max-w-[320px]">
									<SelectGroup>
										{subcategories.map((subcategory) => (
											<SelectItem key={subcategory.id} value={subcategory.name}>
												{capitalize(subcategory.name)}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
							{/* //$ count */}
							<Label htmlFor="count" className="text-left">
								{`Cantidad en ${item.unit}`}
							</Label>
							<Input
								id="count"
								defaultValue={item.count}
								onFocus={(e) => e.target.select()}
								onChange={(e) => {
									const validated = parseInt(e.target.value);
									setItem((p) => ({
										...p,
										count: isNaN(validated) ? 0 : validated,
									}));
								}}
							/>
							{/* //$ extra price */}
							<Label htmlFor="extra" className="text-left">
								Valor agregado
							</Label>
							<Input
								id="extra"
								defaultValue={0}
								onFocus={(e) => e.target.select()}
								onChange={(e) => {
									const validated = parseInt(e.target.value);
									setExtraValue(isNaN(validated) ? 0 : validated);
								}}
							/>
						</>
					) : (
						<>
							{/* //$ description */}

							<Label htmlFor="description" className="text-left">
								Descripción
							</Label>
							<Input
								id="description"
								placeholder="Breve descripción del item..."
								defaultValue={""}
								onFocus={(e) => e.target.select()}
								onChange={(e) =>
									setItem((p) => ({
										...p,
										description: e.target.value,
									}))
								}
							/>
							{/* //$ price */}
							<Label htmlFor="price" className="text-left">
								Precio
							</Label>
							<Input
								id="price"
								defaultValue={0}
								onFocus={(e) => e.target.select()}
								onChange={(e) => {
									const validated = parseInt(e.target.value);
									console.log(typeof validated);
									setItem((p) => ({
										...p,
										price: isNaN(validated) ? 0 : validated,
									}));
								}}
							/>
						</>
					)}
					{/* //$ total */}
					<Label htmlFor="name" className="text-right text-lg">
						{`Total $ ${item.price}`}
					</Label>
				</div>
				<DialogFooter>
					<CategoryAlert className={error ? "mt-2" : "hidden"} />
					<Button
						type="submit"
						onClick={() => {
							if (validateForm()) {
								setExtraValue(0);
								onSubmit(item);
								setOpen(false);
							}
						}}
					>
						Agregar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
export default AddItemDialog;
