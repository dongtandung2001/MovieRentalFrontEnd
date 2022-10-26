import httpService from "./httpService";
import config from "../config.json";
const apiEndPoint = config.apiUrl + "/auth";

export function login(email, password) {
  return httpService.post(apiEndPoint, { email, password });
}
