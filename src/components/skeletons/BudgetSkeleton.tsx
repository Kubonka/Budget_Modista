import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
export default function BudgetSkeleton() {
	return (
		<Card className=" m-2 pt-4">
			<CardContent className="flex flex-col gap-3">
				<div className="flex flex-row justify-between">
					<Skeleton className="h-[20px] w-20 rounded-full" />
					<div className="flex flex-col gap-1 ">
						<Skeleton className="w-14 h-[14px] rounded-full" />
						<Skeleton className="w-16 h-[32px] rounded-full" />
					</div>
				</div>
				<Skeleton className="h-[30px] w-full rounded-md" />
				<Separator />
				<ul className="flex flex-col gap-2">
					{[1, 2, 3, 4].map((item) => (
						<Skeleton key={item} className="h-[30px] w-full rounded-md" />
					))}
				</ul>
				<Card className="flex flex-row justify-between px-2 py-2">
					<Skeleton className="h-[16px] w-full rounded-full" />
				</Card>
				<Separator />
				<Skeleton className="h-[24px] w-full rounded-full" />
			</CardContent>
			<CardFooter className="flex flex-row justify-end gap-2">
				<Skeleton className="h-10 px-4 py-2 rounded-md w-full" />
				<Skeleton className="h-10 px-4 py-2 rounded-md w-full" />
			</CardFooter>
		</Card>
	);
}
