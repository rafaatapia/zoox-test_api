import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { injectable, inject } from 'tsyringe';

import ICidadesRepository from '../repositories/ICidadesRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteCidadeService {
  constructor(
    @inject('CidadesRepository')
    private cidadesRepository: ICidadesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    await this.cidadesRepository.delete(id);
    this.cacheProvider.invalidate('cidades');
  }
}

export default DeleteCidadeService;
