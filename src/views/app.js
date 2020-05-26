const productForm = document.getElementById("productForm");

const { remote } = require("electron");
const main = remote.require("./main");

const name = document.getElementById("name");
const price = document.getElementById("price");
const description = document.getElementById("description");
const productList = document.getElementById("products");

let products = [];
let editingStatus = false;
productId = "";

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = {
    name: name.value,
    price: price.value,
    description: description.value,
  };

  if (!editingStatus) {
    await main.createProduct(product);
  } else {
    await main.updateProduct(productId, product);
    editingStatus = false;
    productid = "";
  }

  productForm.reset();
  name.focus();
  list();
});

async function deleteProduct(id) {
  const response = confirm("Deseja realmente excluir o produto ?");
  if (response) {
    await main.deleteProduct(id);
    await list();
  }
  return;
}

async function getDadosProduct(id) {
  const product = await main.showProduct(id);

  name.value = product.name;
  description.value = product.description;
  price.value = product.price;

  editingStatus = true;
  productId = product._id;
}

function renderProducts(products) {
  productList.innerHTML = "";
  products.forEach((product) => {
    productList.innerHTML += `
            <div class="card card-body my-2">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <h3>${product.price}</h3>
                <p>
                    <button class="btn btn-danger" onclick="deleteProduct('${product._id}')">
                        DELETE
                    </button>
                    <button class="btn btn-secondary" onclick="getDadosProduct('${product._id}')">
                        EDIT
                    </button>
                </p>
               
            </div>
        `;
  });
}

const list = async () => {
  products = await main.listProducts();
  renderProducts(products);
};

async function init() {
  await list();
}

init();
