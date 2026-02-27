import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setStorage, removeStorage } from "../../utils/storage";
import STORAGE_KEYS from "../../utils/storageKeys";

interface ReportState {
  data: any[];
  foldersData: any[];
  filesData: any[];
  links: any[];
  token: string | null;
  userData: any;
  isLogin: boolean;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: ReportState = {
  data: [],
  foldersData: [],
  filesData: [],
  links: [],
  token: null,
  isLogin: false,
  userData: [],
  loading: false,
  error: null,
  success: null,
};

//
// ============================
// Error Handler
// ============================

const handleThunkError = (error: any, rejectWithValue: any) => {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong. Please try again.";

  return rejectWithValue(message);
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
      return rejectWithValue("Failed to load token");
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
      return rejectWithValue(error?.response?.data?.message || "Login failed");
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
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await api.post(ENDPOINTS.FORGOT_PASSWORD, { email });
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
      return response.data;
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

//
// ============================
// 🔗 Links
// ============================

export const addLink = createAsyncThunk(
  "common/addLink",
  async (payload: { url: string }, { rejectWithValue }) => {
    try {
      const response = await api.post(ENDPOINTS.ADD_LINK, payload);
      return response.data;
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const fetchLinks = createAsyncThunk(
  "common/fetchLinks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(ENDPOINTS.GET_LINKS);
      return response.data;
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
      return response.data;
    } catch (error: any) {
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
        state.success = "Password reset link sent";
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

      .addCase(fetchMyFiles.fulfilled, (state, action) => {
        state.filesData = action.payload;
      })

      .addCase(addLink.fulfilled, (state) => {
        state.success = "Link added successfully";
      })

      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.links = action.payload;
      })

      .addCase(searchData.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      // ======================
      // addMatcher LAST
      // ======================

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
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
          state.error = action.payload || "Request failed";
        }
      )

      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { logout, clearError, clearSuccess, clearMessages } =
  commonSlice.actions;

export default commonSlice.reducer;