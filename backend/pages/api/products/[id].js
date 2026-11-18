import { readProducts, writeProducts, slugify } from "../../../lib/db";
import { applyCors } from "../../../lib/cors";
import { isAuthorized } from "../../../lib/auth";

export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  const { id } = req.query;
  const products = await readProducts();

  // Aceita buscar tanto por id quanto por slug (o front-end usa slug nas URLs).
  const product = products.find((p) => p.id === id || p.slug === id);

  if (req.method === "GET") {
    if (!product) {
      res.status(404).json({ error: "Produto não encontrado." });
      return;
    }
    res.status(200).json(product);
    return;
  }

  if (req.method === "PUT") {
    if (!isAuthorized(req)) {
      res.status(401).json({ error: "Token de admin inválido ou ausente." });
      return;
    }
    const index = products.findIndex((p) => p.id === id || p.slug === id);
    if (index === -1) {
      res.status(404).json({ error: "Produto não encontrado." });
      return;
    }
    const body = req.body || {};
    const updated = {
      ...products[index],
      ...body,
      id: products[index].id,
      slug: body.slug ? slugify(body.slug) : products[index].slug,
      price: body.price !== undefined ? Number(body.price) : products[index].price,
      oldPrice: body.oldPrice ? Number(body.oldPrice) : null,
      stock: body.stock !== undefined ? Number(body.stock) : products[index].stock,
      featured: body.featured !== undefined ? !!body.featured : products[index].featured,
    };
    products[index] = updated;
    await writeProducts(products);
    res.status(200).json(updated);
    return;
  }

  if (req.method === "DELETE") {
    if (!isAuthorized(req)) {
      res.status(401).json({ error: "Token de admin inválido ou ausente." });
      return;
    }
    const filtered = products.filter((p) => p.id !== id && p.slug !== id);
    if (filtered.length === products.length) {
      res.status(404).json({ error: "Produto não encontrado." });
      return;
    }
    await writeProducts(filtered);
    res.status(200).json({ ok: true });
    return;
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE", "OPTIONS"]);
  res.status(405).json({ error: `Método ${req.method} não permitido.` });
}
