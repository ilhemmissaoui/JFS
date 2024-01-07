import * as yup from 'yup';

export const resetPassFields = {
  email: '',
};

const resetPassSchema = yup.object({
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
});
export default resetPassSchema;
