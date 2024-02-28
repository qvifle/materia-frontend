import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const baseURL = process.env.API_PATH || "http://localhost:5000";

const ApiClient = () => {
  const defaultOptions = {
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const session = await getSession({ req: request });
    if (session?.user.accessToken) {
      request.headers.Authorization = `Bearer ${session?.user.accessToken}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        signOut({ redirect: true, callbackUrl: "/login" });
      }
      console.log(error);
    }
  );

  return instance;
};

export default ApiClient();
