import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import getBidData from 'redux/bid/actions/getBidData';



const setUser = createAsyncThunk("user/setUserState", async (userData, { rejectWithValue, dispatch }) => {
  try {

    const checkUser = await axios.get(`${process.env.REACT_APP_API_URL}api/users/user`, {
      params: { userId: userData.id },
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userData.token}` // если нужен токен
      },
    });

    if(checkUser.data.currentBid){
      dispatch(getBidData(checkUser.data.currentBid))
    }

    return checkUser.data;

  } catch (error) {
    console.log(error)
    if (error.response?.status === 404) {
      console.log("user not found — creating new user");

      try {
        const createdUser = await axios.post(`${process.env.REACT_APP_API_URL}api/users/user`, {id: userData.id, first_name: userData.first_name, last_name:userData.last_name, username: userData.username, userAvatarURL: userData.photo_url});
        return createdUser.data;
      } catch (creationError) {
        console.error("Ошибка при создании пользователя:", creationError);
        return rejectWithValue(creationError.response?.data || "Ошибка создания пользователя");
      }

    } else {
      console.error("Другая ошибка при запросе пользователя:", error);
      return rejectWithValue(error.response?.data || "Ошибка запроса пользователя");
    }
  }
});

export default setUser;