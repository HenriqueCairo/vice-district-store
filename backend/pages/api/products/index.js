import { readProducts, writeProducts, slugify, nextId } from "../../../lib/db";
import { applyCors } from "../../../lib/cors";
import { isAuthorized } from "../../../lib/auth";

export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  if (req.method === "GET") {
    const products = await readProducts();
    const { category } = req.query;
    const filtered = category && category !== "Todos"
      ? products.filter((p) => p.category === category)
      : products;
    res.status(200).json(filtered);
    return;
  }

  if (req.method === "POST") {
    if (!isAuthorized(req)) {
      res.status(401).json({ error: "Token de admin inválido ou ausente." });
      return;
    }
    const products = await readProducts();
    const body = req.body || {};

    if (!body.name || body.price === undefined) {
      res.status(400).json({ error: "Nome e preço são obrigatórios." });
      return;
    }

    const newProduct = {
      id: nextId(products),
      slug: body.slug ? slugify(body.slug) : slugify(body.name),
      name: body.name,
      category: body.category || "Acessórios",
      price: Number(body.price) || 0,
      oldPrice: body.oldPrice ? Number(body.oldPrice) : null,
      stock: body.stock !== undefined ? Number(body.stock) : 0,
      featured: !!body.featured,
      description: body.description || "",
      images: Array.isArray(body.images) && body.images.length
        ? body.images
        : ["https://placehold.co/800x800/15121f/f3f0fa?text=Vice+District"],
      externalLink: body.externalLink || "",
    };

    products.push(newProduct);
    await writeProducts(products);
    res.status(201).json(newProduct);
    return;
  }

  res.setHeader("Allow", ["GET", "POST", "OPTIONS"]);
  res.status(405).json({ error: `Método ${req.method} não permitido.` });
}
