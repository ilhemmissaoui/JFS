import * as yup from 'yup';

export const membreFields = {
  name: '',
  last_name: '',
  email: '',
  role: '',
  classe_id: '',
  promotion_id: '',
  phone_number: '',
  color: '',
};

const membreSchema = yup.object({
  name: yup.string().required('Ce champ est obligatoire!').max(80),
  last_name: yup.string().required('Ce champ est obligatoire!').max(80),
  email: yup
    .string()
    .required('Ce champ est obligatoire!')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Veuillez saisir une adresse e-mail valide'
    )
    .max(80),
  role: yup.string().required('Ce champ est obligatoire!').max(80),
  phone_number: yup
    .string()
    .max(15)
    .notRequired()
    .test(
      'is-valid-phone',
      'Veuillez saisir un numéro de téléphone valide.',
      (value) => {
        if (!value) {
          return true;
        }
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

        return phoneRegex.test(value);
      }
    ),
});
export default membreSchema;
