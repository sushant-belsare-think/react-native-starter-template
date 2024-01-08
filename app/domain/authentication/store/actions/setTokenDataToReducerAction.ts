import {PayloadAction} from '@reduxjs/toolkit';

export const setTokenDataToReducerAction = (
  state: any,
  action: PayloadAction,
) => {
  console.log("inside reducer **************************************"+JSON.stringify(action.payload));
  
  state.refData = action.payload;
};
