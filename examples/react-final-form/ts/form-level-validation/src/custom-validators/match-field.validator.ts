import { FieldValidationFunctionSync } from '@lemoncode/form-validation';

interface MatchFieldArgs {
  fieldId: string;
}

export const matchFieldValidator: FieldValidationFunctionSync<
  MatchFieldArgs
> = ({ value, values, customArgs }) => {
  const succeeded = value === values[customArgs.fieldId];
  return {
    succeeded,
    message: succeeded ? '' : 'Must match',
    type: 'MATCH_FIELD',
  };
};
