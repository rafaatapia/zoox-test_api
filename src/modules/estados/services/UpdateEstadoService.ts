import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Estado from '../infra/typeorm/schemas/Estado';
import IEstadosRepository from '../repositories/IEstadosRepository';

interface IRequest {
  id: string;
  nome: string;
  abreviacao: string;
}

@injectable()
class UpdateEstadoService {
  constructor(
    @inject('EstadosRepository')
    private estadosRepository: IEstadosRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id, nome, abreviacao }: IRequest): Promise<Estado> {
    const estado = await this.estadosRepository.findById(id);

    if (!estado) {
      throw new AppError('Estado não existe.', 400);
    }

    const abreviacaoExists = await this.estadosRepository.findByAbreviacao({
      abreviacao,
    });

    if (abreviacaoExists) {
      throw new AppError('Abreviação já está em uso.', 400);
    }

    estado.nome = nome;
    estado.abreviacao = abreviacao;

    this.estadosRepository.update(estado);

    await this.cacheProvider.invalidate('estados');

    return estado;
  }
}

export default UpdateEstadoService;
