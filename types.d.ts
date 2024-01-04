type TStatusMessage = { status: "SUCCESS" | "ERROR"; message: string };
type Unit = {
	id: number;
	singular: string;
	plural: string;
};
type Category = {
	id: number;
	name: string;
	active: boolean;
	unitId: number;
};
type Subcategory = {
	id: number;
	name: string;
	active: boolean;
	categoryId: number;
};
type Price = {
	id: number;
	value: number;
	active: boolean;
	subcategoryId: number;
};
type PBudget = {
	id: number;
	to: string;
	date: string;
	total: number;
	accepted: boolean;
	active: boolean;
};
type Budget = {
	id: number;
	to: string;
	date: string;
	total: number;
	accepted: boolean;
	active: boolean;
	items: Item[];
};
type Item = {
	id: number;
	count: number;
	price: number;
	description: string;
	subcategoryId: number;
	budgetId: number;
};

type TItemData = {
	id: number;
	refId: string;
	count: number;
	price: number;
	description: string;
	subcategory: string;
	category: string;
	unit: string;
};
type TBudgetData = Omit<Budget, "items"> & { items: TItemData[] };
//! OLD
// type TStatusMessage = { status: "SUCCESS" | "ERROR"; message: string };
// type TActionResponse = "pending" | "fulfilled" | "rejected";

// //! Base
// type TBudget = {
// 	id: number;
// 	to: string;
// 	total: number;
// 	accepted: boolean;
// 	date: string;
// 	items: TItem[];
// 	active: boolean;
// };
// type TPrice = {
// 	id: number;
// 	value: number;
// 	subcategoryId: number;
// 	active: boolean;
// };
// type TCategory = {
// 	id: number;
// 	name: string;
// 	unit_id: number;
// 	active: boolean;
// };
// type TSubcategory = {
// 	id: number;
// 	name: string;
// 	active: boolean;
// 	category_id: number;
// };
// type TItem = {
// 	id: number;
// 	subcategory_id: number;
// 	price: number;
// 	count: number;
// 	description: string;
// };
// type TUnit = { id: number; singular: string; plural: string };

// //! Extras
// type TItemDetail = {
// 	category: string;
// 	subcategory: string;
// 	unit: string;
// 	price: string;
// 	count: number;
// 	description: string;
// 	ref_id: string;
// };
// type TAddItemData = TItem & { ref_id: string };

// type TBudgetTableData = {
// 	date: string;
// 	id: number;
// 	to: string;
// 	total: number;
// 	accepted: boolean;
// };

// type TTargetBudget = {
// 	to: string;
// 	total: string;
// 	date: string;
// 	items: {
// 		category: string;
// 		subcategory: string;
// 		unit: string;
// 		description: string;
// 		count: string;
// 		price: string;
// 	}[];
// };
