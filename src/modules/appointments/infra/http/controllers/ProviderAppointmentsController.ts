/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import ListProviderAppointmentsSevice from '@modules/appointments/services/ListProviderAppointmentsSevice';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const listProviderAppointmentsSevice = container.resolve(
        ListProviderAppointmentsSevice,
    );

    const appointments = await listProviderAppointmentsSevice.execute({
      provider_id,
      day,
      month,
      year
    });

    return response.json(appointments);
  }
}
