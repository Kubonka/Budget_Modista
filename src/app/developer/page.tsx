"use client";
import { loadDb } from "@/actions/loadDb";

export default function page() {
	return (
		<main className="border-2 border-red-300">
			<button onClick={async () => loadDb()}>GENERAR DB</button>
		</main>
	);
}
