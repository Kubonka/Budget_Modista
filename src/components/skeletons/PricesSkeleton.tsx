import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
export default function PricesSkeleton() {
	return (
		<Card className="m-2 pt-2">
			<CardContent>
				<div className="my-2 flex flex-row justify-between  px-4 ">
					<Skeleton className="h-[18px]" />
					<Skeleton className="h-[18px]" />
				</div>
			</CardContent>
		</Card>
	);
}
