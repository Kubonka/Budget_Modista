import type { Metadata } from "next";

import { Suspense } from "react";

import CategoriesSkeleton from "@/components/skeletons/CategoriesSkeleton";
import TopMenu from "@/components/topMenu/TopMenu";

export const metadata: Metadata = {
	title: "Presupuestos Modista",
	description: "Herramienta para generar y administrar presupuestos",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className=" bg-gray-100 h-screen">
			<TopMenu className="" />
			<Suspense fallback={<CategoriesSkeleton />}>{children}</Suspense>
		</div>
	);
}
