import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
	title: "Presupuestos Modista",
	description: "Herramienta para generar y administrar presupuestos",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} h-full flex-col flex gap-0 `}>
				<AuthProvider>
					<Toaster />
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}
