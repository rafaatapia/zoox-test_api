import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateEstadoService from './CreateEstadoService';
import FakeEstadosRepository from '../repositories/fakes/FakeEstadosRepository';

let fakeEstadosRepository: FakeEstadosRepository;
let fakeCacheProvider: FakeCacheProvider;
let createEstado: CreateEstadoService;

describe('CreateEstado', () => {
  beforeEach(() => {
    fakeEstadosRepository = new FakeEstadosRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createEstado = new CreateEstadoService(
      fakeEstadosRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new estado', async () => {
    const estado = await createEstado.execute({
      abreviacao: 'PR',
      nome: 'Paraná',
    });

    expect(estado).toHaveProperty('id');
  });

  it('should not be able to create a estado that already exists', async () => {
    await fakeEstadosRepository.create({
      abreviacao: 'PR',
      nome: 'Paraná',
    });

    await expect(
      createEstado.execute({
        abreviacao: 'PR',
        nome: 'Paraná',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
