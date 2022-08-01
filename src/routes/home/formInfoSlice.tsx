import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { handleUpdateAssignmentStatuses } from '../home/components/sidebar/expanded/search/searchSlice';
import * as api from './apiService';

interface FormInfoState {
    loading: boolean;
    contractors: { value: number; label: string }[];
    isJobAPIEnabled: boolean;
}

const initialState: FormInfoState = {
    loading: false,
    contractors: [],
    isJobAPIEnabled: false,
}

/**
 * TODO: This is where you get all the form information you need for initial load. Things like if the user has the JOB API enabled,
 * or if the project is in IC or maintenance, or user specific information.
 * For now we just getting the contractors but you can change the name and expand it later.
 */
export const getContractors = createAsyncThunk(
    'formInfo/getContractors',

    async (_, thunkAPI) => {

        const { data } : any = await api.getContractors();
      
        const contractors = data.map(function(contractor: any) {
            return { value: contractor.id, label: contractor.companyName }
        });

        thunkAPI.dispatch(handleUpdateAssignmentStatuses(contractors));

        return contractors;
    }
)

export const FormInfoSlice = createSlice({
    name: 'formInfo',
    initialState,
    reducers: {
        
    },
    
    extraReducers: (builder) => {
        builder.addCase(getContractors.pending, (state, action) => {
            state.contractors = [];
            state.loading = true;
        })
        .addCase(getContractors.fulfilled, (state, action) => {
            state.loading = false;
            state.contractors = action.payload;
        })
        .addCase(getContractors.rejected, (state, action) => {
            state.contractors = [];
            state.loading = false;
            //TODO: show toast message
        })
    }

});

export const selectContractors = (state: RootState) => state.formInfo.contractors;

export default FormInfoSlice.reducer;