import { transporter } from '../../integration/nodemailer';

export interface Denuncia {
denuncia: string;
pdf: Express.Multer.File;
}

export const enviarDenuncia = async (denuncia: Denuncia) => {
	const subject = 'Nova Denúncia Recebida - OdontoGuardião';
	const emailBody = `
Prezados,

Uma nova denúncia foi registrada no sistema OdontoGuardião.

Protocolo: ${denuncia.denuncia}
Data: ${new Date().toLocaleDateString('pt-BR')}
Hora: ${new Date().toLocaleTimeString('pt-BR')}

Esta é uma mensagem automática. Por favor, não responda a este e-mail.

Atenciosamente,
Equipe OdontoGuardião
`;


  const attachments = [];

  if (denuncia.pdf) {
    attachments.push({
      filename: denuncia.pdf.originalname,
      content: denuncia.pdf.buffer,
    });
  }

	try {
		const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_CONSELHO,
      subject,
      text: emailBody,
      attachments,
    });

    console.log(`Email enviado: ${info.response}`);
    return { success: true, message: 'Denúncia enviada com sucesso.' };
  } catch (error) {
    console.error('Erro ao enviar denúncia:', error);
    throw new Error('Erro ao enviar denúncia.');
  }
};

