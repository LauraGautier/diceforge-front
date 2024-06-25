import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios";

const actionGetSheets = createAsyncThunk(
  'sheet/GET_SHEETS',
  async () => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
    const response = await axiosInstance.get(`${apiUrl}/binder`);
    console.log("Je suis la réponse du thunk d'all sheets ", response.data);
    return response.data;
  }
);

export { actionGetSheets };
