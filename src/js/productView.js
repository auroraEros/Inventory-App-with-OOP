import Storage from "./storage.js";

const totalProducts = document.getElementById("total-products");
const productTitle = document.getElementById("product-title");
const productCategory = document.getElementById("product-category");
const productQuantity = document.getElementById("quantity");
const productsList = document.getElementById("products-list");
const searchInput = document.getElementById("search-products");
const sortInput = document.getElementById("sort-products");
const addProductBtn = document.getElementById("add-new-product");

class ProductView {
  constructor() {
    addProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    sortInput.addEventListener("change", (e) => this.sortProducts(e));
    productsList.addEventListener("click", (e) => this.deleteProduct(e));

    this.products = [];
  }

  setupProducts() {
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    totalProducts.innerText = this.products.length;
  }

  // Adding a new product
  addNewProduct(e) {
    e.preventDefault();
    const product = {
      title: productTitle.value,
      quantity: +productQuantity.value,
      category: productCategory.value,
      id: Date.now(),
      createdAt: new Date().toLocaleDateString("fa-IR"),
    };

    if (!product.title || !product.quantity)
      return swal("", "Please fill input fields!", "warning", {
        button: true,
      });
    if (!product.category)
      return swal("", "Please create a category first!", "warning", {
        button: true,
      });

    Storage.saveProduct(product);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    totalProducts.innerText = this.products.length;
    productTitle.value = "";
    productQuantity.value = "";
  }

  // Create product list
  createProductsList(products) {
    productsList.innerHTML = "";
    products.forEach((product) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == product.category
      );

      const li = document.createElement("li");
      li.setAttribute("class", "list flex items-center justify-between mb-1");
      li.innerHTML = `
        <span class="text-slate-400">${product.title}</span>
        <div class="flex items-center gap-x-3">
          <span class="text-slate-400">${product.createdAt}</span>
          <span
            class="block px-3 py-0.5 border border-slate-400 text-slate-400 rounded-2xl text-sm"
            >${selectedCategory.title}</span>
          
          <span
            class="flex item-center justify-center w-7 h-7 rounded-full bg-slate-500 text-slate-300 border-2"
          >
            ${product.quantity}</span
          >
          <button
          data-id=${product.id}
          
            class="btn border rounded-2xl py-0.5 px-2 border-red-400 text-red-400"
          >
            delete
          </button>
        </div>`;

      productsList.insertAdjacentElement("afterbegin", li);
    });
  }

  // Searching through added products
  searchProducts(e) {
    const filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().slice(0, 2).includes(e.target.value.toLowerCase())
    );

    if (!filteredProducts.length)
      productsList.innerHTML = `<div class=" flex justify-center text-slate-400 text-xl ">
                                                               <span>No Such Product!</span>
                                                            </div>`;
    else this.createProductsList(filteredProducts);
  }

  // Sorting added products

  sortProducts(e) {
    this.products = Storage.getAllProducts(e.target.value);
    this.createProductsList(this.products);
  }

  // deleting added products
  deleteProduct(e) {
    if (e.target.classList.contains("btn")) {
      const id = +e.target.dataset.id;
      Storage.removeProduct(id);
      this.products = Storage.getAllProducts();
      this.createProductsList(this.products);
      totalProducts.innerText = this.products.length;
    }
  }
}

export default new ProductView();
