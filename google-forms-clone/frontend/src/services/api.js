// frontend/src/services/api.js

const API_BASE_URL = 'http://localhost:8000/api'; // Replace with your backend URL

async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json();
}

async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

async function createForm(formDetails, token) {
  const response = await fetch(`${API_BASE_URL}/forms/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(formDetails),
  });

  if (!response.ok) {
    throw new Error('Form creation failed');
  }

  return response.json();
}

async function submitResponse(formId, answers, token) {
  const response = await fetch(`${API_BASE_URL}/forms/${formId}/responses/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(answers),
  });

  if (!response.ok) {
    throw new Error('Response submission failed');
  }

  return response.json();
}

async function getForms(token) {
  const response = await fetch(`${API_BASE_URL}/forms/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch forms');
  }

  return response.json();
}

async function getFormResponses(formId, token) {
  const response = await fetch(`${API_BASE_URL}/forms/${formId}/responses/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch responses');
  }

  return response.json();
}

export {
  registerUser,
  loginUser,
  createForm,
  submitResponse,
  getForms,
  getFormResponses,
};