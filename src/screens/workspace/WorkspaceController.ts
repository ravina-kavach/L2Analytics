import { useEffect } from "react";
import { createFolder, fetchFolderFiles, fetchFolders } from "../../store/slices/commonSlice";
import { useAppDispatch } from "../../store/hooks";
const useWorkspace = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchFolders());
    }, [dispatch]);

    const handleCreateFolder = () => {
        dispatch(
            createFolder({
                name: "Records",
                desc: "Sensitive Data",
                createdBy: "Dhaval",
            })
        );
    };

    const handleOpenFolder = (folderId: string) => {
        dispatch(fetchFolderFiles(folderId));
    };
    return {
        handleCreateFolder,
        handleOpenFolder
    }
}

export default useWorkspace;