import { SendMessageUsecase } from "../../../../core-layer/adoption-module";
import { User } from "../../../../core-layer/user-module";
import { AdoptionInterestData } from "../dto/AdoptionInterestData";
import { AdoptionInterestDataRepository } from "../repositories/AdoptionInterestDataRepository";

export class SendNewMessageGate implements SendMessageUsecase {
  constructor(
    private adoptionInterestDataRepository: AdoptionInterestDataRepository
  ) {}

  async sendMessage(param: {
    adoptionInterestId: string;
    sender: User;
    text: string;
  }): Promise<{ success: true } | { success: false; error: string }> {
    const getOldDataResult = await this.adoptionInterestDataRepository.getById(
      param.adoptionInterestId
    );
    if (!getOldDataResult.success) {
      return { success: false, error: getOldDataResult.error };
    }
    const [, oldData] = getOldDataResult.data;
    const newData: AdoptionInterestData = {
      ...oldData,
      messages: [
        ...oldData.messages,
        { sender: param.sender.id, text: param.text },
      ],
    };
    const updateResult = await this.adoptionInterestDataRepository.update(
      param.adoptionInterestId,
      newData
    );
    if (!updateResult.success) {
      return { success: false, error: updateResult.error };
    }
    return { success: true };
  }
}
