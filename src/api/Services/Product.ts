import { NewProduct, Product } from "@/Types/Product";
import { get, post } from "./httpService";

export const getProduct = (productId: number): Promise<Product> => {
  return get<Product>(`/product/${productId}`);
};

export const getProducts = (): Promise<Product[]> => {
  return get<Product[]>("/product");
};

export const createProduct = (productData: NewProduct): Promise<Product> => {
  return post<Product>("/product", productData);
};

// const getProducts = async () => {
//   try {
//     const data = await getData("/product");
//     return data;
//   } catch (error) {
//     console.error("Error fetching products: ", error);
//     return [];
//   }
// };

// const createProduct = async (productData: Product) => {
//   const response = await POST<User>("/users", productData);
//   // Handle the created user response
// };

// const updateUser = async (userId: string, updatedData: Partial<User>) => {
//   const response = await putData<User>(`/users/${userId}`, updatedData);
//   // Handle the updated user response
// };

// const deleteUser = async (userId: string) => {
//   await deleteData(`/users/${userId}`);
//   // Handle the deletion (success/error)
// };
