// Protege as ações de criar/editar/apagar produto com um token simples,
// definido em .env.local (ADMIN_TOKEN). Não é um sistema de login completo,
// só o suficiente para o painel /admin não ficar totalmente aberto.
export function isAuthorized(req) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return true; // se não configurou token, não bloqueia (ambiente de teste)
  const got = req.headers["x-admin-token"];
  return got === expected;
}
