
export function formatarNome(nome = "") {
  return nome
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ")
}

export function primeiraLetraMaiuscula(texto = "") {
  if (!texto) return "";

  const textoLimpo = texto.trim().toLowerCase();

  return textoLimpo.charAt(0).toUpperCase() + textoLimpo.slice(1);
}

export function limitarTexto(texto = "", limite = 0) {
  if (texto.length <= limite) return texto
  return texto.slice(0, limite) + "..."
}

