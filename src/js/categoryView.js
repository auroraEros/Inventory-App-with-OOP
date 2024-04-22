import Storage from "./storage.js";

const categoryTitle = document.getElementById("category-title");
const categoryDescription = document.getElementById("category-description");
const addNewCategoryBtn = document.getElementById("add-new-category");
const productCategory = document.getElementById("product-category");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    this.categories = [];
  }
  addNewCategory(e) {
    e.preventDefault();
    const category = {
      title: categoryTitle.value,
      description: categoryDescription.value,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    if (!category.title || !category.description)
      return swal("", "Please fill input fields!", "warning", {
        button: true,
      });

    Storage.saveCategory(category);
    this.categories = Storage.getAllCategories();
    this.createCategoriesList();
    categoryTitle.value = "";
    categoryDescription.value = "";
  }

  setupCategories() {
    this.categories = Storage.getAllCategories();
  }

  createCategoriesList() {
    let html = `<option value="">Select a Category</option>`;

    this.categories.forEach((element) => {
      html += `<option value=${element.id}>${element.title}</option>`;
    });
    productCategory.innerHTML = html;
  }
  //   updating DOM
}
export default new CategoryView();
