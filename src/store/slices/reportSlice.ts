import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Report } from "../../types/report.types";

interface ReportState {
  data: Report[];
}

const initialState: ReportState = {
  data: [],
};

const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setReports(state, action: PayloadAction<Report[]>) {
      state.data = action.payload;
    },
  },
});

export const { setReports } = reportSlice.actions;
export default reportSlice.reducer;
