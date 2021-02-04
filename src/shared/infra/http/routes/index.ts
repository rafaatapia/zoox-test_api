import { Router } from 'express';

import cidadesRouter from '@modules/cidades/infra/http/routes/cidades.routes';
import estadosRouter from '@modules/estados/infra/http/routes/estados.routes';

const routes = Router();

routes.use('/cidades', cidadesRouter);
routes.use('/estados', estadosRouter);

export default routes;
