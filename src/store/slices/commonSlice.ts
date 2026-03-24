import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setStorage, removeStorage } from "../../utils/storage";
import STORAGE_KEYS from "../../utils/storageKeys";

interface ReportState {
  searchAllData: any;
  foldersData: any[];
  filesData: { files: any[], links: any[] };
  filesMyData: any[];
  folderAnalyzeFileData: any;
  reportAnalyzeData: any,
  chatAskData: any[];
  chatMessages: any[],
  fileAnalyzeWithTabData: any;
  links: any[];
  token: string | null;
  userData: any;
  isLogin: boolean;
  loading: boolean;
  chatLoading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: ReportState = {
  searchAllData: [],
  foldersData: [],
  filesData: { files: [], links: [] },
  filesMyData: [],
  folderAnalyzeFileData: [],
  reportAnalyzeData: [],
  chatAskData: [],
  chatMessages: [],
  fileAnalyzeWithTabData: [],
  links: [],
  token: null,
  isLogin: false,
  userData: [],
  loading: false,
  chatLoading: false,
  error: null,
  success: null,
};

//
// ============================
// Error Handler
// ============================

const errorMassage = (error: any) => {
  if (error === "Network Error") {
    return "Server not responding. Please try again later."
  }
  return error
}
const handleThunkError = (error: any, rejectWithValue: any) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message
  return rejectWithValue(errorMassage(message));
};

//
// ============================
// 🔐 AUTH APIs
// ============================



export const loadUserToken = createAsyncThunk(
  "common/loadToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);

      if (token) {
        return token;
      }

      return null;
    } catch (error: any) {
      return rejectWithValue(errorMassage(error?.response?.data?.message || error.message));
    }
  }
);

export const loginUser = createAsyncThunk(
  "common/login",
  async (
    payload: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(ENDPOINTS.LOGIN, payload);

      const { token } = response.data;

      if (!token) {
        return rejectWithValue("Token not received from server");
      }
      await removeStorage(STORAGE_KEYS.TOKEN);
      await removeStorage(STORAGE_KEYS.IS_LOGIN);
      await setStorage(STORAGE_KEYS.TOKEN, token);
      await setStorage(STORAGE_KEYS.IS_LOGIN, true);
      return response.data;
    } catch (error: any) {
      console.log("error===>", error?.response)
      return rejectWithValue(errorMassage(error?.response?.data?.error || error.message));
    }
  }
);

export const registerUser = createAsyncThunk(
  "common/register",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await api.post(ENDPOINTS.REGISTER, payload);
      return response.data;
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "common/forgotPassword",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await api.post(ENDPOINTS.FORGOT_PASSWORD, payload);
      return response.data;
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "common/resetPassword",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await api.post(ENDPOINTS.RESET_PASSWORD, payload);
      return response.data;
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "common/verifyOtp",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await api.post(ENDPOINTS.VERIFY_OTP, payload);
      return response.data;
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const resendOtp = createAsyncThunk(
  "common/resendOtp",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await api.post(ENDPOINTS.RESEND_OTP, payload);
      return response.data;
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
//
// ============================
// 📁 Folder APIs
// ============================

export const createFolder = createAsyncThunk(
  "common/createFolder",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await api.post(ENDPOINTS.CREATE_FOLDER, payload);
      return response.data;
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const fetchFolders = createAsyncThunk(
  "common/fetchFolders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(ENDPOINTS.GET_FOLDERS);
      return response.data;
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

//
// ============================
// 📄 File APIs
// ============================

export const fetchFolderFiles = createAsyncThunk(
  "common/fetchFolderFiles",
  async (folderId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(ENDPOINTS.GET_FOLDER_FILES(folderId));
      return response.data;
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const fetchMyFiles = createAsyncThunk(
  "common/fetchMyFiles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(ENDPOINTS.GET_MY_FILES);
      return response.data.files;
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

// ============================
// 🔗 Links
// ============================

export const addLink = createAsyncThunk(
  "common/addLink",
  async (payload: any, { rejectWithValue }) => {
    // console.log("payload====>", payload)
    try {
      const response = await api.post(ENDPOINTS.ADD_LINK, payload);
      // console.log("response=====>", response.data)
      return response.data;
    } catch (error: any) {
      // console.log("error=====>", error.response)
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const fetchLinks = createAsyncThunk(
  "common/fetchLinks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(ENDPOINTS.GET_LINKS);
      return response.data.links;
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

//
// ============================
// 🔍 Search
// ============================

export const searchData = createAsyncThunk(
  "common/search",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await api.get(ENDPOINTS.SEARCH(query));
      return response.data.results;
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

//
// ============================
//  Folder Analyze
// ============================

export const folderAnalyzebyFile = createAsyncThunk(
  "common/folderAnalyzebyFile",
  async (folderItem: any, { rejectWithValue }) => {
    console.log("FILE ANALYTICS folderItem=====>", folderItem)
    const payload = JSON.stringify({
      fileId: folderItem.id,
      forceReanalyze: true
    })
    try {
      const response = await api.post(
        ENDPOINTS.FOLDER_ANALYZE(folderItem.folderId),
        payload
      );
      console.log("FILE ANALYTICS RESPONSE=====>", response.data)
      return response.data;
    } catch (error: any) {
      console.log("FILE ANALYTICS ERROR=====>", error.response);
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const reportAnalyze = createAsyncThunk(
  "common/reportAnalyze",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await api.post(
        ENDPOINTS.REPORT_ANALYZE,
        payload
      );
      return response.data;
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);



export const chatAsk = createAsyncThunk(
  "common/chatAsk",
  async (payload: any, { rejectWithValue, signal }) => {
    try {
      const response = await api.post(
        ENDPOINTS.CHAT_ASK,
        payload,
        {
          signal,
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.name === "CanceledError") {
        return;
      } else {
        console.log(error.response?.data);
        return handleThunkError(error, rejectWithValue);
      }

    }
  }
);

export const fileAnalyze = createAsyncThunk(
  "common/fileAnalyze",
  async ({ fileId, analyzeType }: { fileId: string; analyzeType: string }, { rejectWithValue }) => {
    try {
      console.log("fileAnalyze PAYLOAD===>", { fileId, analyzeType })
      const response = await api.get(ENDPOINTS.FILE_ANALYZE_WITH_TAB(fileId, analyzeType));
      console.log("fileAnalyze RESPONSE====>", response)
      return response.data;
    } catch (error: any) {
      console.log("fileAnalyze ERROR", error.response.data.massage);
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const uploadFileInFolder = createAsyncThunk(
  "common/uploadFileInFolder",
  async (
    { folderId, payload }: { folderId: string; payload: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        ENDPOINTS.UPLOAD_FILE(folderId),
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.log(error.response?.data);
      return handleThunkError(error, rejectWithValue);
    }
  }
);




//
// ============================
// Slice
// ============================

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {

    addMessage: (state, action) => {
      state.chatMessages.push(action.payload);
    },

    clearChat: (state) => {
      state.chatMessages = [];
    },
    logout(state) {
      state.token = null;
      state.success = "Logged out successfully";
    },
    clearError(state) {
      state.error = null;
    },
    clearSuccess(state) {
      state.success = null;
    },
    clearMessages(state) {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ======================
      // addCase FIRST
      // ======================

      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.token = action.payload.token;
        state.userData = action.payload
        state.success = action.payload.message;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.success = "Registration successful";
      })

      .addCase(forgotPassword.fulfilled, (state) => {
        state.success = "OTP has been sent to your registered email.";
      })

      .addCase(resetPassword.fulfilled, (state) => {
        state.success = "Password reset successful";
      })

      .addCase(createFolder.fulfilled, (state) => {
        state.success = "Folder created successfully";
      })

      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.foldersData = action.payload.folders;
      })

      .addCase(fetchFolderFiles.fulfilled, (state, action) => {
        state.filesData = action.payload;
      })

      .addCase(folderAnalyzebyFile.fulfilled, (state, action) => {
        state.folderAnalyzeFileData = action.payload;
      })

      .addCase(reportAnalyze.fulfilled, (state, action) => {
        state.reportAnalyzeData = action.payload;
      })

      .addCase(chatAsk.pending, (state) => {
        state.chatLoading = true;
      })

      .addCase(chatAsk.fulfilled, (state, action) => {
        state.chatLoading = false;
        state.chatAskData.push(action.payload);
        state.chatMessages.push({
          id: Date.now(),
          text: action.payload?.answer || "No response",
          sender: "bot",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      })

      .addCase(chatAsk.rejected, (state) => {
        state.chatLoading = false;
      })

      .addCase(uploadFileInFolder.fulfilled, (state, action) => {
        state.success = "File uploaded successfully";
      })

      .addCase(fileAnalyze.fulfilled, (state, action) => {
        state.fileAnalyzeWithTabData = action.payload;
      })

      .addCase(fetchMyFiles.fulfilled, (state, action) => {
        state.filesMyData = action.payload;
      })

      .addCase(addLink.fulfilled, (state, action) => {
        state.success = "Link added successfully";
      })

      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.links = action.payload;
      })

      .addCase(searchData.fulfilled, (state, action) => {
        state.searchAllData = action.payload;
      })

      // ======================
      // addMatcher LAST
      // ======================

      .addMatcher(
        (action) =>
          action.type.endsWith("/pending") &&
          !action.type.startsWith("common/chatAsk"),
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = null;
        }
      )

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addMatcher(
        (action) =>
          action.type.endsWith("/fulfilled") &&
          !action.type.startsWith("common/chatAsk"),
        (state) => {
          state.loading = false;
        }
      )
  },
});

export const { logout, clearError, clearSuccess, clearMessages, addMessage, clearChat } =
  commonSlice.actions;

export default commonSlice.reducer;