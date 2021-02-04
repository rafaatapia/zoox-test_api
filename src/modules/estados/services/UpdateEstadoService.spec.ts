import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import UpdateEstadoService from './UpdateEstadoService';
import FakeEstadosRepository from '../repositories/fakes/FakeEstadosRepository';

let fakeEstadosRepository: FakeEstadosRepository;
let fakeCacheProvider: FakeCacheProvider;
let updateEstado: UpdateEstadoService;

describe('UpdateEstado', () => {
  beforeEach(() => {
    fakeEstadosRepository = new FakeEstadosRepository();
    fakeCacheProvider = new FakeCacheProvider();
    updateEstado = new UpdateEstadoService(
      fakeEstadosRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to update estado', async () => {
    const estado = await fakeEstadosRepository.create({
      abreviacao: 'RR',
      nome: 'Paran',
    });

    const updatedEstado = await updateEstado.execute({
      id: estado.id.toString(),
      abreviacao: 'PR',
      nome: 'Paraná',
    });

    expect(updatedEstado.nome).toEqual('Paraná');
    expect(updatedEstado.abreviacao).toEqual('PR');
    expect(updatedEstado.id).toEqual(estado.id);
  });

  it("should not be able to update estado that doesn't exist", async () => {
    await expect(
      updateEstado.execute({
        id: 'fakeid123',
        abreviacao: 'SP',
        nome: 'Paraná',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update abreviacao to an already used', async () => {
    const estado = await fakeEstadosRepository.create({
      abreviacao: 'PR',
      nome: 'Paraná',
    });
    await fakeEstadosRepository.create({
      abreviacao: 'SP',
      nome: 'São Paulo',
    });

    await expect(
      updateEstado.execute({
        id: estado.id.toString(),
        abreviacao: 'SP',
        nome: 'Paraná',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
