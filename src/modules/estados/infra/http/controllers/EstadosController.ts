import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEstadoService from '@modules/estados/services/CreateEstadoService';
import UpdateEstadoService from '@modules/estados/services/UpdateEstadoService';
import FindEstadosService from '@modules/estados/services/FindEstadosService';
import DeleteEstadoService from '@modules/estados/services/DeleteEstadoService';

export default class EstadosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, abreviacao } = request.body;

    const createEstado = container.resolve(CreateEstadoService);

    const estado = await createEstado.execute({
      nome,
      abreviacao,
    });

    return response.status(201).json(estado);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const sort = request.query.sort as string;
    const orderBy = request.query.orderBy as string;
    const nome = request.query.nome as string;

    const findEstados = container.resolve(FindEstadosService);

    const estados = await findEstados.execute({ id, sort, orderBy, nome });

    return response.json(estados);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { nome, abreviacao } = request.body;

    const updateEstado = container.resolve(UpdateEstadoService);

    const estado = await updateEstado.execute({ id, nome, abreviacao });

    return response.json(estado);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteEstado = container.resolve(DeleteEstadoService);

    await deleteEstado.execute({ id });

    return response.status(204).json();
  }
}
