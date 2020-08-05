import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository
    );
  });
  it('should be able to create a new appointment', async () => {
    const id = '21321321321';

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: id,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toMatch(id);
  });

  it('should not be able to create two appointments on the same date', async () => {
    const id = '21321321321';
    const date = new Date(2020, 7, 10, 11);

    await createAppointment.execute({
      date,
      provider_id: id,
    });

    await expect(
      createAppointment.execute({
        date,
        provider_id: id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
