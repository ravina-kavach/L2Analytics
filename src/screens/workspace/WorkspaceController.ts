import { useEffect, useState, useCallback, useMemo } from "react";
import {
    createFolder,
    fetchFolderFiles,
    fetchFolders,
    fetchMyFiles,
    fetchLinks,
    addLink,
    folderAnalyze,
} from "../../store/slices/commonSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { FolderType } from "../../types/common.types";
import { Alert } from "react-native";

const useWorkspace = () => {
    const dispatch = useAppDispatch();
    const Navigation: any = useNavigation();
    const isFocused = useIsFocused();
    const route = useRoute<any>();
    const { folder } = route.params || {};
    const { userData, foldersData, filesData, filesMyData, links } = useAppSelector(
        (state) => state.common
    );
    const [folders, setFolders] = useState<FolderType[]>([]);
    const [files, setfiles] = useState<any[]>([]);
    const [folderName, setFolderName] = useState("");
    const [description, setDescription] = useState("");
    const [isGridView, setIsGridView] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState<any>({});
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchQueryFiles, setSearchQueryFiles] = useState("");
    const [searchQueryLinks, setSearchQueryLinks] = useState("");
    const [myfiles, setMyFiles] = useState<any[]>([]);
    const [mylinks, setMyLinks] = useState<any[]>([]);
    const [addLinkModalVisible, setAddLinkModalVisible] = useState(false);
    const [addDocsModalVisible, setAddDocsModalVisible] = useState(false);
    

    const [addUrl, setAddUrl] = useState("")
    useEffect(() => {
        if (isFocused) {
            dispatch(fetchFolders());
            dispatch(fetchMyFiles());
            dispatch(fetchLinks());
        }
    }, [isFocused, dispatch]);



    useEffect(() => {
        if (filesMyData || links) {
            setMyFiles(filesMyData),
                setMyLinks(links)
        }
    }, [filesMyData])

    useEffect(() => {
        if (foldersData) {
            const data = [...myfiles, ...mylinks];
            const fileCountMap: Record<string, number> = {};

            data.forEach((item: any) => {
                if (item.folderId) {
                    fileCountMap[item.folderId] =
                        (fileCountMap[item.folderId] || 0) + 1;
                }

                if (item.folder?.id) {
                    fileCountMap[item.folder.id] =
                        (fileCountMap[item.folder.id] || 0) + 1;
                }
            });

            const foldersWithCount = foldersData.map((folder: any) => ({
                ...folder,
                filesCount: fileCountMap[folder._id] || 0
            }));

            setFolders(foldersWithCount);
        }
    }, [foldersData, myfiles, mylinks]);


    useEffect(() => {
        if (folder) {
            dispatch(fetchFolderFiles(folder?._id));
        }
    }, [folder])


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
                    setSelectedFolder(null);
                },
            },
        ]);
    };

    const handleUploadLinkFolder = () => {
        if (!selectedFolder._id) return;
        const payload = {
            folderId: selectedFolder._id,
            url: addUrl,
            userId: userData.id
        }
        dispatch(addLink(payload))
        setAddLinkModalVisible(false)
        setAddUrl("")
    };

    const goBack = () => {
        Navigation.goBack();
    };

    const navigateToFolderDetails = (item: any) => {
        Navigation.navigate("FolderDetails", { folder: item });
    };

    const filteredFolders = folders?.filter((item: any) => {
        const query = searchQuery.toLowerCase();
        return (
            item?.name?.toLowerCase().includes(query) ||
            item?.desc?.toLowerCase().includes(query)
        );
    });

    const formatFileSize = (bytes: number) => {
        if (!bytes) return "0 KB";

        const kb = bytes / 1024;
        if (kb < 1024) return `${kb.toFixed(2)} KB`;

        return `${(kb / 1024).toFixed(2)} MB`;
    };

    const formattedItems = useMemo(() => {
        if (!filesData) return [];

        // FILES
        const files =
            filesData?.files?.map((file: any) => ({
                id: file._id,
                name: file.originalName,
                size: formatFileSize(file.size),
                type: file.extension, // pdf/docx
                isLink: false,
                url: file.url,
            })) || [];

        // LINKS
        const links =
            filesData?.links?.map((link: any) => ({
                id: link._id,
                name: link.normalizedUrl,
                size: "External Link",
                type: "link",
                isLink: true,
                url: link.url,
            })) || [];

        return [...files, ...links];
    }, [filesData]);

    const formattedMyFiles = useMemo(() => {
        if (!myfiles) return [];

        // FILES
        const files =
            myfiles?.map((file: any) => ({
                id: file._id,
                name: file.originalName,
                size: formatFileSize(file.size),
                type: file.extension, // pdf/docx
                isLink: false,
                url: file.url,
            })) || [];
        return files
    }, [myfiles]);

    const formattedMyLinks = useMemo(() => {
        // LINKS
        const links =
            mylinks?.map((link: any) => ({
                id: link._id,
                name: link.url,
                size: "External Link",
                type: "link",
                isLink: true,
                url: link.url,
            })) || [];
        return links
    }, [mylinks])

    const filteredfiles = formattedMyFiles?.filter((item: any) => {
        const query = searchQueryFiles.toLowerCase();
        return (
            item?.name?.toLowerCase().includes(query)
        );
    });

    const filteredlinks = formattedMyLinks?.filter((item: any) => {
        const query = searchQueryLinks.toLowerCase();
        return (
            item?.name?.toLowerCase().includes(query)
        );
    });


    // folder analyze 
    const handleFolderAnalyze = (id: any) => {
        Navigation.navigate('FolderAnalyze', { folderId: id })
    }

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
        selectedFolder,
        setSelectedFolder,
        handleCreateFolder,
        handleDeleteFolder,
        handleOpenFolder,
        goBack,
        searchQuery,
        setSearchQuery,
        filteredFolders,
        searchQueryFiles,
        setSearchQueryFiles,
        searchQueryLinks,
        setSearchQueryLinks,
        files,
        filesData,
        setfiles,
        navigateToFolderDetails,
        folder,
        formattedItems,
        formattedMyFiles,
        formattedMyLinks,
        filteredfiles,
        filteredlinks,
        addLinkModalVisible,
        setAddLinkModalVisible,
        addUrl,
        setAddUrl,
        handleUploadLinkFolder,
        addDocsModalVisible,
        setAddDocsModalVisible,
        handleFolderAnalyze,
    };
};

export default useWorkspace;