import { createAction, createReducer } from '@reduxjs/toolkit';
import { ISheet } from '../../@Types/sheet';
import { actionGetSheets } from '../thunks/sheetThunks';

export interface SheetState {
  sheetName: string;
  sheets: ISheet[];
}

export const userInitialState: SheetState = {
  sheetName: '',
  sheets: [],
};

export const actionSetSheetName = createAction<string>('SET_SHEET_NAME');

export const actionSetCreateSheet = createAction<string>('SET_CREATE_SHEET');

const sheetReducer = createReducer(userInitialState, (builder) => {
  builder
    .addCase(actionSetSheetName, (state, action) => {
      state.sheetName = action.payload;
    })
    .addCase(actionGetSheets.fulfilled, (state, action) => {
      state.sheets = action.payload;
    });
});

export default sheetReducer;
