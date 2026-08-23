import sharp from 'sharp';
import { readdir, mkdir, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'node:fs';

const FOLDERS = ['1st-vdo', '2nd-vdo', '3rd-vdo', '4th-vdo'];
const PUBLIC_DIR = join(process.cwd(), 'public');
const FULL_WIDTH = 960;
const FULL_HEIGHT = 540;
const FULL_QUALITY = 80;
const THUMB_WIDTH = 240;
const THUMB_HEIGHT = 135;
const THUMB_QUALITY = 50;
const BATCH_SIZE = 20; // Process 20 frames in parallel at a time

async function processFolder(folder) {
  const folderPath = join(PUBLIC_DIR, folder);
  const thumbPath = join(PUBLIC_DIR, `${folder}-thumb`);

  // Create thumb directory if it doesn't exist
  if (!existsSync(thumbPath)) {
    await mkdir(thumbPath, { recursive: true });
  }

  // Get all original JPG files sorted
  const files = await readdir(folderPath);
  const jpgFiles = files
    .filter((f) => f.endsWith('.jpg'))
    .sort();

  console.log(`[${folder}] Found ${jpgFiles.length} JPG files`);

  // Select every other frame (odd-indexed in 1-based: 001, 003, 005, ..., 299)
  const selectedFrames = [];
  for (let i = 0; i < jpgFiles.length; i += 2) {
    selectedFrames.push(jpgFiles[i]);
  }

  console.log(`[${folder}] Selected ${selectedFrames.length} frames for conversion`);

  // Process frames in batches
  for (let batchStart = 0; batchStart < selectedFrames.length; batchStart += BATCH_SIZE) {
    const batch = selectedFrames.slice(batchStart, batchStart + BATCH_SIZE);
    const promises = batch.map(async (file, batchIndex) => {
      const frameIndex = batchStart + batchIndex + 1;
      const outputName = `frame-${String(frameIndex).padStart(3, '0')}.webp`;
      const inputPath = join(folderPath, file);

      // Convert to full-res WebP (960x540, quality 80)
      await sharp(inputPath)
        .resize(FULL_WIDTH, FULL_HEIGHT)
        .webp({ quality: FULL_QUALITY })
        .toFile(join(folderPath, outputName));

      // Convert to thumbnail WebP (240x135, quality 50)
      await sharp(inputPath)
        .resize(THUMB_WIDTH, THUMB_HEIGHT)
        .webp({ quality: THUMB_QUALITY })
        .toFile(join(thumbPath, outputName));
    });

    await Promise.all(promises);

    const processed = Math.min(batchStart + BATCH_SIZE, selectedFrames.length);
    console.log(`[${folder}] Converted ${processed}/${selectedFrames.length} frames`);
  }

  // Delete all original .jpg files
  console.log(`[${folder}] Deleting original JPG files...`);
  const deletePromises = jpgFiles.map((file) => unlink(join(folderPath, file)));
  await Promise.all(deletePromises);

  console.log(`[${folder}] Done! ${selectedFrames.length} WebP frames + thumbnails created, ${jpgFiles.length} JPGs deleted.`);
}

async function main() {
  console.log('Starting frame conversion...');
  console.log(`Full-res: ${FULL_WIDTH}x${FULL_HEIGHT} @ quality ${FULL_QUALITY}`);
  console.log(`Thumbnails: ${THUMB_WIDTH}x${THUMB_HEIGHT} @ quality ${THUMB_QUALITY}`);
  console.log('');

  for (const folder of FOLDERS) {
    await processFolder(folder);
    console.log('');
  }

  console.log('All conversions complete!');
}

main().catch((err) => {
  console.error('Conversion failed:', err);
  process.exit(1);
});
