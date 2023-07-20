import { User } from "../../user-module";

export interface SendMessageUsecase {
  sendMessage(param: {
    adoptionInterestId: string;
    sender: User;
    text: string;
  }): Promise<{ success: true } | { success: false; error: string }>;
}
