import axios from "axios";
import { buildWebStorage, setupCache } from "axios-cache-interceptor";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const $host = setupCache(instance, {
  storage: buildWebStorage(localStorage, "axios-cache:"),
});

export { $host };
