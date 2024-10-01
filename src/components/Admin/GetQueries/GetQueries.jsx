import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GetQueries.css'; // Custom CSS for styling the page
import { FaReply, FaTrashAlt } from 'react-icons/fa'; // Icons for respond and delete
// import { format, parse } from 'date-fns';
import ResponseModal from './ResponseModal'; // Import the modal component
import { toast } from 'react-toastify';

const GetQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);

  // Fetch queries from the backend on component mount
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8081/api/v1/contact/all', {
          headers: {
            Authorization: token,
          },
        });
        setQueries(response.data || []);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Failed to fetch queries.');
      } finally {
        setLoading(false);
      }
    };
    fetchQueries();
  }, []);

  // Format the date from the backend
  // const formatDate = (dateString) => {
  //   try {
  //     const parsedDate = parse(dateString, 'dd/MM/yyyy, HH:mm:ss', new Date());
  //     return format(parsedDate, 'dd/MM/yyyy, HH:mm:ss');
  //   } catch (error) {
  //     // console.error('Error parsing date:', error);
  //     return 'Invalid Date';
  //   }
  // };

  // Handle query deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this query?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8081/api/v1/contact/${id}`, {
        headers: { Authorization: token },
      });
      toast.success('Successfully deleted');
      setQueries((prevQueries) => prevQueries.filter((query) => query.id !== id));
    } catch (error) {
      console.error('Error deleting query:', error);
      toast.warning(error.response ? error.response.data.message : 'Failed to delete query.');
    }
  };

  // Handle opening the response modal
  const handleResponse = (query) => {
    setSelectedQuery(query);
    setShowModal(true);
  };

  // Handle sending the response (logic to send response can be added)
  const handleSend = (e, id) => {
    toast.success(`Message sent to query with ID: ${id}`);
    setShowModal(false);
  };

  // Close the response modal
  const handleClose = () => {
    setShowModal(false);
    setSelectedQuery(null);
  };

  return (
    <div className="queries-container">
      <h2>Customer Queries</h2>

      {loading && <p>Loading queries...</p>}
      {error && <p className="error">{error}</p>}

      {queries.length > 0 ? (
        <table className="queries-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Query</th>
              {/* <th>Submitted On</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query, index) => (
              <tr key={index} className="query-row">
                <td>{query.id}</td>
                <td>{query.name}</td>
                <td>{query.emailId}</td>
                <td>{query.subject}</td>
                <td>{query.comment}</td>
                {/* <td>{formatDate(query.sentAt)}</td> */}
                <td className="action-buttons">
                  <button
                    className="action-btn respond-btn"
                    onClick={() => handleResponse(query)}
                  >
                    <FaReply /> Respond
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(query.id)}
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && !error && <p>No queries available.</p>
      )}

      <ResponseModal
        show={showModal}
        query={selectedQuery}
        handleClose={handleClose}
        handleSend={handleSend}
      />
    </div>
  );
};

export default GetQueries;