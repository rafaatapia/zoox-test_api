import Estado from '../infra/typeorm/schemas/Estado';

import ICreateEstadoDTO from '../dtos/ICreateEstadoDTO';
import IFindAllEstadosDTO from '../dtos/IFindAllEstadosDTO';
import IFindByNomeEstadoDTO from '../dtos/IFindByNomeEstadoDTO';
import IFindByAbreviacaoEstadoDTO from '../dtos/IFindByAbreviacaoEstadoDTO';

export default interface IEstadosRepository {
  create(data: ICreateEstadoDTO): Promise<Estado>;
  update(data: Estado): Promise<Estado>;
  delete(id: string): Promise<void>;
  findAll(data: IFindAllEstadosDTO): Promise<Estado[] | undefined>;
  findByNome(data: IFindByNomeEstadoDTO): Promise<Estado[] | undefined>;
  findByAbreviacao(
    data: IFindByAbreviacaoEstadoDTO,
  ): Promise<Estado | undefined>;
  findById(id: string): Promise<Estado | undefined>;
}
