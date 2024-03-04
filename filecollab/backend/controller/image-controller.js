import express from 'express';
import cors from 'cors';
import multer from 'multer'; // Import multer
import File  from '../models/file.js'; // Assuming File is a Mongoose model for files
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Multer configuration for file upload
const upload = multer({ dest: 'uploads/' }); // Specify the upload directory

// Middleware for parsing multipart/form-data
app.use(upload.single('file')); // 'file' should match the name attribute of your file input field

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route for file upload
export const uploadImage = async (request, response) => {
    const fileObj = {
        path: request.file.path,
        name: request.file.originalname,
    }

    try {
        const file = await File.create(fileObj);
        response.status(200).json({ path: `http://localhost:${process.env.PORT}/file/${file._id}` });
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message });
    }
}

// Route for downloading file
export const getImage = async (request, response) => {
    try {
        const file = await File.findById(request.params.fileId);
        file.downloadCount++;
        await file.save();
        response.download(file.path, file.name);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ msg: error.message });
    }
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
