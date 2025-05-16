import CategoryView from "../src/js/categoryView.js";
import ProductView from "../src/js/productView.js";

document.addEventListener("DOMContentLoaded", () => {
  CategoryView.setupCategories();
  CategoryView.createCategoriesList();

  ProductView.setupProducts();
  // ProductView.createProductsList();
});
