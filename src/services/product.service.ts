import { ProductDB } from "../models/product.model";
import { AppError } from "../utils/app.error";

export const getAllProductsService = async () => {
  const products = await ProductDB.find();

  if (!products || products.length === 0) {
    // catch the error in the controller
    throw new AppError("No products found", 404);
  }

  return products;
};

export const getProductByIdService = async (id: string) => {
  const product = await ProductDB.findById(id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
};

export const createProductService = async (
  name: string,
  price: number,
  description: string,
) => {
  const existingProduct = await ProductDB.findOne({ name });

  if (existingProduct) {
    throw new AppError("Product with the same name already exists", 409);
  }

  const newProduct = { name, price, description };
  const createdProduct = await ProductDB.create(newProduct);
  return createdProduct;
};

export const deleteProductByIdService = async (id: string) => {
  const productToDelete = await ProductDB.findById(id);

  if (!productToDelete) {
    throw new AppError(
      "The product your are trying to delete does not exist...Try again!",
      404,
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
  updateData: { name: string; price: number; description: string },
) => {
  const productToUpdate = await ProductDB.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!productToUpdate) {
    throw new AppError(
      "The product you are trying to update does not exist...Try again!",
      404,
    );
  }

  Object.assign(productToUpdate, updateData);
  const updatedProduct = await productToUpdate.save();

  return updatedProduct;
};
