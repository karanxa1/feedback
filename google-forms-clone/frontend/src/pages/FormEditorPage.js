// src/pages/EditFormPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormBuilder from '../components/FormBuilder';
import { getForm, updateForm } from '../services/api'; // Updated to use the new API functions

const EditFormPage = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        // Use the newly added getForm function
        const token = localStorage.getItem('token');
        const formData = await getForm(formId, token);
        setForm(formData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [formId]);

  const handleFormUpdate = async (updatedForm) => {
    try {
      // Use the newly added updateForm function
      const token = localStorage.getItem('token');
      await updateForm(formId, updatedForm, token);
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