import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { injectable, inject } from 'tsyringe';

import IEstadosRepository from '../repositories/IEstadosRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteEstadoService {
  constructor(
    @inject('EstadosRepository')
    private estadosRepository: IEstadosRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    await this.estadosRepository.delete(id);
    this.cacheProvider.invalidate('estados');
  }
}

export default DeleteEstadoService;
