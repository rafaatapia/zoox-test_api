import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeEstadosRepository from '@modules/estados/repositories/fakes/FakeEstadosRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeCidadesRepository from '../repositories/fakes/FakeCidadesRepository';
import CreateCidadeService from './CreateCidadeService';

let fakeCidadesRepository: FakeCidadesRepository;
let fakeEstadosRepository: FakeEstadosRepository;
let fakeCacheProvider: FakeCacheProvider;
let createCidade: CreateCidadeService;

describe('CreateCidade', () => {
  beforeEach(() => {
    fakeCidadesRepository = new FakeCidadesRepository();
    fakeEstadosRepository = new FakeEstadosRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createCidade = new CreateCidadeService(
      fakeCidadesRepository,
      fakeEstadosRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new cidade', async () => {
    const estado = await fakeEstadosRepository.create({
      abreviacao: 'PR',
      nome: 'Paraná',
    });

    const cidade = await createCidade.execute({
      estadoId: estado.id.toString(),
      nome: 'Cascavel',
    });

    expect(cidade).toHaveProperty('id');
  });

  it('should not be able to create a cidade with same name at the same estado', async () => {
    const estado = await fakeEstadosRepository.create({
      abreviacao: 'PR',
      nome: 'Paraná',
    });

    await fakeCidadesRepository.create({
      estadoId: estado.id.toString(),
      nome: 'Cascavel',
    });

    await expect(
      createCidade.execute({
        estadoId: estado.id.toString(),
        nome: 'Cascavel',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a cidade with a non-existing state', async () => {
    await expect(
      createCidade.execute({
        estadoId: 'fakeid123',
        nome: 'Cascavel',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
