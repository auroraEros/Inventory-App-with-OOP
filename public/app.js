import CategoryView from "./js/categoryView.js";
import ProductView from "./js/productView.js";

document.addEventListener("DOMContentLoaded", () => {
  CategoryView.setupCategories();
  CategoryView.createCategoriesList();

  ProductView.setupProducts();
  // ProductView.createProductsList();
});
