// Regenerates the image manifests from the photos in public/images/projects:
//   src/lib/data/image-sizes.json        { "/images/projects/<slug>/NN.jpg": [width, height] }
//   src/lib/data/image-placeholders.json { "/images/projects/<slug>/NN.jpg": "data:image/webp;base64,…" }
// Run after adding or removing project photos: npm run images:manifest
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const projectsDir = path.join(root, "public/images/projects");
const dataDir = path.join(root, "src/lib/data");

const sizes = {};
const placeholders = {};

for (const slug of fs.readdirSync(projectsDir).sort()) {
  const dir = path.join(projectsDir, slug);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".jpg")).sort()) {
    const src = `/images/projects/${slug}/${file}`;
    const image = sharp(path.join(dir, file)).rotate();
    const { width, height, orientation = 1 } = await sharp(path.join(dir, file)).metadata();
    // EXIF orientations 5–8 are rotated 90°, so the displayed width and height are swapped
    sizes[src] = orientation >= 5 ? [height, width] : [width, height];
    // A tiny preview shown (blurred) while the real photo loads
    const tiny = await image.resize(16, 16, { fit: "inside" }).webp({ quality: 40 }).toBuffer();
    placeholders[src] = `data:image/webp;base64,${tiny.toString("base64")}`;
  }
}

fs.writeFileSync(path.join(dataDir, "image-sizes.json"), JSON.stringify(sizes, null, 0).replace(/\],"/g, '],\n"').replace(/^\{/, "{\n").replace(/\}$/, "\n}") + "\n");
fs.writeFileSync(path.join(dataDir, "image-placeholders.json"), JSON.stringify(placeholders, null, 0).replace(/","/g, '",\n"').replace(/^\{/, "{\n").replace(/\}$/, "\n}") + "\n");
console.log(`Wrote manifests for ${Object.keys(sizes).length} images`);
