// Libera o front-end (Angular, em outra porta/domínio) a chamar essa API.
// Em produção, troque "*" pelo domínio real da loja por segurança.
export function applyCors(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-token");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return true; // sinaliza que a request já foi respondida
  }
  return false;
}
