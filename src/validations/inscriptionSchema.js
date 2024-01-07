import * as yup from 'yup';

export const inscriptionFields = {
  name: '',
  email: '',
  password: '',
  status: '',
  siret: '',
  cfa_responsable: '',
  cfa_entreprise: '',
  cfa: '',
  commune: '',
  zip_code: '',
  adresse_cfa_responsable: '',
};

const inscriptionSchema = yup.object({
  name: yup.string().required('Ce champ est obligatoire!').max(80),
  cfa_responsable: yup.string().required('Ce champ est obligatoire!').max(80),
  status: yup
    .string('Ce champ est obligatoire!')
    .required('Ce champ est obligatoire!')
    .max(80),
  cfa_responsable: yup.string().required('Ce champ est obligatoire!').max(80),
  adresse_cfa_responsable: yup
    .string()
    .required('Ce champ est obligatoire!')
    .max(80),
  commune: yup.string().required('Ce champ est obligatoire!').max(80),
  cfa_entreprise: yup
    .string('Ce champ est obligatoire!')
    .required('Ce champ est obligatoire!')
    .max(80),
  email: yup
    .string()
    .required('Ce champ est obligatoire!')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Veuillez saisir une adresse e-mail valide'
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
    )
    .max(80),
  cfa: yup
    .string()
    .required('Ce champ est obligatoire!')
    .matches(
      /^\d{8}[A-Z]$/,
      'Unité Administrative Immatriculée du CFA ex:12345678A'
    ),
  siret: yup
    .string()
    .required('Ce champ est obligatoire!')
    .matches(
      /^\d{9,14}$/,
      'SIRET du CFA,est un numéro comprenant entre 9 et 14 chiffres.'
    ),
  zip_code: yup
    .string()
    .required('Ce champ est obligatoire!')
    .matches(
      /^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/,
      'Veuillez saisir un code postal valide'
      //  ^: This symbol marks the start of the string.
      // (F-)?: This part is optional and matches the literal string "F-" if present. The ? makes the preceding group optional.
      // ((2[A|B])|[0-9]{2}): This part matches either of two alternatives:
      // (2[A|B]): This matches the pattern "2A" or "2B".
      // [0-9]{2}: This matches any two digits.
      // [0-9]{3}: This part matches any three digits.
      // $: This symbol marks the end of the string.

      // It can start with an optional "F-" (F-).
      // Followed by either "2A" or "2B", or two digits (00 to 99).
      // Followed by any three digits (000 to 999).
    ),
});
export default inscriptionSchema;
