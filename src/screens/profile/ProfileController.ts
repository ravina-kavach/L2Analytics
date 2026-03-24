import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../store/hooks";
import { clearStorage } from "../../utils/storage";

export const useProfile = () => {
    const Navigation: any = useNavigation();
    const { foldersData, loading, error, userData } = useAppSelector(
        (state) => state.common
    );


    const handleLogout = async () => {
        console.log("Callllllll")
        clearStorage()
        Navigation.navigate("Login");
    }
    const goBack = () => {
        Navigation.goBack()
    }

    return {
        userData,
        loading,
        error,
        handleLogout,
        goBack
    }
}