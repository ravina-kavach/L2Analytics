export const ENDPOINTS = {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    FORGOT_PASSWORD: "/api/forgot-password",
    RESET_PASSWORD: "/api/reset-password",

    CREATE_FOLDER: "/api/auth/folder/create",
    GET_FOLDERS: "/api/auth/folders",

    UPLOAD_FILE: (folderId: string) => `/api/auth/upload/${folderId}`,
    GET_FOLDER_FILES: (folderId: string) => `/api/auth/files/${folderId}`,
    GET_MY_FILES: "/api/auth/files",

    CHAT_ASK: "/api/auth/chat/ask",

    ADD_LINK: "/api/auth/link/add",
    GET_LINKS: "/api/auth/links",

    SEARCH: (query: string) => `/api/search?q=${query}`,
};