import api from "@/lib/utils/api";
import { ISignInFormFields, ISignUpFormFields } from "@/types/auth.types";
import { Tokens } from "@/types/tokens.types";

class AuthService {
  private signInUrl = "/signIn";
  private signUpUrl = "signUp";

  async signIn(data: ISignInFormFields) {
    const res = await api.post(this.signInUrl, data);
    return res;
  }

  async signUp(data: ISignUpFormFields) {
    const res = await api.post(this.signUpUrl, data);
    return res;
  }
}

const authService = new AuthService();
export default authService;
