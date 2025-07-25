import Cookies from "js-cookie"

export const BASIC_URL=process.env.NEXT_PUBLIC_API_URL
export const access_token = Cookies.get('token')
export const tg_bot_token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
export const tg_chatId=process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID 






