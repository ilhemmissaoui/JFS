import * as yup from 'yup';

export const updatePassFields = {
  password: '',
  password_confirmer: '',
};

const updatePassSchema = yup.object({
  password: yup
    .string()
    .required('Ce champ est obligatoire!')
    .min(8, 'Le Mot de passe doit contenir au moins 8 caractères')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
      'Le Mot de passe doit contenir au moins une lettre majuscule,un chiffre et des lettres minuscules.'
      // ^: This symbol marks the start of the string.
      // (?=.*?[A-Z]): Positive lookahead assertion. It asserts that the string contains at least one uppercase letter (A-Z).
      // (?=.*?[a-z]): Positive lookahead assertion. It asserts that the string contains at least one lowercase letter (a-z).
      // (?=.*?[0-9]): Positive lookahead assertion. It asserts that the string contains at least one digit (0-9).
      // .{8,}: Matches any character (.) at least 8 or more times ({8,}). This enforces a minimum length of 8 characters.
      // $: This symbol marks the end of the string.

      // A string that contains:
      // At least one uppercase letter (positive lookahead).
      // At least one lowercase letter (positive lookahead).
      // At least one digit (positive lookahead).
      // The length of the string is 8 or more characters.
    )
    .max(80),
  password_confirmer: yup
    .string()
    .required('Ce champ est obligatoire!')
    .min(8, 'Le Mot de passe doit contenir au moins 8 caractères')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
      'Le Mot de passe doit contenir au moins une lettre majuscule,un chiffre et des lettres minuscules.'
      // ^: This symbol marks the start of the string.
      // (?=.*?[A-Z]): Positive lookahead assertion. It asserts that the string contains at least one uppercase letter (A-Z).
      // (?=.*?[a-z]): Positive lookahead assertion. It asserts that the string contains at least one lowercase letter (a-z).
      // (?=.*?[0-9]): Positive lookahead assertion. It asserts that the string contains at least one digit (0-9).
      // .{8,}: Matches any character (.) at least 8 or more times ({8,}). This enforces a minimum length of 8 characters.
      // $: This symbol marks the end of the string.

      // A string that contains:
      // At least one uppercase letter (positive lookahead).
      // At least one lowercase letter (positive lookahead).
      // At least one digit (positive lookahead).
      // The length of the string is 8 or more characters.
    )
    .max(80),
});
export default updatePassSchema;
