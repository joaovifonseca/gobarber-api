import "reflect-metadata"

import ListProviderDayAvaiabilityService from './ListProviderDayAvaiabilityService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderDayAvaiabilityService: ListProviderDayAvaiabilityService;

describe('ListProviderDayAvaiabilityService', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderDayAvaiabilityService = new ListProviderDayAvaiabilityService(fakeAppointmentRepository);
  });

  it('should be able to list the day availability from provider', async () => {
    const year = 2020;
    const month = 5;
    const day = 20;

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(year, month, day, 14, 0, 0)
    });

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(year, month, day, 15, 0, 0)
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(year, month, day, 11).getTime();
    });

    const availability = await listProviderDayAvaiabilityService.execute({
      provider_id: 'user',
      year,
      month: month + 1,
      day,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, avaiable: false },
      { hour: 9, avaiable: false },
      { hour: 10, avaiable: false },
      { hour: 13, avaiable: true },
      { hour: 14, avaiable: false },
      { hour: 15, avaiable: false },
      { hour: 16, avaiable: true },
    ]))
  });
});