import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/Auth';
import axios from 'axios';
import { toast } from 'react-toastify';

const Users = () => {

  const [auth] = useAuth();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/v1/user/getAll", {
        headers: {
          Authorization: auth?.token, 
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  const deleteUser = async (userId, name) => {
    try {
      if (window.confirm('Are you sure you want to delete this user?')) {
        await axios.delete(`http://localhost:8081/api/v1/user/id/${userId}`, {
          headers: {
            Authorization: auth?.token, // Add token as a Bearer token in the header
          }
        });
        alert(name+ ' deleted successfully');
        fetchUsers(); // Refresh the users list after deletion
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const assignAdmin = async (userId, name) => {
    try {
      if (window.confirm('Are you sure you want to assign this user as admin ?')) {
        const response = await axios.put(`http://localhost:8081/api/v1/user/assign-admin/${userId}`, {},{
          headers: {
            Authorization: auth?.token, // Add token as a Bearer token in the header
          }
        });
        console.log(response);
        toast.success(name+ ' added as admin successfully');
        fetchUsers(); // Refresh the users list after deletion
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  return (
    <div className='container vh-100'>
      <div className="row justify-content-center mt-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="col-md-4 mb-4">
              <div className="card h-100 user-card">
                <div className="card-body text-uppercase">
                  <h5 className="card-title"><strong>Name :</strong>{user.fullName}</h5>
                  <p className="card-text"><strong>Email :</strong> {user.emailId}</p>
                  <p className="card-text"><strong>Phone Number :</strong> {user.phoneNumber}</p>
                  <p className="card-text"><strong>Gender :</strong> {user.gender}</p>
                  <div className="d-flex justify-content-between">
                    <button 
                      className="btn btn-danger delete-btn" 
                      onClick={() => deleteUser(user.emailId, user.fullName)}
                    >
                      Delete
                    </button>
                    {!user.roles?.some(item => item.name === 'ADMIN') && <button 
                      className="btn btn-success" 
                      onClick={() => {assignAdmin(user.emailId, user.fullName); checkAdmin(user.roles)}}
                    >
                      Assign Admin
                    </button>}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default Users;
