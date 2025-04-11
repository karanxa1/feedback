javascriptreact
// src/pages/EditFormPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormBuilder from '../components/FormBuilder';
import { getForm, updateForm } from '../services/api'; // Assume these API functions exist

const EditFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const formData = await getForm(id);
        setForm(formData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  const handleFormUpdate = async (updatedForm) => {
    try {
      await updateForm(id, updatedForm);
      navigate('/dashboard'); // Redirect to dashboard after successful update
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading form...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!form) {
    return <p>Form not found.</p>;
  }

  return (
    <div>
      <h1>Edit Form</h1>
      <FormBuilder initialForm={form} onSave={handleFormUpdate} />
    </div>
  );
};

export default EditFormPage;