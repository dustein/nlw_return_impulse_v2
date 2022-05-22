// aqui vamos criar o metodos para definir quais acoes o repositorio podera fazer com os feedbacks no banco de dados

export interface FeedbackCreateData {
   type: string;
   comment: string;
   screenshot?: string;
}

export interface FeedbacksRepository {
   create: (data: FeedbackCreateData) => Promise<void>;
}

//usamos o retono void pois nao e necessario retorno aqui, void e vazio
//Essa interface vai definir quais operacoes podem ser feitas no bancop de dados, mas esse repositorio nao vai implementar essas operacoes, isso sera feito no prisma-feedbacks-repository. Assim o contrato separado da implementacao, se nao quisermos mais usar o prisma, e usarmos outro ORM tipo mongoose ou sequelize, bastando criar outra classe que implemente esse contrato no lugar o prisma.

// mas depois no prisma-feedbacks-repository colocamos o metodo create para ser assincrono, entao o void aqui tem que ser uma Promisse, porque se for utilizar depois o metodo em outros arquivos e nao colocar o await, nao saberemos onde estara o erro e sera desta situacao
