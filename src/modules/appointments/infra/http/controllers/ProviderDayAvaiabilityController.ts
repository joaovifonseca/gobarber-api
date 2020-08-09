/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvaliabilityService from '@modules/appointments/services/ListProviderDayAvaiabilityService';

export default class ProviderDayAvaiabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listProviderDayAvaliabilityService = container.resolve(
      ListProviderDayAvaliabilityService,
    );

    const providers = await listProviderDayAvaliabilityService.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(providers);
  }
}
