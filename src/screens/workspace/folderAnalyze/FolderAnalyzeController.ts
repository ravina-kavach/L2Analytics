import { useEffect, useRef, useState } from "react";
import { fileAnalyze } from "../../../store/slices/commonSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

export const useFolderAnalyze = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const isMounted = useRef(true);
    const [selectedMenu, setSelectedMenu] = useState("");

    const { loading, success, error } =
        useAppSelector((state) => state.common);

    const route = useRoute<any>();
    const folderItem = route?.params?.folderItem || null;


    // useEffect(() => {
    //     if (error) {
    //         navigation.goBack();
    //     }
    // }, [error]);

    const handleFileAnalyze = (selectedType: string) => {
        dispatch(
            fileAnalyze({
                fileId: folderItem.id,
                analyzeType: selectedType,
            })
        );
    }

    return {
        loading,
        folderItem,
        selectedMenu,
        setSelectedMenu,
        handleFileAnalyze,
    };
};