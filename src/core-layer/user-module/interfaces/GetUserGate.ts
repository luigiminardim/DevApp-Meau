import { User } from "../entities/User";

export interface GetUserGate {
  getUser(param: {
    id: string;
  }): Promise<
    { type: "success"; user: User } | { type: "error"; error: string }
  >;
}
