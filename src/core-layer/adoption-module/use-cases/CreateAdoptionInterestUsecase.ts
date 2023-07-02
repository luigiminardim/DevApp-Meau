import { Animal } from "../../animal-module";
import { User } from "../../user-module";

export interface CreateAdoptionInterestUsecase {
  createAdoptionInterest(param: {
    animal: Animal;
    interested: User;
  }): Promise<{ type: "success" } | { type: "error"; message: string }>;
}

export interface CreateAdoptionInterestGate {
  createAdoptionInterest(param: {
    animal: Animal;
    interested: User;
  }): Promise<{ type: "success" } | { type: "error"; message: string }>;
}

export class CreateAdoptionInterestUsecaseImpl {
  constructor(private gate: CreateAdoptionInterestGate) {}

  createAdoptionInterest: CreateAdoptionInterestUsecase["createAdoptionInterest"] =
    async (param) => {
      const result = await this.gate.createAdoptionInterest(param);
      if (result.type === "error") {
        return {
          type: "error",
          message: result.message,
        };
      }
      return { type: "success" };
    };
}
