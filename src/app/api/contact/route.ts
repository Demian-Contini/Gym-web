import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  try {
    const data = await resend.emails.send({
      from: 'Consultas Web <noreply@resend.dev>', // -------------> remitente
      to: 'miliguillot12@gmail.com', // -------------> destinatario
      subject: `Nueva consulta de ${name}`,
      replyTo: email,
      html: `<p><b>Nombre:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Mensaje:</b><br/>${message}</p>`,
             
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
} 