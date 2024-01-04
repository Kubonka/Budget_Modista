"use client";
import React, { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { getAllCategories } from "@/actions/categories";
import {
	createSubcategory,
	deleteSubcategory,
	getAllSubcategories,
	getSubcategoriesByCategory,
	updateSubcategory,
} from "@/actions/subcategories";
import { capitalize } from "@/lib/utils";
import SubcategoryDialogCreate from "./SubcategoryDialogCreate";
import SubcategoryDialogDelete from "./SubcategoryDialogDelete";

//!import SubcategoryDialog from "../components/Dialogs/SubcategoryDialog";

export default function ManageSubcategories() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [allSubcategories, setAllSubcategories] = useState<Subcategory[]>([]);
	const [subcategoriesByCat, setsubcategoriesByCat] = useState<Subcategory[]>(
		[]
	);
	const [selecting, setSelecting] = useState(false);
	const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
	const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory>(); //todo refact
	//$ func
	async function getCategoriesAndSubcategories() {
		const cat = await getAllCategories({ active: true });
		const subcat = await getAllSubcategories({ active: true });
		setCategories(cat);
		setAllSubcategories(subcat);
	}
	async function getSubcategories() {
		const category = categories.find(
			(c) => c.id === parseInt(selectedCategoryId)
		) as Category;
		const res = await getSubcategoriesByCategory(category, { active: true });
		setsubcategoriesByCat(res);
	}
	useEffect(() => {
		getCategoriesAndSubcategories();
	}, []);
	useEffect(() => {
		if (selectedCategoryId) getSubcategories();
	}, [selectedCategoryId]);

	async function handleSubmit(subcategoryData: Subcategory) {
		try {
			let result: TStatusMessage;
			if (!subcategoryData.id) {
				result = await createSubcategory(subcategoryData);
				if (result.status && result.status === "SUCCESS") {
					toast({
						description: "Subcategoría creada con éxito!",
						duration: 3000,
					});
				} else {
					toast({
						variant: "destructive",
						description: "Hubo un error al crear la subcategoría",
						duration: 3000,
					});
				}
			} else {
				result = await updateSubcategory(subcategoryData);
				if (result.status && result.status === "SUCCESS") {
					toast({
						description: "Subcategoría actualizada con éxito!",
						duration: 3000,
					});
				} else {
					toast({
						variant: "destructive",
						description: "Hubo un error al actualizar la subcategoría",
						duration: 3000,
					});
				}
			}
			getSubcategories();
		} catch (error) {
			console.log(error);
		}
	}
	async function handleDelete(subcategory: Subcategory) {
		try {
			const result: TStatusMessage = await deleteSubcategory(subcategory);
			if (result.status === "SUCCESS") {
				toast({
					description: "Subcategoría eliminada con éxito!",
					duration: 3000,
				});
			} else {
				toast({
					variant: "destructive",
					description: "Hubo un error al eliminar la subcategoría",
					duration: 3000,
				});
			}
			getSubcategories();
		} catch (error) {
			console.log(error);
		}
	}
	//$ markup
	return (
		<div className="h-screen ">
			<Card className="m-2 pt-2">
				<CardContent>
					<Label
						htmlFor="unit"
						className="pl-4 text-left text-sm font-bold text-slate-500"
					>
						CATEGORIA
					</Label>
					<Select
						onValueChange={(value) => setSelectedCategoryId(value)}
						onOpenChange={() => {
							setTimeout(() => setSelecting((p) => !p), 50);
						}}
					>
						<SelectTrigger className="mb-4 w-full font-semibold">
							<SelectValue placeholder="Seleccionar Categoría" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{categories.map(
									(category: Category) =>
										category.id !== 1 && (
											<SelectItem
												key={category.id}
												value={category.id.toString()}
												className="font-semibold"
											>
												{capitalize(category.name)}
											</SelectItem>
										)
								)}
							</SelectGroup>
						</SelectContent>
					</Select>
					<Table>
						<TableCaption>Lista de las subcategorías creadas.</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead className=" w-full p-0  ">
									<div className="flex flex-row justify-between">
										<p className="pt-2 font-bold">SUBCATEGORIA</p>
										<SubcategoryDialogCreate
											selecting={selecting}
											create={true}
											data={{
												name: "",
												id: 0,
												categoryId: parseInt(selectedCategoryId),
												active: true,
											}}
											onSubmit={handleSubmit}
										/>
									</div>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{subcategoriesByCat.map(
								(subcategory: Subcategory) =>
									subcategory.id !== 1 &&
									subcategory.active && (
										<TableRow key={subcategory.id}>
											<TableCell className="flex flex-row items-center justify-between font-medium px-0">
												<div className="w-full ">
													{capitalize(subcategory.name)}
												</div>
												<div className="flex h-8 w-20 justify-around ">
													<SubcategoryDialogCreate
														create={false}
														selecting={selecting}
														data={{
															name: subcategory.name,
															id: subcategory.id,
															categoryId: subcategory.categoryId,
															active: true,
														}}
														onSubmit={handleSubmit}
													/>
													<SubcategoryDialogDelete
														onDelete={handleDelete}
														subcategory={subcategory}
													/>
												</div>
											</TableCell>
										</TableRow>
									)
							)}
						</TableBody>
						<TableFooter>
							<TableRow></TableRow>
						</TableFooter>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
