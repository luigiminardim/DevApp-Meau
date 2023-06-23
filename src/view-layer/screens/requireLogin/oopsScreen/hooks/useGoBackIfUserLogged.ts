import { useEffect } from "react";
import { useUserContext } from "../../../../contexts/UserContext";
import { useNavigation } from "../../../../shared/StackNavigationParamList";

export function useGoBackIfUserLogged() {
  const navigation = useNavigation();
  const { user } = useUserContext();
  useEffect(() => {
    if (user) {
      navigation.goBack();
    }
  }, [user, navigation]);
}
