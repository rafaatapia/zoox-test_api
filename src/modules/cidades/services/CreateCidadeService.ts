import IEstadosRepository from '@modules/estados/repositories/IEstadosRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Cidade from '../infra/typeorm/schemas/Cidade';
import ICidadesRepository from '../repositories/ICidadesRepository';

interface IRequest {
  nome: string;
  estadoId: string;
}

@injectable()
class CreateCidadeService {
  constructor(
    @inject('CidadesRepository')
    private cidadesRepository: ICidadesRepository,

    @inject('EstadosRepository')
    private estadosRepository: IEstadosRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ nome, estadoId }: IRequest): Promise<Cidade> {
    const cidadeExists = await this.cidadesRepository.findByNomeAndEstado({
      nome,
      estadoId,
    });

    if (cidadeExists) {
      throw new AppError(
        'Já existe uma cidade com esse nome nesse estado.',
        400,
      );
    }

    const estadoExists = await this.estadosRepository.findById(estadoId);

    if (!estadoExists) {
      throw new AppError('Estado não encontrado.', 400);
    }

    const cidade = this.cidadesRepository.create({ nome, estadoId });

    await this.cacheProvider.invalidate('cidades');

    return cidade;
  }
}

export default CreateCidadeService;
