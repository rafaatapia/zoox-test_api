import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Cidade from '../infra/typeorm/schemas/Cidade';
import ICidadesRepository from '../repositories/ICidadesRepository';

interface IRequest {
  id?: string;
  orderBy?: string;
  sort?: string;
  nome?: string;
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
    nome,
  }: IRequest): Promise<Cidade[] | Cidade | undefined> {
    const cachedCidades = await this.cacheProvider.recover<Cidade[]>('cidades');

    if (cachedCidades && !id) {
      let cachedFilteredCidades = cachedCidades;
      if (orderBy && sort === 'ASC') {
        cachedFilteredCidades = cachedCidades.sort(
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
      } else if (orderBy && sort === 'DESC') {
        cachedFilteredCidades = cachedCidades.sort(
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

      if (nome) {
        cachedFilteredCidades = cachedFilteredCidades.filter(cidade =>
          cidade.nome.toLowerCase().includes(nome.toLowerCase()),
        );
      }

      return cachedFilteredCidades;
    }

    if (id) {
      return this.cidadesRepository.findById(id);
    }

    if (nome) {
      return this.cidadesRepository.findByNome({ nome, sort, orderBy });
    }

    const cidades = await this.cidadesRepository.findAll({ orderBy, sort });
    await this.cacheProvider.save('cidades', cidades);

    return cidades;
  }
}

export default FindCidadesService;
