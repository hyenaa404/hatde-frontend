import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { fetchFile, uploadFile, deleteFile, updateFile } from "./fileThunk";



export const fileSlice = createSlice({
    name: "file",
    initialState: { fileData: null, status: "idle" },
    reducers: {},           
    extraReducers: (builder) => {
        builder
            // .addCase(fetchFile.pending, (state) => {
            //     state.status = "loading";
            // })
            // .addCase(fetchFile.fulfilled, (state, action) => {
            //     state.status = "succeeded";
            //     state.fileData = action.payload.data;
            //     // console.log("slice : " + action.payload.data)
            // })
            // .addCase(fetchFile.rejected, (state, action) => {
            //     console.log("error code: " + action.payload.status)
            //     state.status = "failed";
            // })
            // Upload file
            .addCase(uploadFile.pending, (state) => {
                state.status = "uploading";
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.status = "uploaded";
                console.log("File uploaded successfully");
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.status = "failed";
            })

            // delete file
            .addCase(deleteFile.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(deleteFile.rejected, (state, action) => {
                state.status = "failed";
            })

            // update file
            .addCase(updateFile.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateFile.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(updateFile.rejected, (state, action) => {
                state.status = "failed";
            })
    },
});

export default  fileSlice.reducer;
