import * as Yup from 'yup';

// [POST] /sessions - Get Access Token
export const getSessionSchemaValidation = async (req, res, next) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation failed' });
  }

  return next();
};

export const signUpUserSchemaValidation = async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .required()
      .min(6),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation fails' });
  }

  return next();
};

export const updateUserSchemaValidation = async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
    password: Yup.string().min(6),
    passwordConfirmation: Yup.string()
      .min(6)
      .when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    oldPassword: Yup.string()
      .min(6)
      .when('password', (password, field) =>
        password ? field.required().notOneOf([Yup.ref('password')]) : field
      ),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation fails' });
  }

  return next();
};
