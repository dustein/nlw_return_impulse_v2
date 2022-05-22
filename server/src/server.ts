import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();

//no cors devemos definir qual front pode acessar o back, medida de seguranca, nao usarmeos no projeto mes estudar isso
// app.use(cors({
//    origin: 'http://podeacessar....'
// }));

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(3333, () => console.log(`Servidor ATIVO !`))