import { apiNoAuth, serverApi, serverApiNoAuth } from "@/lib/utils/api"
import { ISignInFormFields, ISignUpFormFields } from "@/types/auth.types"

class AuthService {
  private signInUrl = "/signIn"
  private signUpUrl = "/signUp"

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
}

const authService = new AuthService()
export default authService
