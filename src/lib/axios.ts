import axios from "axios";
export const apiEmail = axios.create({
  baseURL: "https://dropmail.me/api/graphql/",
});
