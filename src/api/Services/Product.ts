import { NewProduct, Product } from "@/Types/Product";
import { get, patch, post, remove } from "./httpService";

export const getProduct = (productId: number): Promise<Product> => {
  return get<Product>(`/product/${productId}`);
};

export const getProducts = (): Promise<Product[]> => {
  return get<Product[]>("/product");
};

export const createProduct = (productData: NewProduct): Promise<Product> => {
  return post<Product>("/product", productData);
};

export const updateProduct = (
  productId: string,
  updatedProduct: NewProduct
): Promise<Product> => {
  return patch<Product>(`/product/${productId}`, updatedProduct);
};

export const deleteProduct = (productId: string): Promise<void> => {
  return remove<void>(`/product/${productId}`);
};
