import axios from "axios";
export const apiEmail = axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/https://dropmail.me/api/graphql/",
});
