// test('sum 2 + 2', () => {
//    expect(2 + 2).toBe(4)
// });

import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();


describe('Submit Feedback', () => {
   it('deveria ser capaz de enviar um feedback na aplicacao', async () => {
      const submitFeedback = new SubmitFeedbackUseCase(
         { create: createFeedbackSpy },
         { sendMail: sendMailSpy }
      )
      await expect(submitFeedback.execute({
         type: 'BUG',
         comment: 'exemplo de comment',
         screenshot: 'data:image/png;base64.teste.imagem'
      })).resolves.not.toThrow();

      expect(createFeedbackSpy).toHaveBeenCalled();
      expect(sendMailSpy).toHaveBeenCalled();
   })

   it('nao deve ser possivel enviar feedback sem umn type', async () => {
      const submitFeedback = new SubmitFeedbackUseCase(
         { create: async () => {} },
         { sendMail: async () => {} }
      )

      await expect(submitFeedback.execute({
         type: '',
         comment: 'exemplo de comment',
         screenshot: 'data:image/png;base64.teste.imagem'
      })).resolves.not.toThrow();
   })

   it('nao deve ser possivel enviar feedback sem umn comment', async () => {
      const submitFeedback = new SubmitFeedbackUseCase(
         { create: async () => {} },
         { sendMail: async () => {} }
      )
      
      await expect(submitFeedback.execute({
         type: 'BUG',
         comment: '',
         screenshot: 'data:image/png;base64.teste.imagem'
      })).resolves.not.toThrow();
   })

   it('nao deve ser possivel enviar feedback com uma screenshot invalida', async () => {
      const submitFeedback = new SubmitFeedbackUseCase(
         { create: async () => {} },
         { sendMail: async () => {} }
      )
      
      await expect(submitFeedback.execute({
         type: 'BUG',
         comment: 'exemplo de comment',
         screenshot: 'teste.jpg'
      })).resolves.not.toThrow();
   })

})


