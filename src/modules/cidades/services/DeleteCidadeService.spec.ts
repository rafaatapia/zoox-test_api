import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import DeleteCidadeService from './DeleteCidadeService';
import FakeCidadesRepository from '../repositories/fakes/FakeCidadesRepository';

let fakeCidadesRepository: FakeCidadesRepository;
let fakeCacheProvider: FakeCacheProvider;
let deleteCidade: DeleteCidadeService;

describe('DeleteCidade', () => {
  beforeEach(() => {
    fakeCidadesRepository = new FakeCidadesRepository();
    fakeCacheProvider = new FakeCacheProvider();
    deleteCidade = new DeleteCidadeService(
      fakeCidadesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to delete cidade', async () => {
    const cidade = await fakeCidadesRepository.create({
      estadoId: '123',
      nome: 'Cascavel',
    });

    await deleteCidade.execute({
      id: cidade.id.toString(),
    });

    const cidades = await fakeCidadesRepository.findAll();

    expect(cidades).toEqual([]);
  });

  it('should not be able to delete a non-existing cidade', async () => {
    await expect(
      deleteCidade.execute({
        id: 'fakeid123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
