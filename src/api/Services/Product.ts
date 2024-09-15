import { NewProduct, Product } from "@/Types/Product";
import { get, patch, post, remove } from "./httpService";

export const getProduct = (productId: number): Promise<Product> => {
  return get<Product>(`/products/${productId}`);
};

export const getProducts = (): Promise<Product[]> => {
  return get<Product[]>("/products");
};

export const createProduct = (productData: NewProduct): Promise<Product> => {
  return post<Product>("/products", productData);
};

export const updateProduct = (
  productId: string,
  updatedProduct: NewProduct
): Promise<Product> => {
  return patch<Product>(`/products/${productId}`, updatedProduct);
};

export const deleteProduct = (productId: string): Promise<void> => {
  return remove<void>(`/products/${productId}`);
};
