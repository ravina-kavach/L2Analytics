import { useEffect } from "react"
import { folderAnalyze } from "../../../store/slices/commonSlice"
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

export const useFolderAnalyze = () => {
    const dispatch = useAppDispatch();
    const Navigation: any = useNavigation();
    const { folderAnalyzeData, loading, success, error } = useAppSelector(
        (state) => state.common
    );

    const route = useRoute<any>();
    const { folderId } = route.params || {};

    // useEffect(() => {
    //     if (folderId) {
    //         dispatch(folderAnalyze(folderId))
    //     }
    // }, [folderId]);

    // useEffect(() => {
    //     if (error) {
    //         Navigation.goBack()
    //     }
    // }, [error])

    return {
        loading,
        folderAnalyzeData
    }
}
