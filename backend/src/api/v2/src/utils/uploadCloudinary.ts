import multer from "multer";
import cloudinary from "cloudinary";


let upload = multer();

// app.post('/test-image', upload.single('image'), async (req, res) => {
// 	const data = await sharp(req?.file?.buffer).webp().toBuffer();
// 	const folder = await cloudinary.api.create_folder('test3');
// 	cloudinary.uploader
// 		.upload_stream(
// 			{ public_id: 'test_upload2', folder: folder?.name },
// 			(error) => {
// 				if (error) {
// 					res.status(500).send(error);
// 				} else {
// 					res.json('File uploaded successfully:');
// 				}
// 			},
// 		)
// 		.end(data);
// });

