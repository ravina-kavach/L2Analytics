import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    fetchFolders,
    loginUser,
    createFolder,
    fetchFolderFiles,
    searchData,
} from "../../store/slices/commonSlice";

const FolderScreen = () => {
    const dispatch = useAppDispatch();
    const { folders, loading, error } = useAppSelector(
        (state) => state.common
    );


    const handleLogin = () => {
        dispatch(loginUser({ email: "test@gmail.com", password: "123456" }));
    };

    return {
        handleLogin,
    }
}
export default FolderScreen;