import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Estado from '../infra/typeorm/schemas/Estado';
import IEstadosRepository from '../repositories/IEstadosRepository';

interface IRequest {
  nome: string;
  abreviacao: string;
}

@injectable()
class CreateEstadoService {
  constructor(
    @inject('EstadosRepository')
    private estadosRepository: IEstadosRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ nome, abreviacao }: IRequest): Promise<Estado> {
    const estadoAbrExists = await this.estadosRepository.findByAbreviacao({
      abreviacao,
    });
    const estadoExists = await this.estadosRepository.findByNome({ nome });

    if (estadoAbrExists || estadoExists?.length) {
      throw new AppError(
        'Já existe um estado com esse nome ou abreviação.',
        400,
      );
    }

    const estado = this.estadosRepository.create({ abreviacao, nome });

    await this.cacheProvider.invalidate('estados');

    return estado;
  }
}

export default CreateEstadoService;
