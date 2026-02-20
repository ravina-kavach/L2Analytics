import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api, setAuthToken } from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";

interface ReportState {
  data: any[];
  folders: any[];
  files: any[];
  links: any[];
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  data: [],
  folders: [],
  files: [],
  links: [],
  token: null,
  loading: false,
  error: null,
};

//
// 🔐 AUTH APIs
//

export const loginUser = createAsyncThunk(
  "common/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post(ENDPOINTS.LOGIN, payload);
      const token = response.data.token;

      setAuthToken(token);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
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
      return rejectWithValue(error.response?.data?.message);
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
      return rejectWithValue(error.response?.data?.message);
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
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

//
// 📁 Folder APIs
//

export const createFolder = createAsyncThunk(
  "common/createFolder",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await api.post(ENDPOINTS.CREATE_FOLDER, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
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
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

//
// 📄 File APIs
//

export const fetchFolderFiles = createAsyncThunk(
  "common/fetchFolderFiles",
  async (folderId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(ENDPOINTS.GET_FOLDER_FILES(folderId));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
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
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

//
// 🔗 Links
//

export const addLink = createAsyncThunk(
  "common/addLink",
  async (payload: { url: string }, { rejectWithValue }) => {
    try {
      const response = await api.post(ENDPOINTS.ADD_LINK, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
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
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

//
// 🔍 Search
//

export const searchData = createAsyncThunk(
  "common/search",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await api.get(ENDPOINTS.SEARCH(query));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      setAuthToken(null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.folders = action.payload;
      })

      .addCase(fetchFolderFiles.fulfilled, (state, action) => {
        state.files = action.payload;
      })

      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.links = action.payload;
      })

      .addCase(searchData.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const { logout } = commonSlice.actions;
export default commonSlice.reducer;