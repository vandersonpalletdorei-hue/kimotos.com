async function main() {
  try {
    const res = await fetch('https://kimotos-rj.vercel.app/api/frete');
    const text = await res.text();
    console.log("HTML CONTENT:");
    console.log(text);
  } catch (err: any) {
    console.error("Fetch error:", err.message);
  }
}
main();
