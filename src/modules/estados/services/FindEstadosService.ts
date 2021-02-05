import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { injectable, inject } from 'tsyringe';

import Estado from '../infra/typeorm/schemas/Estado';
import IEstadosRepository from '../repositories/IEstadosRepository';

interface IRequest {
  id?: string;
  orderBy?: string;
  sort?: string;
  nome?: string;
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
    nome,
  }: IRequest): Promise<Estado[] | Estado | undefined> {
    const cachedEstados = await this.cacheProvider.recover<Estado[]>('estados');

    if (cachedEstados && !id) {
      let cachedFilteredEstados = cachedEstados;
      if (orderBy && sort === 'ASC') {
        cachedFilteredEstados = cachedEstados.sort(
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
        cachedFilteredEstados = cachedEstados.sort(
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
        cachedFilteredEstados = cachedFilteredEstados.filter(estado =>
          estado.nome.toLowerCase().includes(nome.toLowerCase()),
        );
      }

      return cachedFilteredEstados;
    }

    if (id) {
      return this.estadosRepository.findById(id);
    }

    if (nome) {
      return this.estadosRepository.findByNome({ nome, orderBy, sort });
    }

    const estados = await this.estadosRepository.findAll({ orderBy, sort });

    this.cacheProvider.save('estados', estados);

    return estados;
  }
}

export default FindEstadosService;
