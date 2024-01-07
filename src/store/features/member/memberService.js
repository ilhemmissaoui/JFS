import axios from 'axios';

// Get roles
const roles = async (token) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/roles`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.data) {
    return response.data.data;
  }
};

// Get Members Per Page
const membersPerPage = async ({ page, row, token }) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/membres?page=${page}&row=${row}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.data) {
    return response.data.data;
  }
};

// Create member
const createMember = async ({ data, token }) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/membres`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.data) {
    return response.data;
  }
};

// Update member
const updateMember = async ({ id, data, token }) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/membres/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.data) {
    return response.data;
  }
};

// Delete member
const deleteMember = async ({ id, token }) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/membres/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.data) {
    return response.data;
  }
};

const memberService = {
  createMember,
  roles,
  membersPerPage,
  updateMember,
  deleteMember,
};

export default memberService;
