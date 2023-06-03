import { User } from "../entities/User";

export interface LoginUsecase {
  loginWithPassword(param: {
    username: string;
    password: string;
  }): Promise<
    { type: "success"; user: User } | { type: "error"; error: string }
  >;
}
