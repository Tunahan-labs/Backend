import { ProductDB } from "../models/product.model";

export const getAllProductsService = async () => {
  const products = await ProductDB.find();

  if (!products || products.length === 0) {
    // catch the error in the controller
    throw new Error("No products found");
  }

  return products;
};

export const getProductByIdService = async (id: string) => {
  const product = await ProductDB.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const createProductService = async (
  name: string,
  price: number,
  description: string
) => {
  const existingProduct = await ProductDB.findOne({ name });

  if (existingProduct) {
    throw new Error("Product with the same name already exists");
  }

  const newProduct = { name, price, description };
  const createdProduct = await ProductDB.create(newProduct);
  return createdProduct;
};

export const deleteProductByIdService = async (id: string) => {
  const productToDelete = await ProductDB.findById(id);

  if (!productToDelete) {
    throw new Error(
      "The product your are trying to delete does not exist...Try again!"
    );
  }

  const deleted = await ProductDB.findByIdAndDelete(productToDelete._id);

  return {
    deleted,
    message: `${deleted?.name} has been deleted from inventory`,
  };
};

export const updateProductByIdService = async (
  id: string,
  updateData: { name: string; price: number; description: string }
) => {
  const productToUpdate = await ProductDB.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!productToUpdate) {
    throw new Error(
      "The product you are trying to update does not exist...Try again!"
    );
  }

  Object.assign(productToUpdate, updateData);
  const updatedProduct = await productToUpdate.save();

  return updatedProduct;
};
