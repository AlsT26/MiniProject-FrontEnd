export interface IUser {
  id: number;
  username: string;
  email: string;
  avatar: string;
  role: "Promotor" | "User";
}
