"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { getAllCategories } from "@/actions/categories";
import { getAllUnits } from "@/actions/units";
import { getAllSubcategories } from "@/actions/subcategories";
import { getAllPrices } from "@/actions/prices";
import StatusHeader from "./statusHeader/StatusHeader";
import { createBudget, getBudgetById, updateBudget } from "@/actions/budgets";
import BudgetItemCard from "./BudgetItemCard";
import AddItemDialog from "./AddItemDialog";
import ImageGen from "./ImageGen";
import { createItem } from "@/actions/items";
import { getLocalDate } from "@/lib/utils";
import BudgetSkeleton from "@/components/skeletons/BudgetSkeleton";

type Props = {
	params: { budgetId: string };
};
function Budget({ params }: Props) {
	const { budgetId } = params;
	const router = useRouter();
	const [idle, setIdle] = useState(true);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState<Category[]>([] as Category[]);
	const [units, setUnits] = useState<Unit[]>([] as Unit[]);
	const [prices, setPrices] = useState<Price[]>([] as Price[]);
	const [allSubcategories, setAllSubcategories] = useState<Subcategory[]>(
		[] as Subcategory[]
	);
	const [currentBudget, setCurrentBudget] = useState<TBudgetData>({
		to: "",
		total: 0,
		date: getLocalDate(),
	} as TBudgetData);
	const [acceptedStatus, setAcceptedStatus] = useState(false);
	//$ func
	useEffect(() => {
		setLoading(true);
		loadAll();
		return () => {
			setCategories([]);
			setUnits([]);
			setAllSubcategories([]);
			setPrices([]);
			setCurrentBudget({ total: 0, to: "" } as TBudgetData);
		};
	}, []);
	useEffect(() => {
		if (budgetId !== "0") {
			loadBudget();
		}
		setLoading(false);
	}, [prices]);
	useEffect(() => {
		if (acceptedStatus) handleSaveBudget();
	}, [acceptedStatus]);
	useEffect(() => {
		setCurrentBudget((p) => ({
			...p,
			total: currentBudget?.items?.reduce((total, item) => {
				return total + item.price;
			}, 0),
		}));
	}, [currentBudget.items]);

	async function loadAll() {
		const responseCategories = await getAllCategories({ active: false });
		const responseUnits = await getAllUnits();
		const responseSubcategories = await getAllSubcategories({ active: false });
		const responsePrices = await getAllPrices();
		setCategories([...responseCategories]);
		setUnits(responseUnits);
		setAllSubcategories(responseSubcategories);
		setPrices(responsePrices);
	}
	async function loadBudget() {
		const responseBudget = await getBudgetById(parseInt(budgetId));
		if (responseBudget) checkInCurrentBudget(responseBudget);
	}
	function checkInCurrentBudget(resBudget: Budget) {
		const newItems: TItemData[] = resBudget.items.map((item) => {
			const subcategoryFound = allSubcategories?.find(
				(s) => s.id === item.subcategoryId
			);
			const categoryFound = categories?.find(
				(c) => c.id === subcategoryFound?.categoryId
			);
			const unitFound = units?.find((u) => u.id === categoryFound?.unitId);
			const { subcategoryId, ...cleanItem } = item;
			return {
				...cleanItem,
				refId: uuidv4(),
				subcategory: subcategoryFound?.name as string,
				category: categoryFound?.name as string,
				unit:
					item.count > 1
						? (unitFound?.plural as string)
						: (unitFound?.singular as string),
			};
		});
		const newBudget: TBudgetData = { ...resBudget, items: newItems };
		setCurrentBudget(newBudget);
	}
	function setUpTargetBody() {
		const body: TBudgetData = {
			...currentBudget,
			to: currentBudget.to || "",
			date: getLocalDate(),
			total: currentBudget.total || 0,
		};
		return body;
	}
	async function handleGenerationSuccess(status: boolean) {
		if (status) {
			toast({
				description: "Imagen generada con éxito!",
				duration: 3000,
			});
		} else {
			toast({
				variant: "destructive",
				description: "Hubo un error al generar la imagen",
				duration: 3000,
			});
		}
	}
	async function handleDeleteItem(refId: string) {
		setCurrentBudget((p) => ({
			...p,
			items: p.items.filter((i) => i.refId !== refId),
		}));
	}
	function handleSubmitItem(item: TItemData) {
		setCurrentBudget((p) => ({
			...p,
			items: p.items ? [...p.items, item] : [item],
		}));
	}
	async function handleSaveBudget() {
		try {
			setIdle(false);
			let result: TStatusMessage;
			const { items, ...partialBudget } = currentBudget;
			const budget = {
				...partialBudget,
				total: currentBudget.total || 0,
				date: getLocalDate(),
				accepted: currentBudget.accepted || false,
				userId: "1",
			};
			if (budgetId === "0") {
				result = await createBudget(budget);
			} else {
				result = await updateBudget(budget);
			}
			if (result.status === "SUCCESS") {
				const response = await createItem(
					currentBudget.items?.map((item) => {
						return {
							price: item.price,
							description: item.description,
							count: item.count,
							budgetId: parseInt(result.message),
							subcategoryId: allSubcategories.find(
								(s) => s.name === item.subcategory
							)?.id as number,
						};
					}) || []
				);
				if (response.status === "SUCCESS") {
					toast({
						description: "Presupuesto guardado con éxito!",
						duration: 3000,
					});
				} else {
					toast({
						variant: "destructive",
						description: "Hubo un error al guardar el presupuesto",
						duration: 3000,
					});
				}
				if (budgetId === "0") {
					router.push(`/budget/${result.message}`);
				} else {
					setIdle(true);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}
	function handleStatusChange() {
		setAcceptedStatus(true);
		setCurrentBudget((p) => ({ ...p, accepted: true }));
	}
	//$ markup
	if (loading) return <BudgetSkeleton />;
	return (
		<Card className=" m-2 pt-4">
			<CardContent className="flex flex-col gap-3">
				<StatusHeader
					acceptedStatus={currentBudget?.accepted}
					onStatusChange={handleStatusChange}
				/>
				<Input
					placeholder="Destinatario"
					className="text-[16px]"
					defaultValue={currentBudget?.to}
					onChange={(e) =>
						setCurrentBudget((p) => ({ ...p, to: e.target.value }))
					}
				/>
				<Separator />
				<ul className="flex flex-col gap-2">
					{currentBudget?.items?.map((item) => (
						<li key={item.refId}>
							<BudgetItemCard
								data={item}
								onDeleteItem={handleDeleteItem}
								acceptedStatus={acceptedStatus}
							/>
						</li>
					))}
				</ul>
				<Card className="flex flex-row justify-between px-2 py-2">
					<p className=" font-semibold">Total</p>
					<p className=" font-semibold">{`$ ${currentBudget.total || "0"}`}</p>
				</Card>
				<Separator />
				<AddItemDialog
					dbTables={{
						categories: categories.filter((c) => c.active),
						allSubcategories: allSubcategories.filter((s) => s.active),
						prices,
						units,
					}}
					onSubmit={handleSubmitItem}
					acceptedStatus={acceptedStatus}
				/>
			</CardContent>
			<CardFooter className="flex flex-row justify-end gap-2">
				<Button
					disabled={acceptedStatus}
					className={`w-full ${acceptedStatus && " bg-primary-disabled"}`}
					onClick={handleSaveBudget}
				>
					Guardar
				</Button>
				<ImageGen
					onGenerationSuccess={handleGenerationSuccess}
					getBody={setUpTargetBody}
					idle={idle}
				/>
			</CardFooter>
		</Card>
	);
}

export default Budget;
//s
