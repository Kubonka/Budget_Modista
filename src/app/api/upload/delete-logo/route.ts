// import axios from "axios";
// import crypto from "crypto";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	console.log("entra");
	const body = await req.json();
	const cloudinaryUrl: string = body.url;
	const publicId = getPublicIdFromUrl(cloudinaryUrl) as string;
	//if (publicId) handleDeleteImage(publicId);
	console.log("publicId", publicId, "url", cloudinaryUrl);
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
		secure: true,
	});
	const response: UploadApiResponse = await new Promise((resolve, reject) => {
		if (publicId) {
			cloudinary.uploader.destroy(publicId, (err, result) => {
				if (err) {
					console.log("err", err);
					reject(err);
				}
				console.log("result", result);
				resolve(result);
			});
		} else {
			reject("id not found");
		}
	});
	return NextResponse.json({
		message: "image deleted",
		url: response.secure_url,
	});
}
const getPublicIdFromUrl = (url: string) => {
	const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
	const match = url.match(regex);
	return match ? match[1] : null;
};
// const handleDeleteImage = async (publicId: string) => {
// 	const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
// 	const timestamp = new Date().getTime();
// 	const apiKey = process.env.CLOUDINARY_API_KEY;
// 	const apiSecret = process.env.CLOUDINARY_API_SECRET as string;
// 	const signature = generateSHA1(generateSignature(publicId, apiSecret));
// 	const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
// 	try {
// 		const response = await axios.post(url, {
// 			public_id: publicId,
// 			signature: signature,
// 			api_key: apiKey,
// 			timestamp: timestamp,
// 		});
// 		console.error(response);
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

// const generateSHA1 = (data: any) => {
// 	const hash = crypto.createHash("sha1");
// 	hash.update(data);
// 	return hash.digest("hex");
// };

// const generateSignature = (publicId: string, apiSecret: string) => {
// 	const timestamp = new Date().getTime();
// 	return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
// };
