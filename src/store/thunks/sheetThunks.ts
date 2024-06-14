import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios";

const actionGetSheets = createAsyncThunk(
  'sheet/GET_SHEETS',
  async () => {
    
    const response = await axiosInstance.get(
      'http://localhost:3000/api/binder'
    );
    console.log("Je suis la réponse du thunk d'all sheets ",response.data);
    return(response.data);
  }
  
);

export { actionGetSheets };
