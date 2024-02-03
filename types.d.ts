type TStatusMessage = { status: "SUCCESS" | "ERROR"; message: string };
type TObjectDate = {
	year: number;
	month: number;
	day: number;
};
type Unit = {
	id: number;
	singular: string;
	plural: string;
};
type Category = {
	id: number;
	name: string;
	custom: boolean;
	active: boolean;
	unitId: number;
	userId: string;
};
type Subcategory = {
	id: number;
	name: string;
	active: boolean;
	categoryId: number;
	userId: string;
};
type Price = {
	id: number;
	value: number;
	active: boolean;
	subcategoryId: number;
	userId: string;
};
type PBudget = {
	id: number;
	to: string;
	date: string;
	total: number;
	accepted: boolean;
	active: boolean;
	userId: string;
};
type Budget = {
	id: number;
	to: string;
	date: string;
	total: number;
	accepted: boolean;
	active: boolean;
	items: Item[];
	userId: string;
};
type Item = {
	id: number;
	count: number;
	price: number;
	description: string;
	subcategoryId: number;
	budgetId: number;
};
type User = {
	id: string;
	name: string | null;
	email: string | null;
	image: string | null;
	b_name: string | null;
	b_location: string | null;
	b_adress: string | null;
	b_phone: string | null;
	b_email: string | null;
	b_logo: string | null;
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
type MonthRevenue = {
	year: number;
	month: number;
	monthProfit: MonthProfit;
};
type MonthProfit = {
	totalProfit: number;
	budgetsCount: number;
	subcategories: SubcategoryProfit[];
};
type SubcategoryProfit = {
	name: string;
	profit: number;
};
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
