import 'reflect-metadata';

import ListProviderMonthAvaliabilityService from './ListProviderMonthAvaliabilityService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderMonthAvaliability: ListProviderMonthAvaliabilityService;

describe('ListProviderMonthAvaliability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderMonthAvaliability = new ListProviderMonthAvaliabilityService(fakeAppointmentRepository);
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0)
    });

    await fakeAppointmentRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 9, 0, 0)
    });

    await fakeAppointmentRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0)
    });

    await fakeAppointmentRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 11, 0, 0)
    });

    await fakeAppointmentRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 12, 0, 0)
    });

    await fakeAppointmentRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 13, 0, 0)
    });

    await fakeAppointmentRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0)
    });

    await fakeAppointmentRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0)
    });

    await fakeAppointmentRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 16, 0, 0)
    });

    await fakeAppointmentRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 17, 0, 0)
    });

    const availability = await listProviderMonthAvaliability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { day: 19, avaiable: true },
      { day: 20, avaiable: false },
      { day: 21, avaiable: true },
      { day: 21, avaiable: true },
    ]))
  });
});