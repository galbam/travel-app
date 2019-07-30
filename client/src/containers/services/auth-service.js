import axios from "axios";

const login = (username, password) =>{
return  axios.post("/api/auth/login", { username: username, password: password })
}
 
const signup = (username, password) =>{
return  axios.post("/api/auth/signup", { username: username, password: password })
}

const facebook = (username, facebookId) =>{
  return axios.post("/api/auth/login", {username: username, id: facebookId})
}

const google = (username, googleId) =>{
  return axios.post("/api/auth/login", {username: username, id: googleId})
}

const logout = () =>axios.post("/api/auth/logout").then(response => response.data);

export { login, logout, signup, facebook , google};


