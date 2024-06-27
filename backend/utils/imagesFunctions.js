import { encode } from 'blurhash';
import fetch from 'node-fetch';
import { createCanvas, loadImage } from 'canvas';

async function fetchAndResizeImage(imageUrl, targetWidth, targetHeight) {
    try {
        console.log("Fetching image from URL:", imageUrl);
        const response = await fetch(imageUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        const buffer = await response.arrayBuffer();
        const image = await loadImage(Buffer.from(buffer));
        console.log("Image loaded with original dimensions:", image.width, image.height);

        const aspectRatio = image.width / image.height;
        let width = targetWidth;
        let height = targetHeight;

        
        if (image.width > image.height) {
            height = Math.floor(targetWidth / aspectRatio);
        } else {
            width = Math.floor(targetHeight * aspectRatio);
        }

        const canvas = createCanvas(width, height);
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, width, height);
        console.log("Image resized and drawn on canvas:", width, height);

        return { canvas, width, height };
    } catch (error) {
        console.error("Error in fetchAndResizeImage:", error.message);
        throw error;
    }
}

export const generateBlurHashFromImageUrl = async (imageUrl) => {
    try {
        console.time('BlurHash Generation Time');
        console.log('Starting BlurHash generation for:', imageUrl);

        const targetWidth = 100; 
        const targetHeight = 100; 

        const { canvas, width, height } = await fetchAndResizeImage(imageUrl, targetWidth, targetHeight);
        const context = canvas.getContext('2d');
        const imageData = context.getImageData(0, 0, width, height);
        console.log(`Resized ImageData obtained: ${width}x${height}`);

        const blurHash = encode(imageData.data, imageData.width, imageData.height, 4, 4);
        console.log('BlurHash generated:', blurHash);

        console.timeEnd('BlurHash Generation Time');
        return blurHash;
    } catch (error) {
        console.error('Error generating BlurHash:', error.message);
        throw new Error('Failed to generate BlurHash');
    }
};

