import { apiNoAuth, serverApi, serverApiNoAuth } from "@/lib/utils/api"
import {
  ISignInFormFields,
  ISignUpFormFields,
  RefreshTokenFields,
  RefreshTokenResponseData,
} from "@/types/auth.types"

class AuthService {
  private signInUrl = "/signIn"
  private signUpUrl = "/signUp"
  private refreshUrl = "/refresh"

  async signIn(data: ISignInFormFields) {
    const res = await serverApiNoAuth.post(this.signInUrl, data, {
      withCredentials: true,
    })
    return res
  }

  async signUp(data: ISignUpFormFields) {
    const res = await apiNoAuth.post(this.signUpUrl, data)
    return res
  }

  async refreshToken(data: RefreshTokenFields) {
    return apiNoAuth.post<RefreshTokenResponseData>(this.refreshUrl, data)
  }
}

const authService = new AuthService()
export default authService
