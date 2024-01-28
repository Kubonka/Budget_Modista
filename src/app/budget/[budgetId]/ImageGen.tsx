"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { createRoot } from "react-dom/client";
import { toPng } from "html-to-image";
import Test3 from "./Test3";
import { v4 as uuidv4 } from "uuid";

type Props = {
	getBody: () => TBudgetData;
	userData: User;
	onGenerationSuccess: (status: boolean) => void;
	idle: boolean;
};
function ImageGen({ onGenerationSuccess, getBody, idle, userData }: Props) {
	const markupRef = useRef<any>();
	const [flag, setFlag] = useState(false);
	const handleGenerateImage = async () => {
		let root: any = createRoot(markupRef.current);
		const body: TBudgetData = getBody();
		console.log(body);
		await root.render(<Test3 key={uuidv4()} body={body} userData={userData} />);
		setTimeout(() => {
			console.log("body", body);
			console.log("user", userData);
			toPng(markupRef.current, { cacheBust: false })
				.then((dataUrl: any) => {
					const link = document.createElement("a");
					link.download = `Presupuesto_${body.date}.png`;
					link.href = dataUrl;
					link.click();
					setFlag(true);
					setTimeout(() => {
						root.unmount();
						setFlag(false);
						onGenerationSuccess(true);
					}, 2500);
				})
				.catch((err) => {
					console.log("err", err);
					onGenerationSuccess(false);
					root.unmount();
				});
		}, 1000);
	};

	return (
		<div>
			<Button className="w-full" onClick={() => idle && handleGenerateImage()}>
				Generar Imagen
			</Button>
			<div className={`${flag ? "hidden" : ""} absolute top-[1900px]`}>
				<div ref={markupRef}></div>
			</div>
		</div>
	);
}

export default ImageGen;
