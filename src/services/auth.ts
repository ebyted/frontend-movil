import axios from "axios";
export async function login(email, password) {
  const res = await axios.post("/token", { username: email, password });
  if (res.data.access_token) {
    return { token: res.data.access_token, user: { email } };
  }
  return null;
}
