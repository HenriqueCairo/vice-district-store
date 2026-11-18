export default function Home() {
  return (
    <div className="wrap">
      <h1>Vice District — back-end</h1>
      <p style={{ color: "var(--text-muted)" }}>
        Esse projeto só serve a API de produtos que o site (Angular) consome.
      </p>
      <p>
        API: <code>/api/products</code>
        <br />
        Painel para editar/apagar produtos: <a href="/admin"><code>/admin</code></a>
      </p>
    </div>
  );
}
