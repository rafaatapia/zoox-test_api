import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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

    if (cachedCidades && !id) {
      if (orderBy && sort === 'ASC') {
        return cachedCidades.sort(
          (a: Record<string, any>, b: Record<string, any>) => {
            if (a[orderBy] > b[orderBy]) {
              return 1;
            }
            if (b[orderBy] > a[orderBy]) {
              return -1;
            }
            return 0;
          },
        );
      }
      if (orderBy && sort === 'DESC') {
        return cachedCidades.sort(
          (a: Record<string, any>, b: Record<string, any>) => {
            if (a[orderBy] < b[orderBy]) {
              return 1;
            }
            if (b[orderBy] < a[orderBy]) {
              return -1;
            }
            return 0;
          },
        );
      }
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
