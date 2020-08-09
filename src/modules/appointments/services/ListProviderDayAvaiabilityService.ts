
import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
    hour: number;
    avaiable: boolean;
}>;

@injectable()
export default class ListProviderDayAvaiabilityService {
  constructor(
      @inject('AppointmentsRepository')
      private appointmentRepository: IAppointmentsRepository,
  ) {}

  public async execute({ provider_id, year, month, day }: Request): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInDayFromProvider({
      provider_id,
      year,
      month,
      day
    });

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());

    const avaiability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        avaiable: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      }
    });

    return avaiability;
  }
}
