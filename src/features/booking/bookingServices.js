import { createAsyncThunk, rejectWithValue } from "@reduxjs/toolkit";
import { addBookingAPI } from "./bookingAPI";

export const addBooking = async (data) => {
  try {
    const response = await addBookingAPI(data)
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error while add booking services:", error);
    throw error; 
  }
};