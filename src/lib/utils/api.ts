import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const baseURL = process.env.API_PATH || "http://localhost:5000";

const options = {
  baseURL,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const ApiClient = () => {
  const instance = axios.create(options);
  instance.interceptors.request.use(async (request) => {
    const session = await getSession({ req: request });
    if (session?.user.accessToken) {
      request.headers.Authorization = `Bearer ${session?.user.accessToken}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // console.log(error.response.data);
      if (error.response.status === 401) {
        signOut({ redirect: true, callbackUrl: "/login" });
      }
      throw error;
    }
  );

  return instance;
};

export default ApiClient();
