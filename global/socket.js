import {io} from "socket.io-client"
import apiConfig from "../api/apiConfig";
export const socketClient = io.connect(apiConfig.baseUrl, {
    transports: ["websocket"],
  });