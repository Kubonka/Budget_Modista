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
		<div
			style={{
				width: "500px",
				padding: "4px",
				backgroundColor: "rgb(249 250 251)",
			}}
		>
			<div
				style={{
					padding: "4px",
					border: "1px solid black",
					borderRadius: "4px",
				}}
			>
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
							<p style={pData}>ALEJANDRO KORN 1431</p>
							<p style={pData}>MAR DEL PLATA</p>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									gap: "10px",
									alignItems: "center",
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									width="12"
									height="12"
									viewBox="0 0 48 48"
								>
									<path
										fill="#fff"
										d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
									></path>
									<path
										fill="#fff"
										d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
									></path>
									<path
										fill="#cfd8dc"
										d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
									></path>
									<path
										fill="#40c351"
										d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
									></path>
									<path
										fill="#fff"
										fillRule="evenodd"
										d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
										clipRule="evenodd"
									></path>
								</svg>
								<p style={pData}>223 4228155</p>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									gap: "10px",
									alignItems: "center",
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									width="12"
									height="12"
									viewBox="0 0 48 48"
								>
									<linearGradient
										id="6769YB8EDCGhMGPdL9zwWa_ho8QlOYvMuG3_gr1"
										x1="15.072"
										x2="24.111"
										y1="13.624"
										y2="24.129"
										gradientUnits="userSpaceOnUse"
									>
										<stop offset="0" stopColor="#e3e3e3"></stop>
										<stop offset="1" stopColor="#e2e2e2"></stop>
									</linearGradient>
									<path
										fill="url(#6769YB8EDCGhMGPdL9zwWa_ho8QlOYvMuG3_gr1)"
										d="M42.485,40H5.515C4.126,40,3,38.874,3,37.485V10.515C3,9.126,4.126,8,5.515,8h36.969	C43.874,8,45,9.126,45,10.515v26.969C45,38.874,43.874,40,42.485,40z"
									></path>
									<linearGradient
										id="6769YB8EDCGhMGPdL9zwWb_ho8QlOYvMuG3_gr2"
										x1="26.453"
										x2="36.17"
										y1="25.441"
										y2="37.643"
										gradientUnits="userSpaceOnUse"
									>
										<stop offset="0" stopColor="#f5f5f5"></stop>
										<stop offset=".03" stopColor="#eee"></stop>
										<stop offset="1" stopColor="#eee"></stop>
									</linearGradient>
									<path
										fill="url(#6769YB8EDCGhMGPdL9zwWb_ho8QlOYvMuG3_gr2)"
										d="M42.485,40H8l37-29v26.485C45,38.874,43.874,40,42.485,40z"
									></path>
									<linearGradient
										id="6769YB8EDCGhMGPdL9zwWc_ho8QlOYvMuG3_gr3"
										x1="3"
										x2="45"
										y1="24"
										y2="24"
										gradientUnits="userSpaceOnUse"
									>
										<stop offset="0" stopColor="#d74a39"></stop>
										<stop offset="1" stopColor="#c73d28"></stop>
									</linearGradient>
									<path
										fill="url(#6769YB8EDCGhMGPdL9zwWc_ho8QlOYvMuG3_gr3)"
										d="M5.515,8H8v32H5.515C4.126,40,3,38.874,3,37.485V10.515C3,9.126,4.126,8,5.515,8z M42.485,8	H40v32h2.485C43.874,40,45,38.874,45,37.485V10.515C45,9.126,43.874,8,42.485,8z"
									></path>
									<linearGradient
										id="6769YB8EDCGhMGPdL9zwWd_ho8QlOYvMuG3_gr4"
										x1="24"
										x2="24"
										y1="8"
										y2="38.181"
										gradientUnits="userSpaceOnUse"
									>
										<stop offset="0" stopOpacity=".15"></stop>
										<stop offset="1" stopOpacity=".03"></stop>
									</linearGradient>
									<path
										fill="url(#6769YB8EDCGhMGPdL9zwWd_ho8QlOYvMuG3_gr4)"
										d="M42.485,40H30.515L3,11.485v-0.969C3,9.126,4.126,8,5.515,8h36.969	C43.874,8,45,9.126,45,10.515v26.969C45,38.874,43.874,40,42.485,40z"
									></path>
									<linearGradient
										id="6769YB8EDCGhMGPdL9zwWe_ho8QlOYvMuG3_gr5"
										x1="3"
										x2="45"
										y1="17.73"
										y2="17.73"
										gradientUnits="userSpaceOnUse"
									>
										<stop offset="0" stopColor="#f5f5f5"></stop>
										<stop offset="1" stopColor="#f5f5f5"></stop>
									</linearGradient>
									<path
										fill="url(#6769YB8EDCGhMGPdL9zwWe_ho8QlOYvMuG3_gr5)"
										d="M43.822,13.101L24,27.459L4.178,13.101C3.438,12.565,3,11.707,3,10.793v-0.278	C3,9.126,4.126,8,5.515,8h36.969C43.874,8,45,9.126,45,10.515v0.278C45,11.707,44.562,12.565,43.822,13.101z"
									></path>
									<linearGradient
										id="6769YB8EDCGhMGPdL9zwWf_ho8QlOYvMuG3_gr6"
										x1="24"
										x2="24"
										y1="8.446"
										y2="27.811"
										gradientUnits="userSpaceOnUse"
									>
										<stop offset="0" stopColor="#e05141"></stop>
										<stop offset="1" stopColor="#de4735"></stop>
									</linearGradient>
									<path
										fill="url(#6769YB8EDCGhMGPdL9zwWf_ho8QlOYvMuG3_gr6)"
										d="M42.485,8h-0.3L24,21.172L5.815,8h-0.3C4.126,8,3,9.126,3,10.515v0.278	c0,0.914,0.438,1.772,1.178,2.308L24,27.459l19.822-14.358C44.562,12.565,45,11.707,45,10.793v-0.278C45,9.126,43.874,8,42.485,8z"
									></path>
								</svg>
								<p style={pData}>lamodistadelospasteles@gmail.com</p>
							</div>
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
										<td
											style={{ ...td, textAlign: "end", paddingRight: "20px" }}
										>
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
		</div>
	);
}

export default Test3;
