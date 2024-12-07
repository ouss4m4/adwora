// validateCreateUserRequest
import Joi from 'joi'

export const CreateUserRequestSchema = Joi.object({
  clientId: Joi.string()
    .required()
    .messages({ 'string.empty': 'ClientId is required.' }),
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name is required.',
    'string.min': 'Name must be at least 3 characters long.',
    'string.max': 'Name must be at most 50 characters long.',
    'any.required': 'Name is required.',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string.',
    'string.email': 'Email must be a valid email address.',
    'string.empty': 'Email is required.',
    'any.required': 'Email is required.',
  }),
  phone: Joi.string()
    .pattern(/^[0-9]/)
    .required()
    .min(3),
})

// Validate function
export const validateCreateUserRequest = (data: any) => {
  const validation = CreateUserRequestSchema.validate(data, {
    abortEarly: false,
  })
  if (validation.error) {
    const errorObject = validation.error.details.reduce(
      (acc, err) => {
        acc[err.path.join('.')] = err.message
        return acc
      },
      {} as Record<string, string>
    )
    return { error: true, errors: errorObject }
  }
  return { error: false, errors: null }
}
