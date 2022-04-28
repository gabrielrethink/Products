const cards_div = document.querySelector(".productsCards");

const renderProducts = async () => {
  const url = "/products";
  const products = await fetch(url).then((response) => response.json());

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  cardsTemplate = "";

  for (let item of products) {
    item = {
      ...item,
      totalValue: formatter.format(item.price * item.productQuantity),
      price: formatter.format(item.price),
    };
    cardsTemplate += `<div class="card" style="width: 18rem">
  <div class="card-body">
    <h5 class="card-title">${item.productName}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${item.department}</h6>
    <p class="card-text">${item.productDescription}</p>

    <table class="table table-bordered" style="margin-bottom: 0px;">
      <thead>
        <tr>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${item.price}</td>
          <td>${item.productQuantity}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`;
  }
  cards_div.innerHTML = cardsTemplate;
};

window.addEventListener("DOMContentLoaded", () => renderProducts());
