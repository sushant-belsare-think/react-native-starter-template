import { IAuth } from "../../interfaces/IAuth"

export const checkNetworkAction = (state: IAuth, action: any)=>{
    console.log("action payload ............. "+action.payload);
    
    state.connectionState = action.payload;
}