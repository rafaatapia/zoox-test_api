import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import secureApiKey from '@shared/infra/http/middlewares/secureApiKey';
import CidadesController from '../controllers/CidadesController';

const cidadesRouter = Router();
const cidadesController = new CidadesController();

cidadesRouter.use(secureApiKey);

cidadesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      nome: Joi.string(),
      orderBy: Joi.string().valid('id', 'nome', 'createdAt', 'updatedAt'),
      sort: Joi.string().valid('ASC', 'DESC'),
    },
  }),
  cidadesController.show,
);
cidadesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  cidadesController.show,
);
cidadesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      estadoId: Joi.string().required(),
    },
  }),
  cidadesController.create,
);
cidadesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      estadoId: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  cidadesController.update,
);
cidadesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  cidadesController.delete,
);

export default cidadesRouter;
