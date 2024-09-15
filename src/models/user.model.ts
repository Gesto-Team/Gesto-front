export interface UserData {
  username: string;
  password: string;
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export interface UserLocalStorage {
  access_token: string;
  userId: string;
  role: Role;
}
