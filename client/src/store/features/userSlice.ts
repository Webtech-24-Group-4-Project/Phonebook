import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { stat } from 'fs';

interface LoggedInUser {
    username: string;
}

interface UserState {
    user: LoggedInUser | null;
}

const initialState: UserState = {
    user: null,
};

export const initUser = createAsyncThunk('initUser', async () : Promise<LoggedInUser> => {
    try {
        const res = await axios.get('/auth/current');
        
        return res.data as LoggedInUser;
    }
    catch (error) {
        return {} as LoggedInUser;
    }
});

export const logoutUser = createAsyncThunk('logoutUser', async () => {
    try {
        await axios.post('/auth/logout');
    }
    catch (error) {
        console.error('Error logging out', error);
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoggedInUser>) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(initUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            window.location.href = '/';
        });
    }
});

export const selectUser = (state: { user: UserState }) => state.user.user;

export const { login } = userSlice.actions;



export default userSlice.reducer;
