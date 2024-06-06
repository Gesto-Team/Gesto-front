export interface NewProduct {
  name: string;
  price: number;
  unit: string;
  expirationDate: Date;
  quantity: number;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  unit: string;
  expirationDate: Date;
  quantity: number;
}
