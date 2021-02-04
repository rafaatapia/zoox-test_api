import { ObjectID } from 'mongodb';
import AppError from '@shared/errors/AppError';

import ICreateEstadoDTO from '@modules/estados/dtos/ICreateEstadoDTO';
import IFindByAbreviacaoEstadoDTO from '@modules/estados/dtos/IFindByAbreviacaoEstadoDTO';
import IFindByNomeEstadoDTO from '@modules/estados/dtos/IFindByNomeEstadoDTO';

import Estado from '../../infra/typeorm/schemas/Estado';
import IEstadosRepository from '../IEstadosRepository';

class EstadosRepository implements IEstadosRepository {
  private estados: Estado[] = [];

  public async create({ nome, abreviacao }: ICreateEstadoDTO): Promise<Estado> {
    const estado = new Estado();

    Object.assign(estado, {
      id: new ObjectID(),
      nome,
      abreviacao: abreviacao.toUpperCase(),
    });

    this.estados.push(estado);

    return estado;
  }

  public async update(estado: Estado): Promise<Estado> {
    const indexEstado = this.estados.findIndex(
      currentEstado => currentEstado.id === estado.id,
    );

    if (indexEstado < 0) {
      throw new AppError('Estado não encontrado', 400);
    }

    this.estados[indexEstado] = estado;

    return estado;
  }

  public async delete(id: string): Promise<void> {
    const indexEstado = this.estados.findIndex(
      currentEstado => currentEstado.id.toString() === id,
    );

    if (indexEstado < 0) {
      throw new AppError('Estado não encontrado', 400);
    }

    this.estados.splice(indexEstado, 1);
  }

  public async findAll(): Promise<Estado[] | undefined> {
    return this.estados;
  }

  public async findByNome({
    nome,
  }: IFindByNomeEstadoDTO): Promise<Estado[] | undefined> {
    return this.estados.filter(estado =>
      estado.nome.toLowerCase().includes(nome.toLowerCase()),
    );
  }

  public async findByAbreviacao({
    abreviacao,
  }: IFindByAbreviacaoEstadoDTO): Promise<Estado | undefined> {
    return this.estados.find(
      estado => estado.abreviacao === abreviacao.toUpperCase(),
    );
  }

  public async findById(id: string): Promise<Estado | undefined> {
    return this.estados.find(estado => estado.id.toString() === id);
  }
}

export default EstadosRepository;
