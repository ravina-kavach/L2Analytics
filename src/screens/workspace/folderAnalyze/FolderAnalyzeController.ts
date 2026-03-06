import { useEffect, useRef } from "react";
import { folderAnalyze } from "../../../store/slices/commonSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

export const useFolderAnalyze = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const isMounted = useRef(true);

    const { folderAnalyzeData, loading, success, error } = useAppSelector(
        (state) => state.common
    );

    const route = useRoute<any>();
    const { folderId } = route.params || {};

    useEffect(() => {
        isMounted.current = true;

        if (folderId) {
            dispatch(folderAnalyze(folderId));
        }

        return () => {
            isMounted.current = false;
        };
    }, [folderId]);

    useEffect(() => {
        if (error && isMounted.current) {
            navigation.goBack();
        }
    }, [error]);

    return {
        loading,
        folderAnalyzeData,
    };
};