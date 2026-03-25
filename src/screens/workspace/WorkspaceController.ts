import { useEffect, useState, useCallback, useMemo } from "react";
import {
    createFolder,
    fetchFolderFiles,
    fetchFolders,
    fetchMyFiles,
    fetchLinks,
    addLink,
    folderAnalyzebyFile,
    uploadFileInFolder,
} from "../../store/slices/commonSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { FolderType } from "../../types/common.types";
import { Alert } from "react-native";
import { pick } from "@react-native-documents/picker";
import Config from "react-native-config";


const useWorkspace = () => {
    const dispatch = useAppDispatch();
    const Navigation: any = useNavigation();
    const isFocused = useIsFocused();
    const route = useRoute<any>();
    const { folder } = route.params || {};
    const { userData,
        // foldersData, filesData, filesMyData, links, 
        success } = useAppSelector(
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
    const [myfiles, setMyFiles] = useState<any[]>([]);
    const [mylinks, setMyLinks] = useState<any[]>([]);
    const [addLinkModalVisible, setAddLinkModalVisible] = useState(false);
    const [addDocsModalVisible, setAddDocsModalVisible] = useState(false);
    const [addUrl, setAddUrl] = useState("")
    const [relatedDoc, setRelatedDoc] = useState<string>("")
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [showDoc, setShowDoc] = useState<boolean>(false);
    const [selectedDoc, setSelectedDoc] = useState<any>(null)

    // console.log('foldersData====>', JSON.stringify(foldersData, null, 2))
    // console.log('filesData======>', JSON.stringify(filesData, null, 2))
    // console.log('filesMyData=====>', JSON.stringify(filesMyData, null, 2))
    // console.log('links====>', JSON.stringify(links, null, 2))

    const foldersData = [
        {
            "id": "9f28effd-c5be-41ec-a0df-511e406cbac7",
            "user_id": "81344977-1c3a-4438-a9d6-4d440ff26316",
            "name": "Testing",
            "description": "Security files",
            "created_at": "2026-03-25 06:57:15",
            "updated_at": "2026-03-25 06:57:15"
        },
        {
            "id": "cbe98078-7204-4b57-b023-8027877d83a2",
            "user_id": "81344977-1c3a-4438-a9d6-4d440ff26316",
            "name": "Bank Statement",
            "description": "The documents will be in any of the format and different doc type",
            "created_at": "2026-03-24 13:57:30",
            "updated_at": "2026-03-24 13:57:30"
        }
    ]
    const filesData = {
        "files": [
            {
                "id": "bb3a27f8-608f-46e3-9533-d84688cbd182",
                "folder_id": "undefined",
                "user_id": "81344977-1c3a-4438-a9d6-4d440ff26316",
                "url": "",
                "original_name": "L2%20ANALYTICS%20PROJECT%20DOCUMENTATION.pdf",
                "stored_name": "1774422583322-L220ANALYTICS20PROJECT20DOCUMENTATION.pdf",
                "size": 1612898,
                "extension": "pdf",
                "mime_type": "application/pdf",
                "local_path": "uploads/81344977-1c3a-4438-a9d6-4d440ff26316/undefined/1774422583322-L220ANALYTICS20PROJECT20DOCUMENTATION.pdf",
                "public_path": "/workspace/81344977-1c3a-4438-a9d6-4d440ff26316/undefined/1774422583322-L220ANALYTICS20PROJECT20DOCUMENTATION.pdf",
                "related_to": "https://chatgpt.com/c/69c2894f-ecf0-8321-bf35-683b572659fc",
                "upload_date": "2026-03-25 07:09:43"
            },
            {
                "id": "ccb64515-7e22-4867-92a9-b47165ddae42",
                "folder_id": "undefined",
                "user_id": "81344977-1c3a-4438-a9d6-4d440ff26316",
                "url": "",
                "original_name": "ED103735.pdf",
                "stored_name": "1774422493240-ED103735.pdf",
                "size": 1455160,
                "extension": "pdf",
                "mime_type": "application/pdf",
                "local_path": "uploads/81344977-1c3a-4438-a9d6-4d440ff26316/undefined/1774422493240-ED103735.pdf",
                "public_path": "/workspace/81344977-1c3a-4438-a9d6-4d440ff26316/undefined/1774422493240-ED103735.pdf",
                "related_to": "HR",
                "upload_date": "2026-03-25 07:08:13"
            },
            {
                "id": "ca47b437-42c9-40c9-a5bc-4141be46b8e4",
                "folder_id": "undefined",
                "user_id": "81344977-1c3a-4438-a9d6-4d440ff26316",
                "url": "",
                "original_name": "L2%20ANALYTICS%20PROJECT%20DOCUMENTATION.pdf",
                "stored_name": "1774422042953-L220ANALYTICS20PROJECT20DOCUMENTATION.pdf",
                "size": 1612898,
                "extension": "pdf",
                "mime_type": "application/pdf",
                "local_path": "uploads/81344977-1c3a-4438-a9d6-4d440ff26316/undefined/1774422042953-L220ANALYTICS20PROJECT20DOCUMENTATION.pdf",
                "public_path": "/workspace/81344977-1c3a-4438-a9d6-4d440ff26316/undefined/1774422042953-L220ANALYTICS20PROJECT20DOCUMENTATION.pdf",
                "related_to": "Docs",
                "upload_date": "2026-03-25 07:00:43"
            },
            {
                "id": "40465114-3b88-4bac-8f4b-3257d5d3976b",
                "folder_id": "undefined",
                "user_id": "81344977-1c3a-4438-a9d6-4d440ff26316",
                "url": "",
                "original_name": "L2%20ANALYTICS%20PROJECT%20DOCUMENTATION.pdf",
                "stored_name": "1774421861444-L220ANALYTICS20PROJECT20DOCUMENTATION.pdf",
                "size": 1612898,
                "extension": "pdf",
                "mime_type": "application/pdf",
                "local_path": "uploads/81344977-1c3a-4438-a9d6-4d440ff26316/undefined/1774421861444-L220ANALYTICS20PROJECT20DOCUMENTATION.pdf",
                "public_path": "/workspace/81344977-1c3a-4438-a9d6-4d440ff26316/undefined/1774421861444-L220ANALYTICS20PROJECT20DOCUMENTATION.pdf",
                "related_to": "Docs",
                "upload_date": "2026-03-25 06:57:41"
            }
        ],
        "links": []
    }

    const filesMyData = [
        {
            "id": "bb3a27f8-608f-46e3-9533-d84688cbd182",
            "folder_id": "undefined",
            "user_id": "81344977-1c3a-4438-a9d6-4d440ff26316",
            "url": "",
            "original_name": "L2 ANALYTICS.pdf",
            "stored_name": "1774422583322-L220ANALYTICS20PROJECT20DOCUMENTATION.pdf",
            "size": 1612898,
            "extension": "pdf",
            "mime_type": "application/pdf",
            "local_path": "uploads/81344977-1c3a-4438-a9d6-4d440ff26316/undefined/1774422583322-L220ANALYTICS20PROJECT20DOCUMENTATION.pdf",
            "public_path": "/workspace/81344977-1c3a-4438-a9d6-4d440ff26316/undefined/1774422583322-L220ANALYTICS20PROJECT20DOCUMENTATION.pdf",
            "related_to": "https://chatgpt.com/c/69c2894f-ecf0-8321-bf35-683b572659fc",
            "upload_date": "2026-03-25 07:09:43"
        },
        {
            "id": "ccb64515-7e22-4867-92a9-b47165ddae42",
            "folder_id": "undefined",
            "user_id": "81344977-1c3a-4438-a9d6-4d440ff26316",
            "url": "",
            "original_name": "ED103735.pdf",
            "stored_name": "1774422493240-ED103735.pdf",
            "size": 1455160,
            "extension": "pdf",
            "mime_type": "application/pdf",
            "local_path": "uploads/81344977-1c3a-4438-a9d6-4d440ff26316/undefined/1774422493240-ED103735.pdf",
            "public_path": "/workspace/81344977-1c3a-4438-a9d6-4d440ff26316/undefined/1774422493240-ED103735.pdf",
            "related_to": "HR",
            "upload_date": "2026-03-25 07:08:13"
        },
        {
            "id": "ca47b437-42c9-40c9-a5bc-4141be46b8e4",
            "folder_id": "undefined",
            "user_id": "81344977-1c3a-4438-a9d6-4d440ff26316",
            "url": "",
            "original_name": "L2 DOC.pdf",
            "stored_name": "1774422042953-L220ANALYTICS20PROJECT20DOCUMENTATION.pdf",
            "size": 1612898,
            "extension": "pdf",
            "mime_type": "application/pdf",
            "local_path": "uploads/81344977-1c3a-4438-a9d6-4d440ff26316/undefined/1774422042953-L220ANALYTICS20PROJECT20DOCUMENTATION.pdf",
            "public_path": "/workspace/81344977-1c3a-4438-a9d6-4d440ff26316/undefined/1774422042953-L220ANALYTICS20PROJECT20DOCUMENTATION.pdf",
            "related_to": "Docs",
            "upload_date": "2026-03-25 07:00:43"
        },
        {
            "id": "40465114-3b88-4bac-8f4b-3257d5d3976b",
            "folder_id": "undefined",
            "user_id": "81344977-1c3a-4438-a9d6-4d440ff26316",
            "url": "",
            "original_name": "L2 DOC1.pdf",
            "stored_name": "1774421861444-L220ANALYTICS20PROJECT20DOCUMENTATION.pdf",
            "size": 1612898,
            "extension": "pdf",
            "mime_type": "application/pdf",
            "local_path": "uploads/81344977-1c3a-4438-a9d6-4d440ff26316/undefined/1774421861444-L220ANALYTICS20PROJECT20DOCUMENTATION.pdf",
            "public_path": "/workspace/81344977-1c3a-4438-a9d6-4d440ff26316/undefined/1774421861444-L220ANALYTICS20PROJECT20DOCUMENTATION.pdf",
            "related_to": "Docs",
            "upload_date": "2026-03-25 06:57:41"
        }
    ]

    const links: any[] = []


    useEffect(() => {
        if (isFocused) {
            // dispatch(fetchFolders());
            // dispatch(fetchMyFiles());
            // dispatch(fetchLinks());
        }
        setOpenMenuId(null);
        setSearchQuery("")
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


    // useEffect(() => {
    //     if (folder) {
    //         dispatch(fetchFolderFiles(folder?._id));
    //     }
    // }, [folder])


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

            // await dispatch(fetchFolders());

            setFolderName("");
            setDescription("");
        } catch (error) {
            Alert.alert("Error", "Failed to create folder");
        }
    }, [folderName, description, userData, dispatch]);


    const handleOpenFolder = (folderId: string) => {
        // dispatch(fetchFolderFiles(folderId));
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
                folderId: file.folderId,
                name: file.original_name,
                size: formatFileSize(file.size),
                type: file.extension, // pdf/docx
                isLink: false,
                url: file.url,
            })) || [];

        // LINKS
        const links =
            filesData?.links?.map((link: any) => ({
                id: link._id,
                folderId: link.folderId,
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
                folderId: file.folderId,
                name: file.original_name,
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
                folderId: link.folder.id,
                size: "External Link",
                type: "link",
                isLink: true,
                url: link.url,
            })) || [];
        return links
    }, [mylinks])

    const filteredfiles = formattedMyFiles?.filter((item: any) => {
        const query = searchQuery.toLowerCase();
        return (
            item?.name?.toLowerCase().includes(query)
        );
    });

    const filteredlinks = formattedMyLinks?.filter((item: any) => {
        const query = searchQuery.toLowerCase();
        return (
            item?.name?.toLowerCase().includes(query)
        );
    });


    // folder analyze 
    const handleFolderAnalyze = (item: any) => {
        Navigation.navigate('FolderAnalyze', { folderItem: item })
    }

    const pickDocument = async () => {
        try {
            const result = await pick({
                type: [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "image/*",
                ],
                allowMultiSelection: false,
            });

            const file = result[0];

            const formattedFile = {
                name: file.name,
                type: file.type,
                uri: file.uri,
                size: file.size,
            };

            setSelectedFile(formattedFile);
            setAddDocsModalVisible(true);

        } catch (error: any) {
            if (error?.code === "DOCUMENT_PICKER_CANCELED") {
                console.log("User cancelled document picker");
            } else {
                console.log("Document Picker Error:", error);
                Alert.alert("Error", "Failed to pick document");
            }
        }
    };

    const uploadDocument = async () => {
        if (!selectedFile) {
            Alert.alert("Error", "Please select a document first");
            return;
        }

        try {
            const formData = new FormData();

            formData.append("files", {
                uri: selectedFile.uri,
                type: selectedFile.type || "application/octet-stream",
                name: selectedFile.name || "file",
            } as any);

            formData.append("documentType", selectedFile.type || "");
            formData.append("relatedTo", relatedDoc);

            // wait for upload
            console.log("PAYLOAD=====>", JSON.stringify({
                folderId: folder?._id,
                payload: formData,
            }))

            await dispatch(
                uploadFileInFolder({
                    folderId: folder?._id,
                    payload: formData,
                })
            ).unwrap();

            // refresh APIs after upload
            // dispatch(fetchMyFiles());
            // dispatch(fetchFolderFiles(folder?._id));

            setAddDocsModalVisible(false);
            setSelectedFile(null);

        } catch (error) {
            console.log("Upload Error:", error);
            Alert.alert("Error", "Upload failed");
        }
    };


    const navigateToChat = (item: any) => {
        if (item.isLink) {
            Navigation.navigate("ChatAsk", { link: item.name })
        } else {
            Navigation.navigate("ChatAsk", { fileName: item.name })
        }
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
        pickDocument,
        selectedFile,
        uploadDocument,
        relatedDoc,
        setRelatedDoc,
        navigateToChat,
        showDoc,
        setShowDoc,
        selectedDoc,
        setSelectedDoc
    };
};

export default useWorkspace;