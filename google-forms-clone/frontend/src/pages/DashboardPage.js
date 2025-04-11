javascriptreact
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getForms } from '../services/api'; // Assuming you have a service for API calls

const Dashboard = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await getForms();
        setForms(response.data); // Assuming your API returns an array of forms in response.data
      } catch (error) {
        console.error('Error fetching forms:', error);
        // Handle error appropriately, e.g., display an error message to the user
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/create-form">
        <button>Create New Form</button>
      </Link>

      <h2>Your Forms</h2>
      {forms.length === 0 ? (
        <p>You haven't created any forms yet.</p>
      ) : (
        <ul>
          {forms.map((form) => (
            <li key={form.id}>
              <Link to={`/forms/${form.id}`}>{form.title}</Link> 
              {/* Assuming your form object has an 'id' and 'title' */}
              <Link to={`/forms/${form.id}/responses`}>View Responses</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;