import "reflect-metadata"

import ListProviderAppointmentsSevice from './ListProviderAppointmentsSevice';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderAppointmentsSevice: ListProviderAppointmentsSevice;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointmentsSevice', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointmentsSevice = new ListProviderAppointmentsSevice(fakeAppointmentRepository, fakeCacheProvider);
  });

  it('should be able to list the appointments on a specific day', async () => {
    const year = 2020;
    const month = 5;
    const day = 20;

    const appointment1 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(year, month, day, 14, 0, 0)
    });

    const appointment2 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(year, month, day, 15, 0, 0)
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(year, month, day, 11).getTime();
    });

    const appointments = await listProviderAppointmentsSevice.execute({
      provider_id: 'provider',
      year,
      month: month + 1,
      day,
    });

    expect(appointments).toEqual([ appointment1, appointment2 ]);
  });
});