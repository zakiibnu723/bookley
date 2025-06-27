export function getEmbedMapUrl(link) {
  if (!link) return "";
  // Jika sudah embed, langsung pakai
  if (link.includes("/maps/embed")) return link;

  // Jika link Google Maps biasa, ambil query/location
  // Contoh: https://www.google.com/maps/place/Alamat/@lat,long...
  // atau: https://maps.app.goo.gl/xxxx
  // Solusi universal: gunakan pencarian (q=...) dari link
  try {
    // Jika link sudah mengandung /place/ atau /?q=
    let q = "";
    if (link.includes("/place/")) {
      // Ambil setelah /place/ sampai /
      const match = link.match(/\/place\/([^/]+)/);
      if (match) q = decodeURIComponent(match[1].replace(/\+/g, " "));
    } else if (link.includes("?q=")) {
      q = decodeURIComponent(link.split("?q=")[1].split("&")[0]);
    } else if (link.includes("maps.app.goo.gl")) {
      // Untuk shortlink, tampilkan pencarian saja
      q = "";
    }
    // Jika dapat q, buat embed
    if (q) {
      return `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
    }
    // Jika shortlink, fallback: tampilkan iframe pencarian
    return `https://www.google.com/maps?output=embed`;
  } catch {
    return "";
  }
}