import { tg_bot_token, tg_chatId } from '@/shared/config/config';
import axios from 'axios';
import { NextResponse } from 'next/server';


export async function POST(req) {
    try {
        const { fullName, email, message } = await req.json();
        const formattedText = `
      <b> New Message From MedPoint </b>
    <b>FullName: </b> ${fullName}
    <b>Email:</b> ${email}
    <b>Message:</b> ${message}
    `;

        await axios.post(
            `https://api.telegram.org/bot${tg_bot_token}/sendMessage`,
            {
                chat_id: tg_chatId,
                text: formattedText,
                parse_mode: 'HTML'
            }
        );

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error(error);

    }
}