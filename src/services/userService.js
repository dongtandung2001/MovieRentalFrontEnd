import { getCurrentUser } from "./authService";
import httpService from "./httpService";

const apiEndPoint = "/users";

export function register(user) {
  return httpService.post(apiEndPoint, {
    email: user.username,
    password: user.password,
  });
}

export function setCustomer(customer) {
  const user = getCurrentUser();
  return httpService.put(apiEndPoint + `/${user._id}`, {
    _id: customer._id,
  })

}

export function getUser(token) {
  return httpService.get(apiEndPoint + "/me", {
    headers: {
      "x-auth-token": token,
    },
  });
}
