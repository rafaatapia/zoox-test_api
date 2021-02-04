import 'reflect-metadata';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FindEstadosService from './FindEstadosService';
import FakeEstadosRepository from '../repositories/fakes/FakeEstadosRepository';

let fakeEstadosRepository: FakeEstadosRepository;
let fakeCacheProvider: FakeCacheProvider;
let findEstados: FindEstadosService;

describe('ListEstados', () => {
  beforeEach(() => {
    fakeEstadosRepository = new FakeEstadosRepository();
    fakeCacheProvider = new FakeCacheProvider();
    findEstados = new FindEstadosService(
      fakeEstadosRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all estados', async () => {
    const estado1 = await fakeEstadosRepository.create({
      nome: 'Paraná',
      abreviacao: 'PR',
    });
    const estado2 = await fakeEstadosRepository.create({
      nome: 'São Paulo',
      abreviacao: 'SP',
    });

    const orders = await findEstados.execute({});

    expect(orders).toEqual([estado1, estado2]);
  });

  it('should be able to list an estado by id', async () => {
    const estado = await fakeEstadosRepository.create({
      nome: 'Paraná',
      abreviacao: 'PR',
    });

    const order = await findEstados.execute({ id: estado.id.toString() });

    expect(order).toEqual(estado);
  });
});
