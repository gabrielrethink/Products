const id = new URLSearchParams(window.location.search).get("id");

const formData_div = document.getElementById("formData");

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const setFormsRows = async () => {
  const url = "/products/" + id;
  const products = await fetch(url).then((response) => response.json());

  return [
    {
      productName: products.productName ?? "",
      department: products.department ?? "",
    },
    {
      productAdjective: products.productAdjective ?? "",
      productMaterial: products.productMaterial ?? "",
      product: products.product ?? "",
    },
    { productDescription: products.productDescription ?? "" },
    {
      price: products.price ?? "",
      productQuantity: products.productQuantity ?? "",
      minimunQuantity: products.minimunQuantity ?? "",
      totalValue:
        products.price && products.productQuantity
          ? products.price * products.productQuantity
          : "",
    },
    {
      createdAt: products.createdAt ?? "",
      updatedAt: products.updatedAt ?? "",
    },
  ];
};

const alterItemOnKeyDownEnter = (key, value) => {
  try {
    const body = {
      [key]: value,
      updatedAt: new Date().toJSON().slice(0, 19).replace("T", " "),
    };
    if (key === "price" || key === "productQuantity") {
      body.totalValue =
        document.getElementById("price").value *
        document.getElementById("productQuantity").value;
    }
    console.log(body);
    fetch("products/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(() => window.location.replace("showProduct.html?id=" + id));
  } catch (error) {
    console.log(error);
  }
};

const handlerElementOnClick = (key) => {
  if (key !== "totalValue") {
    const inputElement = document.getElementById(key);
    const cancelValue = inputElement.value;
    inputElement.disabled = false;
    inputElement.focus();

    inputElement.addEventListener("keydown", (event) => {
      event.key === "Enter" &&
        (event.preventDefault(),
        alterItemOnKeyDownEnter(inputElement.id, inputElement.value));
    });
    inputElement.addEventListener("blur", () => {
      inputElement.disabled = true;
      inputElement.value = cancelValue;
    });
  }
};

const inputFormatter = (key, value) => {
  const format = key
    .replace(key[0], key[0].toUpperCase())
    .replace(/([A-Z])/g, " $1")
    .slice(1, key.lenght);

  const isDisabled = id ? "disabled" : "";

  setTimeout(() => {
    document
      .getElementById("div" + key)
      .addEventListener("dblclick", () => handlerElementOnClick(key));
  }, 500);

  if (key === "productDescription") {
    return `
    <div class="mb-3" id="div${key}">
          <label for="${key}" class="form-label">${format}</label>
          <div class="form-floating">
            <textarea
            id="${key}"
            class="form-control"
            style="height: 100px"
            ${isDisabled}>
            ${value}
            </textarea>
          </div>
        </div>`;
  }
  return `<div class="col" id="div${key}">
  <label for="${key}" class="form-label">${format}</label>
          <input
          id="${key}"
          required
          type="text"
          class="form-control"
          value="${value}"
          ${isDisabled}
          />
          </div>`;
};

const renderProduct = async () => {
  const formRows = await setFormsRows();
  if (!id) {
    // document.getElementById("newProduct").classList.remove("d-none");
  }

  // document.getElementById("deleteProduct").classList.remove("d-none");

  let template = "";
  for (const row of formRows) {
    template += '<div class="row">';
    for (const key in row) {
      template += inputFormatter(key, row[key]);
    }
    template += "</div>";
  }
  formData_div.innerHTML = template;
};

window.addEventListener("DOMContentLoaded", renderProduct());
