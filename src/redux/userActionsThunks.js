import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';



const setUser = createAsyncThunk("user/setUserState", async (userData, {rejectWithValue}) =>  {
    try {
        console.log("try")
        const checkUser = await axios.get(`${process.env.REACT_APP_API_URL}api/users/user`, {
            params: {userId: userData.userId},
            headers: {
                // Authorization: `Bearer ${userData.token}`, // если есть токен 
                "Content-Type": "application/json"
    }});

        if(checkUser.data){
            console.log("user was found")
            return checkUser.data;
        }
        else {
            console.log("user creating")
            const createdUser = await axios.post(`${process.env.REACT_APP_API_URL}api/users/user`, userData)
            return createdUser.data;
        }
    } catch (error) {
        console.error("Ошибка при создании пользователя", error);
        return rejectWithValue(error.response?.data || "Ошибка создания пользователя");
    }
});

export default setUser;