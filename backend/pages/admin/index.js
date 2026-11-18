import { useEffect, useState } from "react";

const API_URL = "/api/products";
const TOKEN_KEY = "vd_admin_token";

const emptyForm = {
  id: null,
  name: "",
  slug: "",
  category: "Vestuário",
  price: "",
  oldPrice: "",
  stock: "",
  featured: false,
  description: "",
  images: "",
  externalLink: "",
};

export default function Admin() {
  const [token, setToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (saved) setToken(saved);
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      setError("Não consegui carregar os produtos. O back-end está rodando?");
    }
    setLoading(false);
  }

  function saveToken() {
    localStorage.setItem(TOKEN_KEY, tokenInput);
    setToken(tokenInput);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
  }

  function openNewForm() {
    setForm(emptyForm);
    setShowForm(true);
    setError("");
  }

  function openEditForm(p) {
    setForm({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category,
      price: p.price,
      oldPrice: p.oldPrice || "",
      stock: p.stock,
      featured: p.featured,
      description: p.description,
      images: (p.images || []).join(", "),
      externalLink: p.externalLink || "",
    });
    setShowForm(true);
    setError("");
  }

  async function submitForm(e) {
    e.preventDefault();
    setError("");

    const payload = {
      name: form.name,
      slug: form.slug,
      category: form.category,
      price: form.price,
      oldPrice: form.oldPrice || null,
      stock: form.stock,
      featured: form.featured,
      description: form.description,
      images: form.images
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      externalLink: form.externalLink,
    };

    const isEdit = !!form.id;
    const url = isEdit ? `${API_URL}/${form.id}` : API_URL;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Erro ${res.status}`);
      }
      setShowForm(false);
      loadProducts();
    } catch (err) {
      setError(err.message || "Não consegui salvar. Confira o token de admin.");
    }
  }

  async function deleteProduct(p) {
    if (!confirm(`Apagar "${p.name}"? Essa ação não tem volta.`)) return;
    try {
      const res = await fetch(`${API_URL}/${p.id}`, {
        method: "DELETE",
        headers: { "x-admin-token": token },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Erro ${res.status}`);
      }
      loadProducts();
    } catch (err) {
      setError(err.message || "Não consegui apagar. Confira o token de admin.");
    }
  }

  if (!token) {
    return (
      <div className="wrap" style={{ maxWidth: 420 }}>
        <h1>Painel Vice District</h1>
        <p style={{ color: "var(--text-muted)" }}>
          Cole aqui o token definido em <code>.env.local</code> (<code>ADMIN_TOKEN</code>) para editar ou apagar produtos.
        </p>
        <div className="card">
          <label>Token de admin</label>
          <input
            type="password"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="cole o token aqui"
          />
          <div style={{ marginTop: 14 }}>
            <button className="btn btn-primary" onClick={saveToken}>Entrar</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>Produtos</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-primary" onClick={openNewForm}>+ Novo produto</button>
          <button className="btn btn-ghost" onClick={logout}>Sair</button>
        </div>
      </div>

      {error && (
        <p style={{ color: "var(--accent)", marginBottom: 16 }}>{error}</p>
      )}

      {loading ? (
        <p style={{ color: "var(--text-muted)" }}>Carregando...</p>
      ) : (
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Destaque</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>R$ {Number(p.price).toFixed(2)}</td>
                  <td>{p.stock}</td>
                  <td>{p.featured ? "Sim" : "—"}</td>
                  <td style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-ghost" onClick={() => openEditForm(p)}>Editar</button>
                    <button className="btn btn-danger" onClick={() => deleteProduct(p)}>Apagar</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ color: "var(--text-muted)" }}>
                    Nenhum produto cadastrado ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 10,
          }}
          onClick={() => setShowForm(false)}
        >
          <form
            className="card"
            style={{ maxWidth: 520, width: "100%", maxHeight: "85vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={submitForm}
          >
            <h2 style={{ marginTop: 0 }}>{form.id ? "Editar produto" : "Novo produto"}</h2>

            <label>Nome</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />

            <div style={{ height: 10 }} />
            <label>Slug (deixe vazio para gerar a partir do nome)</label>
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />

            <div style={{ height: 10 }} />
            <label>Categoria</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option>Vestuário</option>
              <option>Acessórios</option>
              <option>Decoração</option>
            </select>

            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <div style={{ flex: 1 }}>
                <label>Preço (R$)</label>
                <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              </div>
              <div style={{ flex: 1 }}>
                <label>Preço antigo (opcional)</label>
                <input type="number" step="0.01" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Estoque</label>
                <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
              </div>
            </div>

            <div style={{ height: 10 }} />
            <label>Descrição</label>
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

            <div style={{ height: 10 }} />
            <label>Imagens (URLs separadas por vírgula)</label>
            <textarea rows={2} value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} />

            <div style={{ height: 10 }} />
            <label>Link externo (opcional — outra loja, outra página, etc.)</label>
            <input value={form.externalLink} onChange={(e) => setForm({ ...form, externalLink: e.target.value })} />

            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                style={{ width: "auto" }}
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              <label style={{ margin: 0 }}>Produto em destaque</label>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button type="submit" className="btn btn-primary">Salvar</button>
              <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
