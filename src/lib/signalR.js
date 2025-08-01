// lib/signalR.js
import * as signalR from "@microsoft/signalr";

let connection = null;

export const connectToChatHub = (token) => {
  if (connection && connection.state !== signalR.HubConnectionState.Disconnected) return connection;

  connection = new signalR.HubConnectionBuilder()
    .withUrl("http://147.45.146.15:5063/chathub", {
      accessTokenFactory: () => token, 
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

  return connection;
};
