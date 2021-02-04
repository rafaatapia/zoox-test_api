import { getMongoRepository, MongoRepository, Like, ObjectID } from 'typeorm';

import ICidadesRepository from '@modules/cidades/repositories/ICidadesRepository';
import ICreateCidadeDTO from '@modules/cidades/dtos/ICreateCidadeDTO';
import IFindAllCidadesDTO from '@modules/cidades/dtos/IFindAllCidadesDTO';
import IFindByNomeAndEstadoCidadeDTO from '@modules/cidades/dtos/IFindByNomeAndEstadoCidadeDTO';
import IFindByNomeCidadeDTO from '@modules/cidades/dtos/IFindByNomeCidadeDTO';
import Estado from '@modules/estados/infra/typeorm/schemas/Estado';
import Cidade from '../schemas/Cidade';

class CidadesRepository implements ICidadesRepository {
  private ormRepository: MongoRepository<Cidade>;

  private estadoRepository: MongoRepository<Estado>;

  constructor() {
    this.ormRepository = getMongoRepository(Cidade);
    this.estadoRepository = getMongoRepository(Estado);
  }

  public async create({ nome, estadoId }: ICreateCidadeDTO): Promise<Cidade> {
    const cidade = this.ormRepository.create({
      estadoId,
      nome,
    });

    await this.ormRepository.save(cidade);

    return cidade;
  }

  public async update(data: Cidade): Promise<Cidade> {
    return this.ormRepository.save(data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findAll({
    orderBy,
    sort = 'ASC',
  }: IFindAllCidadesDTO): Promise<Cidade[] | undefined> {
    const estados = await this.estadoRepository.find();

    const hashEstados = estados.reduce((map, obj) => {
      map[obj.id.toString()] = obj;
      return map;
    }, {});

    let cidadesList;

    if (orderBy) {
      cidadesList = await this.ormRepository.find({
        order: { [orderBy]: sort },
      });
    } else {
      cidadesList = await this.ormRepository.find({
        order: { nome: 'ASC' },
      });
    }

    return cidadesList.map(cidade => {
      return {
        ...cidade,
        estado: hashEstados[cidade.estadoId],
      };
    });
  }

  public async findByNome({
    nome,
    orderBy,
    sort = 'ASC',
  }: IFindByNomeCidadeDTO): Promise<Cidade[] | undefined> {
    if (orderBy) {
      return this.ormRepository.find({
        where: { nome: Like(nome) },
        order: { [orderBy]: sort },
      });
    }
    return this.ormRepository.find({
      where: { nome: Like(nome) },
      order: { nome: 'ASC' },
    });
  }

  public async findByNomeAndEstado({
    nome,
    estadoId,
  }: IFindByNomeAndEstadoCidadeDTO): Promise<Cidade | undefined> {
    return this.ormRepository.findOne({
      where: { nome, estadoId },
      order: { nome: 'ASC' },
    });
  }

  public async findById(id: string): Promise<Cidade | undefined> {
    const cidade = await this.ormRepository.findOne(id);

    if (cidade) {
      const estado = await this.estadoRepository.findOne(
        (cidade.estadoId as ObjectID).toString(),
      );
      cidade.estado = estado as Estado;
    }

    return cidade;
  }
}

export default CidadesRepository;
