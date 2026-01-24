
export function formatarNome(nome = "") {
  return nome
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ")
}
