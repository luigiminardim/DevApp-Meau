import { useEffect } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigation } from "../StackNavigationParamList";

export function useRequireLoggedUser() {
  const navigation = useNavigation();
  const { user } = useUserContext();
  useEffect(() => {
    if (!user) {
      navigation.navigate("Oops");
    }
  }, [navigation, user]);
}
