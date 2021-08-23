export interface IUser {
  id: number;
  name: string;
  type?: "tenant" | "cashier";
}
