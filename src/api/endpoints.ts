export const ENDPOINTS = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",

    CREATE_FOLDER: "/auth/folder/create",
    GET_FOLDERS: "/auth/folders",

    UPLOAD_FILE: (folderId: string) => `/auth/upload/${folderId}`,
    GET_FOLDER_FILES: (folderId: string) => `/auth/files/${folderId}`,
    GET_MY_FILES: "/auth/files",

    CHAT_ASK: "/auth/chat/ask",

    ADD_LINK: "/auth/link/add",
    GET_LINKS: "/auth/links",

    SEARCH: (query: string) => `/search?q=${query}`,
};