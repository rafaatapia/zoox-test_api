import Cidade from '../infra/typeorm/schemas/Cidade';

import IFindAllCidadesDTO from '../dtos/IFindAllCidadesDTO';
import IFindByNomeCidadeDTO from '../dtos/IFindByNomeCidadeDTO';
import ICreateCidadeDTO from '../dtos/ICreateCidadeDTO';
import IFindByNomeAndEstadoCidadeDTO from '../dtos/IFindByNomeAndEstadoCidadeDTO';

export default interface ICidadesRepository {
  create(data: ICreateCidadeDTO): Promise<Cidade>;
  update(data: Cidade): Promise<Cidade>;
  delete(id: string): Promise<void>;
  findAll(data: IFindAllCidadesDTO): Promise<Cidade[] | undefined>;
  findByNome(data: IFindByNomeCidadeDTO): Promise<Cidade[] | undefined>;
  findByNomeAndEstado(
    data: IFindByNomeAndEstadoCidadeDTO,
  ): Promise<Cidade | undefined>;
  findById(id: string): Promise<Cidade | undefined>;
}
