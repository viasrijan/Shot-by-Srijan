import sharp from "sharp";
import { readdirSync, statSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const RAW_DIR = "drive_raw";
const FULL_DIR = "public/photos/full";
const THUMB_DIR = "public/photos/thumbs";
const MONTAGE = "/tmp/contact_sheet.jpg";

mkdirSync(FULL_DIR, { recursive: true });
mkdirSync(THUMB_DIR, { recursive: true });

const files = readdirSync(RAW_DIR)
  .filter((f) => /\.jpe?g$/i.test(f))
  .sort();

const out = [];
const tiles = [];

let idx = 0;
for (const file of files) {
  const src = join(RAW_DIR, file);
  const base = file.replace(/\.jpe?g$/i, "").toLowerCase().replace(/[^a-z0-9-]/g, "-");
  const meta = await sharp(src).metadata();

  // Full: max 2000px wide, good quality
  const fullBuf = await sharp(src)
    .rotate()
    .resize({ width: Math.min(meta.width, 2000), withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();
  writeFileSync(join(FULL_DIR, `${base}.jpg`), fullBuf);

  // Thumb: 1000px
  const thumbBuf = await sharp(src)
    .rotate()
    .resize({ width: 1000, withoutEnlargement: true })
    .jpeg({ quality: 70, mozjpeg: true })
    .toBuffer();
  writeFileSync(join(THUMB_DIR, `${base}.jpg`), thumbBuf);

  // Parse EXIF
  const exifStr = meta.exif ? meta.exif.toString("latin1") : "";
  const camera = (exifStr.match(/(SONY [A-Z0-9-]+)/) || ["Unknown"])[0];
  const dateMatch = exifStr.match(/(\d{4}:\d{2}:\d{2} \d{2}:\d{2}:\d{2})/);
  const date = dateMatch
    ? dateMatch[1].replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3").slice(0, 10)
    : "unknown";

  const fullMeta = await sharp(fullBuf).metadata();
  out.push({
    id: base,
    file,
    src: `/photos/full/${base}.jpg`,
    thumb: `/photos/thumbs/${base}.jpg`,
    width: fullMeta.width,
    height: fullMeta.height,
    camera,
    date,
    frame: `Frame ${String(idx + 1).padStart(2, "0")}`,
    title: `Untitled ${String(idx + 1).padStart(2, "0")}`,
    category: "journal",
    orientation: fullMeta.height > fullMeta.width ? "portrait" : "landscape",
  });

  tiles.push(await sharp(thumbBuf).resize(320, 240, { fit: "cover" }).toBuffer());
  idx++;
}

// Contact sheet: 4 cols grid with labels
const COLS = 4;
const rows = Math.ceil(tiles.length / COLS);
const TW = 320, TH = 240, LABEL = 28, PAD = 6;
const W = COLS * (TW + PAD) + PAD;
const H = rows * (TH + LABEL + PAD) + PAD;
const montageInput = tiles.map((buf, i) => {
  const x = PAD + (i % COLS) * (TW + PAD);
  const y = PAD + Math.floor(i / COLS) * (TH + LABEL + PAD);
  const label = Buffer.from(
    `<svg width="${TW}" height="${LABEL}"><rect width="100%" height="100%" fill="black"/><text x="4" y="20" font-size="15" fill="white" font-family="sans-serif">${i}: ${files[i]}</text></svg>`
  );
  return [
    { input: buf, left: x, top: y },
    { input: label, left: x, top: y + TH },
  ];
}).flat();

await sharp({ create: { width: W, height: H, channels: 3, background: { r: 20, g: 20, b: 20 } } })
  .composite(montageInput)
  .jpeg({ quality: 80 })
  .toFile(MONTAGE);

writeFileSync("scripts/photos.generated.json", JSON.stringify(out, null, 2));
console.log(`Processed ${out.length} photos -> ${FULL_DIR}, ${THUMB_DIR}`);
console.log(`Contact sheet -> ${MONTAGE}`);
