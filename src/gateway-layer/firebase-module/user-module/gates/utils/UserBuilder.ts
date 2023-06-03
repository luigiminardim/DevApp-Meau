import { FirebaseStorage, getDownloadURL, ref } from "firebase/storage";
import { User } from "../../../../../core-layer/user-module/entities/User";
import { UserData } from "../../dto/UserData";

export class UserBuilder {
  constructor(private firebaseStorage: FirebaseStorage) {}

  async buildUserFromData(data: UserData): Promise<User> {
    const imageRef = ref(this.firebaseStorage, `users/image/${data.id}`);
    const imageUri = await getDownloadURL(imageRef);
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      age: data.age,
      state: data.state,
      city: data.city,
      address: data.address,
      phone: data.phone,
      imageUri,
    };
  }
}
