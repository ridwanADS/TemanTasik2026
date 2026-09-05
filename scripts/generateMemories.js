const fs = require('fs');
const path = require('path');
const sizeOfModule = require('image-size');
const sizeOf = typeof sizeOfModule === 'function' ? sizeOfModule : sizeOfModule.imageSize || sizeOfModule.default;

const mediaDir = path.join(__dirname, '..', 'public', 'fotovideo');
const outputFile = path.join(__dirname, '..', 'src', 'data', 'memoriesData.json');

const files = fs.readdirSync(mediaDir);

const memories = [];

files.forEach(file => {
  const ext = path.extname(file).toLowerCase();
  const fullPath = path.join(mediaDir, file);
  
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp') {
    try {
      const dimensions = sizeOf(fullPath);
      const isLandscape = dimensions.width > dimensions.height;
      
      let span = "col-span-1 row-span-1";
      if (isLandscape) {
        span = Math.random() > 0.5 ? "col-span-1 md:col-span-2 row-span-1" : "col-span-1 md:col-span-2 row-span-2";
      } else {
        span = "col-span-1 row-span-2";
      }

      memories.push({
        type: "image",
        src: `/fotovideo/${file}`,
        span: span
      });
    } catch (e) {
      console.error(`Error reading image size for ${file}, using default span.`);
      const rand = Math.random();
      let fallbackSpan = "col-span-1 row-span-2"; // 60% chance for portrait
      if (rand > 0.6 && rand < 0.8) fallbackSpan = "col-span-1 md:col-span-2 row-span-1"; // 20% chance landscape
      else if (rand >= 0.8) fallbackSpan = "col-span-1 md:col-span-2 row-span-2"; // 20% chance big square
      
      memories.push({
        type: "image",
        src: `/fotovideo/${file}`,
        span: fallbackSpan
      });
    }
  } else if (ext === '.mp4' || ext === '.webm') {
    // For videos, we'll assume portrait phone videos
    memories.push({
      type: "video",
      src: `/fotovideo/${file}`,
      span: "col-span-1 row-span-2"
    });
  }
});

// Shuffle the array for a mixed gallery look
for (let i = memories.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [memories[i], memories[j]] = [memories[j], memories[i]];
}

// Ensure the target directory exists
const targetDir = path.dirname(outputFile);
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(memories, null, 2));
console.log(`Generated ${memories.length} memories data to ${outputFile}`);
