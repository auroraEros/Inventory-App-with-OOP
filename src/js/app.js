import CategoryView from "./categoryView.js";
import ProductView from "./productView.js";

document.addEventListener("DOMContentLoaded", () => {
  CategoryView.setupCategories();
  CategoryView.createCategoriesList();

  ProductView.setupProducts();
  // ProductView.createProductsList();
});
