import axios from "axios";

export const apiEmail = axios.create({
  baseURL: "https://web-production-9a329.up.railway.app/https://dropmail.me/api/graphql",
});

