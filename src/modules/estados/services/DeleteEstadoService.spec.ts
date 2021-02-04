import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import DeleteEstadoService from './DeleteEstadoService';
import FakeEstadosRepository from '../repositories/fakes/FakeEstadosRepository';

let fakeEstadosRepository: FakeEstadosRepository;
let fakeCacheProvider: FakeCacheProvider;
let deleteEstado: DeleteEstadoService;

describe('DeleteEstado', () => {
  beforeEach(() => {
    fakeEstadosRepository = new FakeEstadosRepository();
    fakeCacheProvider = new FakeCacheProvider();
    deleteEstado = new DeleteEstadoService(
      fakeEstadosRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to delete estado', async () => {
    const estado = await fakeEstadosRepository.create({
      nome: 'Paraná',
      abreviacao: 'PR',
    });

    await deleteEstado.execute({
      id: estado.id.toString(),
    });

    const estados = await fakeEstadosRepository.findAll();

    expect(estados).toEqual([]);
  });

  it("should not be able to delete estado that doesn't exist", async () => {
    await expect(
      deleteEstado.execute({
        id: 'fakeid123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
