import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
   type: string;
   comment: string;
   screenshot?: string;
}

export class SubmitFeedbackUseCase {
   
   constructor(
      private feedbacksRepository: FeedbacksRepository,
      private mailAdapter: MailAdapter,
   ) {}

   async execute(request: SubmitFeedbackUseCaseRequest) {
      const { type, comment, screenshot } = request;

      //criada regra de negocio para ver se funciona no teste do Jest

      if(!type) {
         throw new Error('Necessario preencher type')
      }

      if(!comment) {
         throw new Error('Necessario preencher comment')
      }

      if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
         throw new Error('screenshot com formato invalido')
      }

      await this.feedbacksRepository.create({
         type,
         comment,
         screenshot,
      })

      await this.mailAdapter.sendMail({
         subject: 'Novo Feedback',
         body: [
            `<div style="font-family: sans-serif; font-size: 18px; color: #111;">`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentario: ${comment}>`,
            `</div>`
         ].join('\n')
      })
   }
}

//agora dentro do caso de uso nao tem nenhuma referencia do Prisma, entao se quisermos trocar a ORM em qualquer tempo, nao tera problema, pois essa classe nao depende diretamente do Prisma, o qual sera inversamente injetado dentro dessa classe como faremos a seguir. 