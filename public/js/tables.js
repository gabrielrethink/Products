const tableHead = document.getElementById("tableHead");
const tableBody = document.getElementById("tableBody");

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const goToLink = (id) => {
  window.location.href = `showProduct.html?id=${id}`;
};

const renderProducts = async (filter) => {
  let url = "";
  if (filter) {
    url = `/products?${filter[0]}=${filter[1]}`;
  } else {
    url = `/products`;
  }
  const products = await fetch(url).then((response) => response.json());

  let headTemplate = "";

  for (const key in products[0]) {
    headTemplate += `<td>${key}</td>`;
  }

  let bodyTemplate = "";

  for (let value of products) {
    bodyTemplate += `<tr onclick=goToLink(${value.id})>`;
    value = {
      ...value,
      totalValue: formatter.format(value.price * value.productQuantity),
      price: formatter.format(value.price),
    };

    for (const iterator in value) {
      bodyTemplate +=
        value.minimunQuantity > value.productQuantity
          ? `<td class="table-danger"> ${value[iterator]} </td>`
          : `<td> ${value[iterator]} </td>`;
    }
    bodyTemplate += "</tr>";
  }
  tableHead.innerHTML = headTemplate;
  tableBody.innerHTML = bodyTemplate;
};

window.addEventListener("DOMContentLoaded", () => renderProducts());
