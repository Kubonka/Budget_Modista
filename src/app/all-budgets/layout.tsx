import type { Metadata } from "next";
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
		<div className="h-full flex-col flex gap-0">
			<TopMenu className="" />
			{children}
		</div>
	);
}
