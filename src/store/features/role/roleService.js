import axios from 'axios';

// Get permissions
const permissions = async (token) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/permissions`,
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

// Get Roles Per Page
const rolesPerPage = async ({ page, row, token }) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/role/permissions?page=${page}&row=${row}`,
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

// Get All Roles
const allRoles = async (token) => {
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

// Create role
const createRole = async ({ name, permission_id, color, token }) => {
  console.table(name, permission_id, color, token);
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/roles`,
    { name, permission_id, color },
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

// Update role
const updateRole = async ({ id, data, token }) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/roles/${id}`,
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

// Delete role
const deleteRole = async ({ id, token }) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/roles/${id}`,
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

const roleService = {
  createRole,
  permissions,
  rolesPerPage,
  updateRole,
  deleteRole,
  allRoles,
};

export default roleService;
