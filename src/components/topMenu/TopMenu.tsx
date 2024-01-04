"use client";
import Menu from "./Menu";
import { cn } from "@/lib/utils";
import Title from "./Title";

type Props = {
	className: string;
};

export default function TopMenu({ className }: Props) {
	return (
		<div
			className={cn(
				"flex w-full flex-row items-center justify-between bg-gray-400 px-4 py-2 mb-0",
				className
			)}
		>
			<Title />
			<Menu />
		</div>
	);
}
