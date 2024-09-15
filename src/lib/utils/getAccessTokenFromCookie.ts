const getTokensFromCookie = (cookie: string[]) => {
  for (let i = 0; i < cookie.length; i++) {
    const [name, value] = cookie[i].split(";")[0].split("=");
    if (name === "accessToken") {
      return value;
    }
  }
};

export default getTokensFromCookie;
