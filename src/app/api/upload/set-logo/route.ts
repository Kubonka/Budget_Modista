import { NextResponse } from "next/server";
import {
	UploadApiResponse,
	UploadResponseCallback,
	v2 as cloudinary,
} from "cloudinary";
export async function POST(req: Request) {
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});
	// const data = await req.formData();
	// const image: FormDataEntryValue = data.get("image") as File;
	// const oldImage: FormDataEntryValue = data.get("oldImage") as string;
	// if (!image) {
	// 	return NextResponse.json("no se ha subido ninguna imagen", { status: 400 });
	// }

	//const bytes = await image.arrayBuffer();
	//const buffer = Buffer.from(bytes);
	//! new
	const data = await req.formData();
	const image: FormDataEntryValue = data.get("image") as File;
	const oldImage: FormDataEntryValue = data.get("oldImage") as string;
	//const image = await data.get("image");
	const fileBuffer = await image.arrayBuffer();
	if (!image) {
		return NextResponse.json("no se ha subido ninguna imagen", { status: 400 });
	}

	var mime = image.type;
	var encoding = "base64";
	var base64Data = Buffer.from(fileBuffer).toString("base64");
	var fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

	const uploadToCloudinary = (): Promise<UploadApiResponse> => {
		return new Promise((resolve, reject) => {
			var result = cloudinary.uploader
				.upload(fileUri, {
					invalidate: true,
				})
				.then((result) => {
					console.log(result);
					resolve(result);
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		});
	};

	const result: UploadApiResponse = await uploadToCloudinary();
	let imageUrl = result.secure_url;
	return NextResponse.json({
		message: "image uploaded",
		url: imageUrl,
	});

	//!
	// const response: UploadApiResponse = await new Promise((resolve, reject) => {
	// 	//todo delete first if exist
	// 	const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
	// 	if (oldImage) {
	// 		const match = oldImage.match(regex) as RegExpMatchArray;
	// 		const path = match[1];
	// 	}
	// 	cloudinary.uploader
	// 		.upload_stream({}, (err, result) => {
	// 			if (err) reject(err);
	// 			resolve(result as UploadApiResponse);
	// 		})
	// 		.end(buffer);
	// });
	// console.log(response);
	// return NextResponse.json({
	// 	message: "image uploaded",
	// 	url: response.secure_url,
	// });
}
