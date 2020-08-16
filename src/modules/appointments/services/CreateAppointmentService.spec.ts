import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository';

import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeNotificationRepository: FakeNotificationRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeNotificationRepository = new FakeNotificationRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationRepository,
      fakeCacheProvider
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    })

    const id = '21321321321';

    const appointment = await createAppointment.execute({
      user_id: 'user',
      date: new Date(2020, 4, 10, 13),
      provider_id: id,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toMatch(id);
  });

  it('should not be able to create two appointments on the same date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 9).getTime();
    })

    const id = '21321321321';
    const date = new Date(2020, 7, 10, 11);

    await createAppointment.execute({
      user_id: 'user',
      date,
      provider_id: id,
    });

    await expect(
      createAppointment.execute({
        user_id: 'user',
        date,
        provider_id: id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    })

    await expect(
      createAppointment.execute({
        user_id: 'user',
        date: new Date(2020, 4, 10, 11),
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    })

    const id = '21321321321';

    await expect(createAppointment.execute({
      user_id: 'user',
      date: new Date(2020, 4, 10, 13),
      provider_id: 'user',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment outside the work hours', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    })

    await expect(createAppointment.execute({
      user_id: 'user',
      date: new Date(2020, 4, 10, 7),
      provider_id: 'provider',
    })).rejects.toBeInstanceOf(AppError);

    await expect(createAppointment.execute({
      user_id: 'user',
      date: new Date(2020, 4, 10, 18),
      provider_id: 'provider',
    })).rejects.toBeInstanceOf(AppError);
  });
});
