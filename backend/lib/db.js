import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "products.json");

export async function readProducts() {
  const raw = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

export async function writeProducts(products) {
  await fs.writeFile(DB_PATH, JSON.stringify(products, null, 2), "utf-8");
}

export function slugify(name) {
  return name
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function nextId(products) {
  const max = products.reduce((m, p) => Math.max(m, parseInt(p.id, 10) || 0), 0);
  return String(max + 1);
}
