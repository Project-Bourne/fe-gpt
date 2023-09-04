import { setHistory } from '@/redux/reducer/oracleSlice';
import ChatService from '@/services/chat.service';

export async function fetchData(dispatch) {
  try {
    const response = await ChatService.getHistory()
    console.log(response);
    if (response.status) {
      dispatch(setHistory(response.data));
    } else {
      // Handle the case where Data.status is falsy
      console.log("unable to fetch")
    }
  } catch (error) {
    console.log(error);
  }
}