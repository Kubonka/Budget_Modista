"use client";
import React, { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import PriceDialogUpdate from "./PriceDialogUpdate";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { capitalize } from "@/lib/utils";
import { getAllCategories } from "@/actions/categories";
import { getAllSubcategories } from "@/actions/subcategories";
import { getAllUnits } from "@/actions/units";
import { getAllPrices, updatePrice } from "@/actions/prices";
import PricesSkeleton from "@/components/skeletons/PricesSkeleton";
function ManagePrices() {
	const [loading, setLoading] = useState(false);
	const [units, setUnits] = useState<Unit[]>();
	const [prices, setPrices] = useState<Price[]>();
	const [categories, setCategories] = useState<Category[]>();
	const [allSubcategories, setAllSubcategories] = useState<Subcategory[]>();
	//$ func
	async function loadAll() {
		setLoading(true);
		const responseCategories = await getAllCategories({ active: true });
		const responseSubcategories = await getAllSubcategories({ active: true });
		const responseUnits = await getAllUnits();
		setUnits(responseUnits);
		setAllSubcategories(responseSubcategories);
		setCategories(responseCategories);
	}
	async function loadPrices() {
		const responsePrices = await getAllPrices();
		setPrices(responsePrices);
		setLoading(false);
	}
	useEffect(() => {
		loadAll();
		loadPrices();
	}, []);

	async function handleSubmit(priceData: Price) {
		try {
			let result: TStatusMessage;
			result = await updatePrice(priceData);
			if (result.status && result.status === "SUCCESS") {
				toast({ description: "Precio modificado con éxito!", duration: 3000 });
			} else {
				toast({
					variant: "destructive",
					description: "Hubo un error al modificar el precio",
					duration: 3000,
				});
			}
			loadPrices();
		} catch (error) {
			console.log(error);
		}
	}

	//$ markup
	if (loading) return <PricesSkeleton />;
	return (
		<div className="h-screen ">
			<Card className="m-2 pt-2">
				<CardContent>
					<div className="my-2 flex flex-row justify-between  px-4 ">
						<Label className="text-[18px] text-title-strong">
							SUBCATEGORIA
						</Label>
						<Label className="text-[18px] text-title-strong">VALOR</Label>
					</div>
					<Separator className="h-[2px] bg-title" />
					{categories?.map(
						(category: Category) =>
							category.id != 1 && (
								<ul className="mt-2 flex-col " key={category.id}>
									<Label className=" text-[16px] text-primary">
										{`${category.name.toUpperCase()} (${
											units?.find((unit) => unit.id === category.unitId)
												?.singular
										})`}
									</Label>
									<Table>
										<TableBody>
											{allSubcategories
												?.filter((s) => s.categoryId === category.id)
												.map((subcategory) => {
													const priceFound = prices?.find(
														(p) => p.subcategoryId === subcategory.id
													);
													return (
														<TableRow key={subcategory.id}>
															<TableCell className="flex flex-row items-center justify-between p-2 font-medium">
																<p className="text-[14px] font-semibold text-title-strong w-[180px] border-[1px] border-red-200">
																	{`${capitalize(subcategory.name)} `}
																</p>
																<div className="flex items-center gap-1">
																	<p className="text-right border-[1px] border-red-200 w-[50px] text-[16px] font-semibold text-title-strong flex-nowrap">
																		{"$" + priceFound?.value}
																	</p>
																	<PriceDialogUpdate
																		data={priceFound as Price}
																		onSubmit={handleSubmit}
																	/>
																</div>
															</TableCell>
														</TableRow>
													);
												})}

											{/* {prices?.filter(
													(price: Price) =>
														category.name === price.category.name
												)
												.map((el: Price) => {
													return (
														<TableRow key={el.id}>
															<TableCell className="flex flex-row items-center justify-between p-2 font-medium">
																<p className="text-[14px] font-semibold text-title-strong">
																	{`${capitalize(el.subcategory.name)} `}
																</p>
																<div className="flex items-center gap-4">
																	<p className="text-right  text-[16px] font-semibold text-title-strong">
																		{"$ " + el.value}
																	</p>
																	<PriceDialogCreate
																		data={{
																			id: el.id,
																			value: el.value,
																		}}
																		onSubmit={handleSubmit}
																	/>
																</div>
															</TableCell>
														</TableRow>
													);
												})} */}
										</TableBody>
									</Table>
								</ul>
							)
					)}
				</CardContent>
			</Card>
		</div>
	);
}
export default ManagePrices;
