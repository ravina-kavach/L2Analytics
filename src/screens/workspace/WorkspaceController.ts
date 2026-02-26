import { useEffect, useState, useCallback } from "react";
import {
    createFolder,
    fetchFolderFiles,
    fetchFolders,
} from "../../store/slices/commonSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { FolderType } from "../../types/common.types";
import { Alert } from "react-native";

const useWorkspace = () => {
    const dispatch = useAppDispatch();
    const Navigation: any = useNavigation();
    const isFocused = useIsFocused();

    const { userData, foldersData } = useAppSelector(
        (state) => state.common
    );

    const [folders, setFolders] = useState<FolderType[]>([]);
    const [folderName, setFolderName] = useState("");
    const [description, setDescription] = useState("");
    const [isGridView, setIsGridView] = useState(false);
    const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        if (isFocused) {
            dispatch(fetchFolders());
        }
    }, [isFocused, dispatch]);


    useEffect(() => {
        if (foldersData) {
            setFolders(foldersData);
        }
    }, [foldersData]);


    const handleCreateFolder = useCallback(async () => {
        if (!folderName.trim()) {
            Alert.alert("Error", "Folder name is required");
            return;
        }

        try {
            await dispatch(
                createFolder({
                    name: folderName,
                    desc: description,
                    createdBy: userData?.name,
                })
            ).unwrap();

            await dispatch(fetchFolders());

            setFolderName("");
            setDescription("");
        } catch (error) {
            Alert.alert("Error", "Failed to create folder");
        }
    }, [folderName, description, userData, dispatch]);


    const handleOpenFolder = (folderId: string) => {
        dispatch(fetchFolderFiles(folderId));
    };

    const handleDeleteFolder = (id: string) => {
        if (!id) return;

        Alert.alert("Delete Folder", "Are you sure you want to delete?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    setFolders((prev) =>
                        prev.filter((folder) => folder._id !== id)
                    );
                    setSelectedFolderId(null);
                },
            },
        ]);
    };

    const goBack = () => {
        Navigation.goBack();
    };

    const filteredFolders = folders?.filter((item: any) => {
        const query = searchQuery.toLowerCase();
        return (
            item?.name?.toLowerCase().includes(query) ||
            item?.desc?.toLowerCase().includes(query)
        );
    });

    return {
        userData,
        folderName,
        setFolderName,
        description,
        setDescription,
        openMenuId,
        setOpenMenuId,
        folders,
        isGridView,
        setIsGridView,
        selectedFolderId,
        setSelectedFolderId,
        handleCreateFolder,
        handleDeleteFolder,
        handleOpenFolder,
        goBack,
        searchQuery,
        setSearchQuery,
        filteredFolders
    };
};

export default useWorkspace;