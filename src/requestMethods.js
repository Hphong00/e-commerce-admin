import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWQwNTZjYjYzNDZkM2NiMGE2ZGI0OSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTU1MDYzMDgsImV4cCI6MTY1NTc2NTUwOH0.xl_okziXZ_EV-EFo3CZ9Q9QkqeQBEVgA08uAzrRRdZk"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});