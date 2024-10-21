// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ManageUsers from './ManageUsers';

// const AdminPanel = () => {
//   const [users, setUsers] = useState([]);
//   const [currentView, setCurrentView] = useState('');

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/user');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

    
//     fetchUsers();
  
//   }, []);

//   const deleteUser = async (userId) => {
//     try {
//       await axios.delete(`http://localhost:4000/api/user/delete/${userId}`);
//       setUsers(users.filter(user => user._id !== userId));
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

  

//   const renderView = () => {
//     switch (currentView) {
//       case 'manageUsers':
//         return <ManageUsers users={users} deleteUser={deleteUser} />;
//       default:
//         return (
//           <div className="text-center text-gray-500">
//             Please select an option above to get started.
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="container mx-auto mt-10 p-4">
//       <h1 className="text-4xl font-bold mb-10 text-center text-indigo-600">Welcome Admin</h1>

//       <div className="flex justify-center space-x-4 mb-6">
        
//         <button
//           className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-2 px-4 rounded transition duration-200"
//           onClick={() => setCurrentView('manageUsers')}
//         >
//           Manage Users
//         </button>
        
//       </div>

//       <div className="bg-white shadow-lg rounded-lg p-6">
//         {renderView()}
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ManageUsers from './ManageUsers';
import ManageCampaigns from './ManageCampaigns';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [currentView, setCurrentView] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/campaigns');
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchUsers();
    fetchCampaigns();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/api/user/delete/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const deleteCampaign = async (campaignId) => {
    try {
      await axios.delete(`http://localhost:4000/api/campaigns/${campaignId}`);
      setCampaigns(campaigns.filter(campaign => campaign._id !== campaignId));
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'manageUsers':
        return <ManageUsers users={users} deleteUser={deleteUser} />;
      case 'manageCampaigns':
        return <ManageCampaigns campaigns={campaigns} deleteCampaign={deleteCampaign} />;
      default:
        return (
          <div className="text-center text-gray-500">
            Please select an option above to get started.
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-500">Welcome Admin</h1>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          className="bg-blue-800 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-2 px-4 rounded transition duration-200"
          onClick={() => setCurrentView('manageUsers')}
        >
          Manage Users
        </button>
        <button
          className="bg-blue-800 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-2 px-4 rounded transition duration-200"
          onClick={() => setCurrentView('manageCampaigns')}
        >
          Manage Campaigns
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        {renderView()}
      </div>
    </div>
  );
};

export default AdminPanel;
