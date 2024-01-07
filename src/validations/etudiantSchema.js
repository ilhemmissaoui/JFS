import * as yup from 'yup';

export const etudiantFields = {
  civilite: '',
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  securite: '',
  code: '',
  civilite: '',
  promotion: '',
  classe: '',
  status: '',
  contrat: '',
};
const etudiantSchema = yup.object({
  civilite: yup.string().required('Ce champ est obligatoire!'),
  promotion: yup.string().required('Ce champ est obligatoire!'),
  classe: yup.string().required('Ce champ est obligatoire!'),
  status: yup.string().required('Ce champ est obligatoire!'),
  contrat: yup.string().required('Ce champ est obligatoire!'),
  ville: yup.string().notRequired(),
  nom: yup
    .string()
    .required('Ce champ est obligatoire!')
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]*$/u,
      'Veuillez saisir un Nom valide. Ce champ doit contenir uniquement des lettres et des espaces.'
    )
    .max(80),
  prenom: yup
    .string()
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]*$/u,
      'Veuillez saisir un Prénom valide. Ce champ doit contenir uniquement des lettres et des espaces.'
    )
    .max(80)
    .notRequired(),
  email: yup
    .string()
    .required('Ce champ est obligatoire!')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Veuillez saisir une adresse Email valide.'
    )
    .max(80),
  telephone: yup
    .string()
    .max(15)
    .notRequired()
    .test(
      'is-valid-phone',
      'Veuillez saisir un numéro de téléphone valide.',
      (value) => {
        if (!value) {
          // Allow empty value
          return true;
        }
        // Explanation for the phone number regex:
        // The phone number must start with the country code (optional),
        // followed by the area code (optional), and then the local number.
        // The country code can be +33 or 0.
        // The area code should start with a digit between 1 and 9.
        // The local number consists of two-digit blocks separated by dashes, spaces, or dots.
        // The local number should have a total of 9 digits.

        // Regular expression for a valid French phone number
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

        return phoneRegex.test(value);
      }
    ),
  securite: yup
    .string()
    .max(15)
    .notRequired()
    .test(
      'is-valid-securite',
      'Veuillez saisir un numéro de sécurité sociale valide.',
      (value) => {
        if (!value) {
          // Allow empty value
          return true;
        }
        // Explanation for the social security number regex:
        // The social security number must start with either 1 or 2, followed by two digits (birth year).
        // Then, it should have two more digits for the month of birth.
        // Next, two digits for the department code (01 to 95 or 2A/2B).
        // The last 9 digits are the identification number.
        // Regular expression for a valid French social security number format
        const securiteRegex = /^(?:[12]\d|3[0-7])\d{9}$/;

        return securiteRegex.test(value);
      }
    ),
  code: yup
    .string()
    // The postal code must contain 5 digits while following the rules below
    // The postal code can start with an optional string "F-" (for international French postal codes): (^(F-)?)
    // The department can be either 2A, 2B, or a two-digit number between 01 and 95: ((2[A|B])|[0-9]{2})
    // The remaining three digits of the postal code: [0-9]{3}
    .matches(
      /^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/,
      'Veuillez saisir un code postal valide.'
    ),
});

export default etudiantSchema;
