import * as yup from 'yup';

export const roleFields = {
  role: '',
};

const roleSchema = yup.object({
  role: yup.string().required('Ce champ est obligatoire!').max(80),
});
export default roleSchema;
