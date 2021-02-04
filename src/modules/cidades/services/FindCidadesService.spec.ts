import 'reflect-metadata';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FindCidadesService from './FindCidadesService';
import FakeCidadesRepository from '../repositories/fakes/FakeCidadesRepository';

let fakeCidadesRepository: FakeCidadesRepository;
let fakeCacheProvider: FakeCacheProvider;
let findCidades: FindCidadesService;

describe('ListCidades', () => {
  beforeEach(() => {
    fakeCidadesRepository = new FakeCidadesRepository();
    fakeCacheProvider = new FakeCacheProvider();
    findCidades = new FindCidadesService(
      fakeCidadesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all cidades', async () => {
    const cidade1 = await fakeCidadesRepository.create({
      nome: 'Cascavel',
      estadoId: '123',
    });
    const cidade2 = await fakeCidadesRepository.create({
      nome: 'Foz do Iguaçu',
      estadoId: '123',
    });

    const cidades = await findCidades.execute({});

    expect(cidades).toEqual([cidade1, cidade2]);
  });

  it('should be able to list a cidade by id', async () => {
    const cidade = await fakeCidadesRepository.create({
      nome: 'Paraná',
      estadoId: '123',
    });

    const findCidade = await findCidades.execute({ id: cidade.id.toString() });

    expect(findCidade).toEqual(cidade);
  });
});
