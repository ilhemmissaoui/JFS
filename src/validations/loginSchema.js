import * as yup from 'yup';

let email = '';
try {
  email = JSON.parse(localStorage.getItem('email')) || '';
} catch (error) {}

export const loginFields = {
  email: email ? email : '',
  password: '',
};
const loginSchema = yup.object({
  email: yup
    .string()
    .required('Ce champ est obligatoire!')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Veuillez saisir une adresse e-mail valide'
      // ^: This symbol marks the start of the string.
      // [^\s@]+: This part matches one or more characters that are not whitespace characters (\s) or the "@" symbol. This corresponds to the username part of the email address.
      // @: This matches the "@" symbol.
      // [^\s@]+: This again matches one or more characters that are not whitespace characters or the "@" symbol. This corresponds to the domain name part of the email address.
      // \.: This matches a literal period (dot), used to separate the domain name from the top-level domain.
      // [^\s@]+: This once more matches one or more characters that are not whitespace characters or the "@" symbol. This corresponds to the top-level domain part of the email address.
      // $: This symbol marks the end of the string.

      // A string that contains:
      // A sequence of characters that are not whitespace or "@" (username).
      // Followed by the "@" symbol.
      // Another sequence of characters that are not whitespace or "@" (domain name).
      // Followed by a literal period (dot).
      // Yet another sequence of characters that are not whitespace or "@" (top-level domain).
    )
    .max(80),
  password: yup
    .string()
    .required('Ce champ est obligatoire!')
    .min(
      8,
      'Le Mot de passe doit contenir au moins 8 caractères,une lettre majuscule,un chiffre et des lettres minuscules'
    )
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
export default loginSchema;
