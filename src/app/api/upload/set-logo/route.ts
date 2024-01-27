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
	const data = await req.formData();
	const image: FormDataEntryValue = data.get("image") as File;
	const oldImage: FormDataEntryValue = data.get("oldImage") as string;
	if (!image) {
		return NextResponse.json("no se ha subido ninguna imagen", { status: 400 });
	}

	const bytes = await image.arrayBuffer();
	const buffer = Buffer.from(bytes);
	const response: UploadApiResponse = await new Promise((resolve, reject) => {
		//todo delete first if exist
		const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
		if (oldImage) {
			const match = oldImage.match(regex) as RegExpMatchArray;
			const path = match[1];
		}
		cloudinary.uploader
			.upload_stream({}, (err, result) => {
				if (err) reject(err);
				resolve(result as UploadApiResponse);
			})
			.end(buffer);
	});
	console.log(response);
	return NextResponse.json({
		message: "image uploaded",
		url: response.secure_url,
	});
}
