import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { injectable, inject } from 'tsyringe';

import Cidade from '../infra/typeorm/schemas/Cidade';
import ICidadesRepository from '../repositories/ICidadesRepository';

interface IRequest {
  id?: string;
  orderBy?: string;
  sort?: string;
}

@injectable()
class FindCidadesService {
  constructor(
    @inject('CidadesRepository')
    private cidadesRepository: ICidadesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    orderBy,
    sort,
  }: IRequest): Promise<Cidade[] | Cidade | undefined> {
    const cachedCidades = await this.cacheProvider.recover<Cidade[]>('cidades');

    if (cachedCidades && !id && !orderBy) {
      return cachedCidades;
    }

    if (id) {
      return this.cidadesRepository.findById(id);
    }

    const cidades = await this.cidadesRepository.findAll({ orderBy, sort });
    await this.cacheProvider.save('cidades', cidades);

    return cidades;
  }
}

export default FindCidadesService;
