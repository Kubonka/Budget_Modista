"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

function Home() {
	//$ markup
	const session = useSession();
	console.log("se", session);
	return (
		<div className="h-full w-full flex flex-col gap-3">
			{/* <h2>SIGN IN WITH GOOGLE</h2>
			<button
				onClick={() => signIn("google")}
				className="border-2 border-slate-950"
			>
				LOG IN
			</button>
			<button onClick={() => signOut()} className="border-2 border-slate-950">
				LOG OUT
			</button> */}
		</div>
	);
}

export default Home;
