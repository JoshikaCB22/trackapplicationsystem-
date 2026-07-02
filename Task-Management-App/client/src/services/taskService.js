import axios from 'axios';

export const getTasks = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.keys(filters).forEach(key => {
    if (filters[key]) params.append(key, filters[key]);
  });
  const { data } = await axios.get(`/api/tasks?${params.toString()}`);
  return data;
};

export const getTaskById = async (id) => {
  const { data } = await axios.get(`/api/tasks/${id}`);
  return data;
};

export const createTask = async (taskData) => {
  const { data } = await axios.post('/api/tasks', taskData);
  return data;
};

export const updateTask = async (id, taskData) => {
  const { data } = await axios.put(`/api/tasks/${id}`, taskData);
  return data;
};

export const deleteTask = async (id) => {
  const { data } = await axios.delete(`/api/tasks/${id}`);
  return data;
};
