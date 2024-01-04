"use client";
import React, { CSSProperties } from "react";
import { v4 as uuidv4 } from "uuid";
type Props = {
	body: TBudgetData;
};

function Test3({ body }: Props) {
	const table: CSSProperties = {
		borderCollapse: "collapse",
		width: "100%",
	};
	const th2: CSSProperties = {
		paddingTop: "4px",
		paddingBottom: "4px",
		textAlign: "center",
		fontWeight: "600",
		fontSize: "10px",
		borderRight: "1px solid rgb(80 80 80)",
		borderBottom: "1px solid rgb(80 80 80)",
		borderLeft: "1px solid rgb(80 80 80)",
		backgroundColor: "rgb(170 170 190)",
	};

	const td: CSSProperties = {
		fontSize: "10px",
		paddingTop: "4px",
		paddingBottom: "4px",
		fontWeight: "500",
		paddingLeft: "4px",
		height: "35px",
		border: "1px solid rgb(80 80 80)",
	};
	const th1: CSSProperties = {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "35px",
		borderRight: "1px solid rgb(80 80 80) ",
		borderBottom: "1px solid rgb(80 80 80)",
	};
	const th1l: CSSProperties = {
		paddingLeft: "4px",
		fontSize: "10px",
		fontWeight: "600",
		width: "85px",
		height: "100%",
		backgroundColor: "rgb(170 170 190)",
		paddingTop: "8px",
		paddingBottom: "4px",
	};
	const th1r: CSSProperties = {
		paddingLeft: "8px",
		fontSize: "10px",
		width: "100%",
		fontWeight: "500",
		height: "100%",
		borderLeft: "1px solid rgb(80 80 80)",
		paddingTop: "8px",
		paddingBottom: "4px",
	};
	const th3: CSSProperties = {
		width: "85px",
		backgroundColor: "rgb(170 170 190)",
		fontSize: "10px",
		fontWeight: "500",
		height: "35px",
		textAlign: "center",
		borderRight: "1px solid rgb(80 80 80)",
		borderBottom: "1px solid rgb(80 80 80)",
		paddingTop: "4px",
		paddingBottom: "4px",
	};
	const pData: CSSProperties = {
		fontSize: "10px",
		color: "rgb(70 70 70)",
		fontWeight: "600",
	};

	return (
		<div style={{ width: "500px", padding: "4px", backgroundColor: "white" }}>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<div
						style={{
							marginBottom: "8px",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<p style={{ ...pData, fontSize: "14px" }}>
							LA MODISTA DE LOS PASTELES
						</p>
						<p style={pData}>ALEJANDRO KORN 1433</p>
						<p style={pData}>MAR DEL PLATA</p>
						<p style={pData}>223 4646844</p>
					</div>
					<p
						style={{
							fontSize: "14px",
							color: "rgb(90 90 90)",
							fontWeight: "700",
						}}
					>
						PRESUPUESTO
					</p>
				</div>
				<div
					style={{
						display: "flex",
						height: "96px",
						width: "96px",
						alignItems: "center",
						justifyContent: "center",
						paddingRight: "4px",
					}}
				>
					<img src="/LogoModista.jpg" alt="LOGO" />
				</div>
			</div>
			<div>
				<div
					style={{
						borderTop: "1px solid rgb(80 80 80)",
						borderLeft: "1px solid rgb(80 80 80)",
					}}
				>
					<div style={th1}>
						<p style={th1l}>FECHA</p>
						<p style={th1r}>{body?.date}</p>
					</div>
					<div style={th1}>
						<p style={th1l}>SEÑOR/A</p>
						<p style={th1r}>{body?.to?.toUpperCase()}</p>
					</div>
				</div>
				<table style={table}>
					<thead>
						<tr style={{ width: "100%", height: "35px" }}>
							<th style={th2}>DESCRIPCION</th>
							<th style={{ ...th2, width: "85px" }}>IMPORTE</th>
						</tr>
					</thead>
					<tbody>
						{body?.items?.map((item) => {
							return (
								<tr key={uuidv4()}>
									<td style={td}>
										{item.description ? (
											<p>{item.description?.toUpperCase()}</p>
										) : (
											<>
												<p>{`${item.category?.toUpperCase()} ${item.subcategory?.toUpperCase()}`}</p>
												<p style={{ fontSize: "8px" }}>{`${
													item.count
												} ${item.unit?.toUpperCase()}`}</p>
											</>
										)}
									</td>
									<td style={{ ...td, textAlign: "end", paddingRight: "20px" }}>
										{`$ ${item.price}`}
									</td>
								</tr>
							);
						})}
						{Array.from({ length: 10 - body?.items?.length }, (_, index) =>
							uuidv4()
						).map((ele) => {
							return (
								<tr key={ele}>
									<td style={td}></td>
									<td
										style={{ ...td, textAlign: "end", paddingRight: "20px" }}
									></td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<div
					style={{
						display: "flex",
						justifyContent: "end",
						alignItems: "center",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
						}}
					>
						<p
							style={{
								...th3,
								borderLeft: "1px solid rgb(80 80 80)",
								paddingTop: "8px",
							}}
						>
							TOTAL
						</p>
						<p
							style={{
								...th3,
								textAlign: "end",
								paddingRight: "20px",
								paddingTop: "8px",
							}}
						>
							{body?.total ? `$ ${body.total}` : ""}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Test3;
