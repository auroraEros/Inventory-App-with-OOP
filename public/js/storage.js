export default class Storage {
  // add categories

  // get categories
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];

    //  sorted categories
    const sortedCategories = savedCategories
      .slice()
      .sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1));

    return sortedCategories;
  }

  // save or edit categories

  static saveCategory(category) {
    const savedCategories = Storage.getAllCategories();
    const existingCategory = savedCategories.find((c) => c.id === category.id);

    // save new category
    if (!existingCategory) {
      // category.id = Date.now();
      // category.createdAt = new Date().toISOString();
      savedCategories.push(category);
    }

    //   edit existing category
    if (existingCategory) {
      existingCategory.title = category.title;
      existingCategory.description = category.description;
    }
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }

  //   get products

  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const sortedProducts = savedProducts.sort((a, b) => {
      if (sort === "newest")
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      if (sort === "oldest")
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
    });
    return sortedProducts;
  }

  static saveProduct(product) {
    const savedProducts = Storage.getAllProducts();

    const existingProduct = savedProducts.find((p) => p.id === product.id);

    if (!existingProduct) savedProducts.push(product);

    if (existingProduct) {
      existingProduct.title = product.title;
      existingProduct.category = product.category;
      existingProduct.quantity = product.quantity;
    }

    localStorage.setItem("products", JSON.stringify(savedProducts));
  }

  static removeProduct(id) {
    const savedProducts = Storage.getAllProducts();
    const remainingProducts = savedProducts.filter((p) => p.id !== id);
    console.log(remainingProducts);
    localStorage.setItem("products", JSON.stringify(remainingProducts));
  }
}
