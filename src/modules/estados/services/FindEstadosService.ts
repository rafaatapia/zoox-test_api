import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { injectable, inject } from 'tsyringe';

import Estado from '../infra/typeorm/schemas/Estado';
import IEstadosRepository from '../repositories/IEstadosRepository';

interface IRequest {
  id?: string;
  orderBy?: string;
  sort?: string;
}

@injectable()
class FindEstadosService {
  constructor(
    @inject('EstadosRepository')
    private estadosRepository: IEstadosRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    orderBy,
    sort,
  }: IRequest): Promise<Estado[] | Estado | undefined> {
    const cachedEstados = await this.cacheProvider.recover<Estado[]>('estados');

    if (cachedEstados && !id && !orderBy) {
      return cachedEstados;
    }

    if (id) {
      return this.estadosRepository.findById(id);
    }

    const estados = await this.estadosRepository.findAll({ orderBy, sort });

    this.cacheProvider.save('estados', estados);

    return estados;
  }
}

export default FindEstadosService;
