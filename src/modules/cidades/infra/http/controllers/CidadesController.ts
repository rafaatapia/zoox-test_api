import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCidadeService from '@modules/cidades/services/CreateCidadeService';
import UpdateCidadeService from '@modules/cidades/services/UpdateCidadeService';
import FindCidadesService from '@modules/cidades/services/FindCidadesService';
import DeleteCidadeService from '@modules/cidades/services/DeleteCidadeService';

export default class CidadesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, estadoId } = request.body;

    const createCidade = container.resolve(CreateCidadeService);

    const cidade = await createCidade.execute({
      nome,
      estadoId,
    });

    return response.status(201).json(cidade);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const sort = request.query.sort as string;
    const orderBy = request.query.orderBy as string;

    const findCidades = container.resolve(FindCidadesService);

    const cidades = await findCidades.execute({ id, sort, orderBy });

    return response.json(classToClass(cidades));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { nome, estadoId } = request.body;

    const updateCidade = container.resolve(UpdateCidadeService);

    const cidade = await updateCidade.execute({ id, nome, estadoId });

    return response.json(classToClass(cidade));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCidade = container.resolve(DeleteCidadeService);

    await deleteCidade.execute({ id });

    return response.status(204).json();
  }
}
