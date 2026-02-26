import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigation } from "@react-navigation/native";
import { setStorage } from "../../utils/storage";
import STORAGE_KEYS from "../../utils/storageKeys";

const useDashboard = () => {
    const dispatch = useAppDispatch();
    const Navigation: any = useNavigation();
    const { folders, loading, error } = useAppSelector(
        (state) => state.common
    );

    const usedBytes = 622770257;
    const totalBytes = 1073741824;

    const { usedGB, totalGB, percentage } = useMemo(() => {
        const bytesToGB = (bytes: number) => bytes / (1024 * 1024 * 1024);

        const used = bytesToGB(usedBytes);
        const total = bytesToGB(totalBytes);

        return {
            usedGB: used.toFixed(2),
            totalGB: total.toFixed(2),
            percentage: ((used / total) * 100).toFixed(0),
        };
    }, [usedBytes, totalBytes]);


    const handleLogout = async () => {
        console.log("Callllllll")
        await setStorage(STORAGE_KEYS.IS_LOGIN, false);
        Navigation.navigate("Login");
    }

    return {
        folders,
        loading,
        error,
        usedGB,
        totalGB,
        percentage,
        handleLogout
    };
};

export default useDashboard;