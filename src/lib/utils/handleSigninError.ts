import toast from "react-hot-toast"

const handleSignInError = (err: { error: string }) => {
  switch (err.error) {
    case "AxiosError: Request failed with status code 404":
      toast.error("User is not registered")
      return
    case "AxiosError: Request failed with status code 401":
      toast.error("Wrong password or email")
      return
    case "AggregateError":
      toast.error("Can't reach the server")
      return
  }
  toast.error("Unknown error. Contact us to solve problem")
}

export default handleSignInError
