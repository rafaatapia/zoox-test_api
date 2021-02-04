import { ObjectID } from 'mongodb';

import ICreateCidadeDTO from '@modules/cidades/dtos/ICreateCidadeDTO';
import IFindByNomeCidadeDTO from '@modules/cidades/dtos/IFindByNomeCidadeDTO';

import AppError from '@shared/errors/AppError';
import IFindByNomeAndEstadoCidadeDTO from '@modules/cidades/dtos/IFindByNomeAndEstadoCidadeDTO';
import Cidade from '../../infra/typeorm/schemas/Cidade';
import ICidadesRepository from '../ICidadesRepository';

class CidadesRepository implements ICidadesRepository {
  private cidades: Cidade[] = [];

  public async create({ nome, estadoId }: ICreateCidadeDTO): Promise<Cidade> {
    const cidade = new Cidade();

    Object.assign(cidade, { id: new ObjectID(), nome, estadoId });

    this.cidades.push(cidade);

    return cidade;
  }

  public async update(cidade: Cidade): Promise<Cidade> {
    const indexCidade = this.cidades.findIndex(
      currentCidade => currentCidade.id === cidade.id,
    );

    if (indexCidade < 0) {
      throw new AppError('Cidade não encontrado', 400);
    }

    this.cidades[indexCidade] = cidade;

    return cidade;
  }

  public async delete(id: string): Promise<void> {
    const indexCidade = this.cidades.findIndex(
      currentCidade => currentCidade.id.toString() === id,
    );

    if (indexCidade < 0) {
      throw new AppError('Cidade não encontrada', 400);
    }

    this.cidades.splice(indexCidade, 1);
  }

  public async findAll(): Promise<Cidade[] | undefined> {
    return this.cidades;
  }

  public async findByNome({
    nome,
  }: IFindByNomeCidadeDTO): Promise<Cidade[] | undefined> {
    return this.cidades.filter(cidade =>
      cidade.nome.toLowerCase().includes(nome.toLowerCase()),
    );
  }

  public async findByNomeAndEstado({
    estadoId,
    nome,
  }: IFindByNomeAndEstadoCidadeDTO): Promise<Cidade | undefined> {
    return this.cidades.find(
      cidade =>
        cidade.nome.toLowerCase().includes(nome.toLowerCase()) &&
        cidade.estadoId.toString() === estadoId,
    );
  }

  public async findById(id: string): Promise<Cidade | undefined> {
    return this.cidades.find(cidade => cidade.id.toString() === id);
  }
}

export default CidadesRepository;
