import {
  Validators,
  createFormValidation,
  ValidationSchema,
} from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
  field: {
    'product.name': [Validators.required.validator],
  },
};

const formValidation = createFormValidation(validationSchema);

export const getResults = () => {
  const formValues = {
    product: {
      id: 0,
      name: '',
    },
  };

  return formValidation.validateField('product.name', formValues.product.name);
};
