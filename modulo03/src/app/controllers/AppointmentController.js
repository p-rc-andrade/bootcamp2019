import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/notification';
import Mail from '../../lib/Mail';

class AppointmentController {
  // [GET] /appointments - Get list of appointments
  async index(req, res) {
    const { page = 1 } = req.query;
    const length = 20;

    const appointments = await Appointment.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
      },
      limit: length,
      offset: (page - 1) * length,
      order: ['date'],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name', 'email', 'password_hash', 'avatar_id'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(appointments);
  }

  // [POST] /appointments - Create new appointment
  async store(req, res) {
    // Validate schema
    const schema = Yup.object().shape({
      provider_id: Yup.number()
        .required()
        .notOneOf([req.userId]),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    // Check if provider_id is a provider
    const checkIsProvider = await User.findOne({
      where: {
        id: provider_id,
        provider: true,
      },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Can only create appointments with providers' });
    }

    // parseISO will analyse the input date e.g. "2019-07-01T18:31:00-00:00"
    // startHour will parse until the hour value and ignore the rest.
    // In this example the result will be "2019-07-01T18:00:00-00:00"
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const checkAvailability = await Appointment.findOne({
      where: {
        id: provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    // Notifify Appointment Provider - Save to MongoDB non-relational DB
    const user = await User.findByPk(req.userId);
    const formattedDate = format(hourStart, "'day' dd MMMM ', at' H:mm'h'", {
      // locale: pt,
    });

    await Notification.create({
      content: `New appointment to ${user.name} at ${formattedDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  // [DELETE] /appointments/:id - Cancel Appointment
  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to cancel this appointment",
      });
    }

    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel appointments 2 hours in advance.',
      });
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Canceled Appointment',
      // text: 'You have a new cancelation',
      template: 'cancelation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(appointment.date, "'day' dd MMMM ', at' H:mm'h'"),
      },
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
