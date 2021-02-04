import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeEstadoRepository from '@modules/estados/repositories/fakes/FakeEstadosRepository';
import UpdateCidadeService from './UpdateCidadeService';
import FakeCidadesRepository from '../repositories/fakes/FakeCidadesRepository';

let fakeCidadesRepository: FakeCidadesRepository;
let fakeEstadoRepository: FakeEstadoRepository;
let fakeCacheProvider: FakeCacheProvider;
let updateCidade: UpdateCidadeService;

describe('UpdateCidade', () => {
  beforeEach(() => {
    fakeCidadesRepository = new FakeCidadesRepository();
    fakeEstadoRepository = new FakeEstadoRepository();
    fakeCacheProvider = new FakeCacheProvider();
    updateCidade = new UpdateCidadeService(
      fakeCidadesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to update cidade', async () => {
    const estado = await fakeEstadoRepository.create({
      nome: 'Paraná',
      abreviacao: 'PR',
    });
    const cidade = await fakeCidadesRepository.create({
      estadoId: estado.id.toString(),
      nome: 'Paran',
    });

    const updatedCidade = await updateCidade.execute({
      id: cidade.id.toString(),
      estadoId: estado.id.toString(),
      nome: 'Cascavel',
    });

    expect(updatedCidade.nome).toEqual('Cascavel');
    expect(updatedCidade.id).toEqual(cidade.id);
  });

  it("should not be able to update cidade that doesn't exist", async () => {
    await expect(
      updateCidade.execute({
        id: 'fakeid123',
        estadoId: '123',
        nome: 'Cascavel',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update cidade to an already existed in same estado', async () => {
    const cidade = await fakeCidadesRepository.create({
      estadoId: '123',
      nome: 'Cascavel',
    });
    await fakeCidadesRepository.create({
      estadoId: '123',
      nome: 'São Paulo',
    });

    await expect(
      updateCidade.execute({
        id: cidade.id.toString(),
        estadoId: '123',
        nome: 'São Paulo',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
