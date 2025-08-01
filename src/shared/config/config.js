export const BASIC_URL = process.env.NEXT_PUBLIC_API_URL;
export const tg_bot_token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
export const tg_chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

import Cookies from "js-cookie";

export const access_token = () => {
  if (typeof window !== "undefined") {
    return Cookies.get("token");
  }
  return null;
};
