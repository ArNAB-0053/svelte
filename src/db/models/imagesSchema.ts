import mongoose from 'mongoose';

const imagesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image_url: { type: String, required: true },
    tags: [{ type: String }],
}, { timestamps: true });

export const ImagesSchema = mongoose.model('ImagesSchema', imagesSchema);