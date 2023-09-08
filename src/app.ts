
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import cloudinary from './config/cloudinary.js';
import './config/firebase.js';
import rootRouter from './routes/index.ts';
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from 'swagger-jsdoc';


export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));
app.use(
	express.urlencoded({
		limit: '10mb',
		extended: true,
		parameterLimit: 50000,
	}),
);
app.use(
	bodyParser.json({
		limit: '50mb',
	}),
);

app.use(
	bodyParser.urlencoded({
		limit: '50mb',
		parameterLimit: 100000,
		extended: true,
	}),
);


// app.use(middleware.decodeToken);


// let upload = multer();

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

app.use('/api/v1/', rootRouter);

const swaggerOptions = {
  swaggerDefinition: {
    info: {
			version: "1.1.0",
      title: "Rest API",
      description: "A simple rest API",
      servers: ["http://localhost:3001"]
			
    }
  },
  apis: ["./routes/users.js"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

