import axios from "axios";

const login = (username, password) =>{
return  axios.post("/api/auth/login", { username: username, password: password })
}
 
const signup = (username, password) =>{
return  axios.post("/api/auth/signup", { username: username, password: password })
}

const facebookSignup = (userId) =>{
  return axios.post("/api/auth/facebooksignup", { userId})
}

const googleSignup = (googleId) =>{
  return axios.post("/api/auth/googlesignup", { googleId})
}

const facebookLogin = (userId) =>{
  return axios.post("/api/auth/facebooklogin", { userId})
}

const googleLogin = (googleId) =>{
  return axios.post("/api/auth/googlelogin", { googleId})
}

const logout = () =>axios.post("/api/auth/logout").then(response => response.data);

export { login, logout, signup, facebookSignup , googleSignup, facebookLogin, googleLogin};


