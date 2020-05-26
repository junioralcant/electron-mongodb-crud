const { BrowserWindow, Notification } = require("electron");
const Product = require("./models/Product");

async function createProduct(productData) {
  const product = await Product.create(productData);

  new Notification({
    title: "Electron MongoDB",
    body: "Product Saved Successfully",
  }).show;

  return console.log(product);
}

async function listProducts() {
  const products = await Product.find();

  return products;
}

async function deleteProduct(id) {
  await Product.findByIdAndRemove(id);
}

async function showProduct(id) {
  const product = await Product.findById(id);
  console.log(product);
  return product;
}

async function updateProduct(id, productDados) {
  const product = await Product.findByIdAndUpdate(id, productDados, {
    new: true,
  });

  return console.log(product);
}

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  window.loadFile("src/views/index.html");
}

module.exports = {
  createWindow,
  createProduct,
  listProducts,
  deleteProduct,
  showProduct,
  updateProduct,
};
