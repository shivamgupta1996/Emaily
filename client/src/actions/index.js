import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => {
  return {
    type: FETCH_USER,
    payload: "sdsd"
  }
}
/* (dispatch) => {
  return axios
    .get("/api/current_user")
    .then((res) => {
      dispatch({ 
        type: FETCH_USER,
        payload: res
      })
    }); 
};*/
