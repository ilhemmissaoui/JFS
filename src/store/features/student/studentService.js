import axios from 'axios';
//const token = '4|oSuIysInyAL86VV1vnPwdNhJIm7LX7EwCouCogBBb3568902';
//getStudent and postStudent
const getStudents = async (token) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/students`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};

const getStudentsPerPage = async ({ token, page, row }) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/students?page=${page}&row=${row}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};
const getStudentsById = async (id) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/students/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};
const getNbStudents = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/getnbstudents`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};
const StudentByContrat = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/StudentByContrat`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};
const addStudent = async (data) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/students`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
  return response.data;
};
const editStudent = async (data) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/students/${data.id}`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
  return response.data;
};
/* try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/students/${data.id}`,
      data.data,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data; // Successful update, return the updated student data
    } else {
      throw new Error('Failed to update student'); // Handle other response statuses
    }
  } catch (error) {
    // Handle network errors, request failures, or any other exceptions
    console.error('Error updating student:', error);
    throw error; // Rethrow the error for higher-level error handling
  } */

// get class, promo, contrat ByID
const getClassById = async (classeId) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/classes/${classeId}`
  );
  return response.data.data.name;
};

const getPromoById = async (promotionId) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/promotions/${promotionId}`
  );
  return response.data.data.name;
};
const getContratById = async (contratId) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/${contratId}`
  );
  return response.data.data.name;
};
//get class, promo, contrat, staus, civilité
const getStatus = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/status`
  );
  return response.data.data;
};

const getCivilite = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/civilities`
  );
  return response.data.data;
};

const getClasses = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/classes`
  );
  return response.data.data;
};

const getPromotions = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/promotions`
  );
  return response.data.data;
};

const getContracts = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts`
  );
  return response.data.data;
};
const studentService = {
  getStudentsPerPage,
  getStudents,
  getStudentsById,
  addStudent,
  editStudent,
  getNbStudents,
  StudentByContrat,

  getClassById,
  getPromoById,
  getContratById,

  getStatus,
  getCivilite,
  getClasses,
  getPromotions,
  getContracts,
};
export default studentService;
