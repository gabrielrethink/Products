console.log("TESTE");
const url = new URLSearchParams("products?productMaterial=Granite");

for (const iterator of url) {
  console.log(iterator);
}
