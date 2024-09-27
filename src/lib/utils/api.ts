import axios from "axios"
import { getServerSession } from "next-auth"
import { getSession, signOut, useSession } from "next-auth/react"
import { options as nextAuthOptions } from "@/app/api/auth/[...nextauth]/options"

import authService from "@/services/AuthService"

const baseURL = process.env.NEXT_PUBLIC_API_PATH
const serverBaseUrl = process.env.SERVER_API_PATH

const options = {
  baseURL,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
}

const ApiClient = () => {
  const instance = axios.create(options)

  instance.interceptors.request.use(async (request) => {
    const session = await getSession({ req: request })
    if (session?.user.accessToken) {
      request.headers.Authorization = `Bearer ${session?.user.accessToken}`
    }
    return request
  })

  instance.interceptors.response.use(
    (res) => res,
    async (err) => {
      console.log(err)

      if (err?.response?.data?.error?.name === "TokenExpiredError") {
        signOut()
      }

      throw err
    },
  )

  return instance
}

const ApiClientNoAuth = () => {
  const instance = axios.create(options)
  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      throw err
    },
  )
  return instance
}

const ServerApiClientNoAuth = () => {
  const instance = axios.create({ ...options, baseURL: serverBaseUrl })
  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      throw err
    },
  )
  return instance
}

const ServerApiClient = () => {
  const instance = axios.create({ ...options, baseURL: serverBaseUrl })
  instance.interceptors.request.use(
    async (request) => {
      const session = await getServerSession(nextAuthOptions)
      if (session?.user.accessToken) {
        request.headers.Authorization = `Bearer ${session?.user.accessToken}`
      }
      return request
    },
    (error) => {
      console.log(error)
      if (error?.response?.status === 401) {
        signOut({ redirect: true, callbackUrl: "/login" })
      }
      throw error
    },
  )

  return instance
}

export const serverApi = ServerApiClient()
export const serverApiNoAuth = ServerApiClientNoAuth()
export const apiNoAuth = ApiClientNoAuth()

export default ApiClient()
