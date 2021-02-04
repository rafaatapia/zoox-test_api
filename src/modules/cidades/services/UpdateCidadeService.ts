import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import { ObjectId } from 'mongodb';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Cidade from '../infra/typeorm/schemas/Cidade';
import ICidadesRepository from '../repositories/ICidadesRepository';

interface IRequest {
  id: string;
  nome: string;
  estadoId: string;
}

@injectable()
class UpdateCidadeService {
  constructor(
    @inject('CidadesRepository')
    private cidadesRepository: ICidadesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id, nome, estadoId }: IRequest): Promise<Cidade> {
    const cidade = await this.cidadesRepository.findById(id);

    if (!cidade) {
      throw new AppError('Cidade não existe.', 400);
    }

    const cidadeNameExists = await this.cidadesRepository.findByNomeAndEstado({
      nome,
      estadoId,
    });

    if (cidadeNameExists) {
      throw new AppError(
        'Já existe uma cidade com esse nome nesse estado.',
        400,
      );
    }

    cidade.nome = nome;
    cidade.estadoId = new ObjectId(estadoId);

    this.cidadesRepository.update(cidade);

    await this.cacheProvider.invalidate('cidades');

    return cidade;
  }
}

export default UpdateCidadeService;
