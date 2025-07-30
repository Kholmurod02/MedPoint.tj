// lib/signalR.ts
import * as signalR from "@microsoft/signalr"
import Cookies from "js-cookie"

let connection = null

export const getSignalRConnection = () => {
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl("http://147.45.146.15:5063/hubs/chat", {
        accessTokenFactory: () => Cookies.get("token") || ""
      })
      .withAutomaticReconnect()
      .build()
  }

  return connection
}
