import { transporter } from '../../integration/nodemailer';
import { EnviarDenunciaRequest, Regiao } from './@types';
import { DenunciaRepository } from './denuncia-repository';
import db from '../../database/db';

export const EMAIL_POR_REGIAO: Record<Regiao, string> = {
  [Regiao.NORTE]: process.env.CONSELHO_REGIAO_NORTE_EMAIL!,
  [Regiao.SUL]: process.env.CONSELHO_REGIAO_SUL_EMAIL!,
  [Regiao.LESTE]: process.env.CONSELHO_REGIAO_LESTE_EMAIL!,
  [Regiao.OESTE]: process.env.CONSELHO_REGIAO_OESTE_EMAIL!
};

export const DenunciaService = async () => {
  const database = await db
  const denunciaRepo = new DenunciaRepository(database);

  const enviarDenuncia = async (body: EnviarDenunciaRequest) => {
    const emailDestino = EMAIL_POR_REGIAO[body.regiao];

    const subject = 'Nova Denúncia Recebida - OdontoGuardião';
    const emailBody = `
    Prezados,

    Uma nova denúncia foi registrada no sistema OdontoGuardião.

    Protocolo: ${body.protocolo}
    Data: ${new Date().toLocaleDateString('pt-BR')}
    Hora: ${new Date().toLocaleTimeString('pt-BR')}

    Esta é uma mensagem automática. Por favor, não responda a este e-mail.

    Atenciosamente,
    Equipe OdontoGuardião
    `;

    const attachments = [];

    if (body.pdf) {
      attachments.push({
        filename: body.pdf.originalname,
        content: body.pdf.buffer,
      });
    }

    try {
      const info = await transporter.sendMail({
        from: process.env.ODONTO_GUARDIAO_EMAIL,
        to: emailDestino,
        subject,
        text: emailBody,
        attachments,
      });

      const denunciaId = await denunciaRepo.criar({
        protocolo: body.protocolo,
        regiao: body.regiao,
      })

      console.log(`Email enviado: ${info.response}`);
      return { success: true, protocolo: denunciaId, message: 'Denúncia enviada com sucesso.' };
    } catch (error) {
      console.error('Erro ao enviar denúncia:', error);
      throw new Error('Erro ao enviar denúncia.');
    }
  }

  const listaTodasDenuncias = async () => {
    return await denunciaRepo.listarTodas()
  }

  return {
    enviarDenuncia,
    listaTodasDenuncias
  }
}
