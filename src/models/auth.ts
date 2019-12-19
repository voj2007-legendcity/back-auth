export interface IAuth {
  email?: string,
  userId: string;
  token: string;
  tokenExpiration: number;
}