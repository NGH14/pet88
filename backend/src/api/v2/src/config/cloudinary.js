import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(JSON.parse(process.env.CLOUDINARY_KEY));

export default cloudinary;
