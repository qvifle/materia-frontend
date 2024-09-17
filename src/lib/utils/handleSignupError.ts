import toast from "react-hot-toast"

const handleSignupError = (err: any) => {
  if (!!err.response.data) {
    toast.error(err.response.data)
  } else if (err.message === "Network Error") {
    toast.error("Can't reach the server")
  } else {
    toast.error("Unknown error. Contact us to solve problem")
  }
}

export default handleSignupError