import {
  Auth as FirebaseAuth,
  createUserWithEmailAndPassword,
} from "@firebase/auth";
import {
  addDoc,
  Firestore as FirebaseDb,
  collection,
} from "firebase/firestore";
import { FirebaseStorage, ref, uploadBytes } from "firebase/storage";
import { SignUpUsecase } from "../../../../core-layer/user-module";
import { UserData } from "../dto/UserData";

type CreateUserDocumentData = Omit<UserData, "image"> & {
  image: string;
};

export class SignUpGate implements SignUpUsecase {
  constructor(
    private firebaseAuth: FirebaseAuth,
    private firebaseDb: FirebaseDb,
    private firebaseStorage: FirebaseStorage
  ) {}
  signUpWithPassword: SignUpUsecase["signUpWithPassword"] = async (param) => {
    try {
      const createAuthResult = await createUserWithEmailAndPassword(
        this.firebaseAuth,
        param.email,
        param.password
      );
      const imageRef = ref(
        this.firebaseStorage,
        `users/image/${createAuthResult.user.uid}`
      );
      const imageBlob = await fetch(param.imageUri).then((res) => res.blob());
      const uploadImageResult = await uploadBytes(imageRef, imageBlob);
      const userData: CreateUserDocumentData = {
        id: createAuthResult.user.uid,
        email: param.email,
        name: param.name,
        age: param.age,
        state: param.state,
        city: param.city,
        address: param.address,
        phone: param.phone,
        image: uploadImageResult.ref.fullPath,
      };
      const dbRef = collection(this.firebaseDb, "users");
      const { id } = await addDoc(dbRef, userData);
      return { type: "success", userId: id };
    } catch (err) {
      return { type: "error", error: String(err) };
    }
  };
}
