import { useEffect, useRef, useState } from "react";
import { folderAnalyze, folderAnalyzeWithTab } from "../../../store/slices/commonSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

export const useFolderAnalyze = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const isMounted = useRef(true);
    const [selectedTab, setSelectedTab] = useState("")
    const { folderAnalyzeData, loading, userData, success, error } = useAppSelector(
        (state) => state.common
    );

    const route = useRoute<any>();
    const { folderId } = route.params || {};

    // useEffect(() => {
    //     console.log("userData====>", userData)
    //     isMounted.current = true;
    //     if (folderId) {
    //         dispatch(folderAnalyze(folderId));
    //         dispatch(folderAnalyzeWithTab({ folderId: folderId, tabName: selectedTab, userId: userData.id }))
    //     }

    //     return () => {
    //         isMounted.current = false;
    //     };
    // }, [folderId]);

    // useEffect(() => {
    //     if (error && isMounted.current) {
    //         navigation.goBack();
    //     }
    // }, [error]);


    // useEffect(() => {
    //     // console.log("selectedTab====>", selectedTab)
    // }, [selectedTab])

    return {
        loading,
        folderAnalyzeData,
        selectedTab,
        setSelectedTab
    };
};