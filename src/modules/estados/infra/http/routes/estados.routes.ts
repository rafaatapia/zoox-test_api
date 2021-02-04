import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EstadosController from '../controllers/EstadosController';

const estadosRouter = Router();
const estadosController = new EstadosController();

estadosRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      orderBy: Joi.string().valid(
        'id',
        'nome',
        'abreviacao',
        'createdAt',
        'updatedAt',
      ),
      sort: Joi.string().valid('ASC', 'DESC'),
    },
  }),
  estadosController.show,
);
estadosRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  estadosController.show,
);
estadosRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      abreviacao: Joi.string().required().length(2),
    },
  }),
  estadosController.create,
);
estadosRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      abreviacao: Joi.string().length(2).required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  estadosController.update,
);
estadosRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  estadosController.delete,
);

export default estadosRouter;
