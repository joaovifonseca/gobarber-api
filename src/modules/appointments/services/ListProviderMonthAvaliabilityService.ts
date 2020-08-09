
import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  avaiable: boolean;
}>;

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,
  ) { }

  public async execute({ provider_id, year, month }: Request): Promise<IResponse> {

    const appointments = await this.appointmentRepository.findAllInMonthFromProvider({
      provider_id,
      year,
      month,
    });

    const numbeOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numbeOfDaysInMonth },
      (_, index) => index + 1,
    );

    const avaiability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        avaiable: appointmentsInDay.length < 10,
      };
    });

    return avaiability;
  }
}
