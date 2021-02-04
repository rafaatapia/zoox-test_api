import { container } from 'tsyringe';

import './providers';

import IEstadosRepository from '@modules/estados/repositories/IEstadosRepository';
import EstadosRepository from '@modules/estados/infra/typeorm/repositories/EstadosRepository';

import ICidadesRepository from '@modules/cidades/repositories/ICidadesRepository';
import CidadesRepository from '@modules/cidades/infra/typeorm/repositories/CidadesRepository';

container.registerSingleton<IEstadosRepository>(
  'EstadosRepository',
  EstadosRepository,
);

container.registerSingleton<ICidadesRepository>(
  'CidadesRepository',
  CidadesRepository,
);
