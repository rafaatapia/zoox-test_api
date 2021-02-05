import { getMongoRepository, MongoRepository, Like } from 'typeorm';

import IEstadosRepository from '@modules/estados/repositories/IEstadosRepository';
import ICreateEstadoDTO from '@modules/estados/dtos/ICreateEstadoDTO';
import IFindAllEstadosDTO from '@modules/estados/dtos/IFindAllEstadosDTO';
import IFindByAbreviacaoEstadoDTO from '@modules/estados/dtos/IFindByAbreviacaoEstadoDTO';
import IFindByNomeEstadoDTO from '@modules/estados/dtos/IFindByNomeEstadoDTO';
import Estado from '../schemas/Estado';

class EstadosRepository implements IEstadosRepository {
  private ormRepository: MongoRepository<Estado>;

  constructor() {
    this.ormRepository = getMongoRepository(Estado);
  }

  public async create({ abreviacao, nome }: ICreateEstadoDTO): Promise<Estado> {
    const estado = this.ormRepository.create({
      abreviacao: abreviacao.toUpperCase(),
      nome,
    });

    await this.ormRepository.save(estado);

    return estado;
  }

  public async update(data: Estado): Promise<Estado> {
    return this.ormRepository.save(data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findAll({
    orderBy = 'nome',
    sort = 'ASC',
  }: IFindAllEstadosDTO): Promise<Estado[] | undefined> {
    return this.ormRepository.find({ order: { [orderBy]: sort } });
  }

  public async findByNome({
    orderBy = 'nome',
    sort = 'ASC',
    nome,
  }: IFindByNomeEstadoDTO): Promise<Estado[] | undefined> {
    return this.ormRepository.find({
      where: { nome: Like(nome) },
      order: { [orderBy]: sort },
    });
  }

  public async findByAbreviacao({
    abreviacao,
    sort = 'ASC',
    orderBy,
  }: IFindByAbreviacaoEstadoDTO): Promise<Estado | undefined> {
    if (orderBy) {
      return this.ormRepository.findOne({
        where: { abreviacao: abreviacao.toUpperCase() },
        order: { [orderBy]: sort },
      });
    }
    return this.ormRepository.findOne({
      where: { abreviacao: abreviacao.toUpperCase() },
    });
  }

  public async findById(id: string): Promise<Estado | undefined> {
    return this.ormRepository.findOne(id);
  }
}

export default EstadosRepository;
