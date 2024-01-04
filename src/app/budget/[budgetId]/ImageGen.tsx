"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { createRoot } from "react-dom/client";
import { toPng } from "html-to-image";
import Test3 from "./Test3";
import { v4 as uuidv4 } from "uuid";

type Props = {
	getBody: () => TBudgetData;
	onGenerationSuccess: (status: boolean) => void;
};
function ImageGen({ onGenerationSuccess, getBody }: Props) {
	const pdfmarkupRef = useRef<any>();
	const [flag, setFlag] = useState(false);
	const handleGeneratePdf = async () => {
		let root: any = createRoot(pdfmarkupRef.current);
		const body: TBudgetData = getBody();
		console.log(body);
		root.render(<Test3 key={uuidv4()} body={body} />);
		setTimeout(() => {
			console.log(body);
			toPng(pdfmarkupRef.current, { cacheBust: false })
				.then((dataUrl: any) => {
					const link = document.createElement("a");
					link.download = `"Presupuesto"_${body.date}.png`;
					link.href = dataUrl;
					link.click();
					setFlag(true);
				})
				.catch((err) => {
					console.log(err);
					onGenerationSuccess(false);
				});
			setTimeout(() => {
				root.unmount();
				setFlag(false);
				onGenerationSuccess(true);
			}, 2500);
		}, 200);
	};

	return (
		<div>
			<Button className="w-full" onClick={handleGeneratePdf}>
				Generar Imagen
			</Button>
			<div className={`${flag ? "hidden" : ""} absolute top-[1900px] m-4`}>
				<div ref={pdfmarkupRef}></div>
			</div>
		</div>
	);
}

export default ImageGen;
