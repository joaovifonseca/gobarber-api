
import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface Request {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
export default class ListProviderAppointmentsSevice {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,
  ) { }

  public async execute({ provider_id, year, month, day }: Request): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.findAllInDayFromProvider({
        provider_id, year, month, day
    });

    return appointments;
  }
}
