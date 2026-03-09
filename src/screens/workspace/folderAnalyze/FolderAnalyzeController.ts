import { useEffect, useRef, useState } from "react";
import { folderAnalyzebyFile, folderAnalyzeWithTab } from "../../../store/slices/commonSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

export const useFolderAnalyze = () => {
    const dispatch = useAppDispatch();
    // const navigation = useNavigation();
    const isMounted = useRef(true);
    const [selectedTab, setSelectedTab] = useState("maidmap");

    const { folderAnalyzeFileData, loading, userData, success, error } =
        useAppSelector((state) => state.common);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, []);

    // const route = useRoute<any>();
    // const folderItem = route?.params?.folderItem || null;

    // useEffect(() => {
    //     isMounted.current = true;


    //     if (folderItem && userData?.id) {
    //         dispatch(folderAnalyzebyFile(folderItem));
    //         // dispatch(
    //         //     folderAnalyzeWithTab({
    //         //         folderId: folderId,
    //         //         tabName: selectedTab,
    //         //         userId: userData.id,
    //         //     })
    //         // );
    //     }

    //     return () => {
    //         isMounted.current = false;
    //     };
    // }, [folderItem]);

    // useEffect(() => {
    //     if (error && isMounted.current) {
    //         navigation.goBack();
    //     }
    // }, [error]);

    return {
        loading,
        folderAnalyzeFileData,
        selectedTab,
        setSelectedTab,
    };
};