// import React, { useEffect, useState } from "react";
// import API from "../../api/axios"; // Make sure this includes token in headers
// import * as SC from "../../style";

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await API.get("/users", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUsers(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await API.delete(`/users/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUsers(users.filter((user) => user._id !== id));
//     } catch (err) {
//       console.error("Error deleting user:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <SC.Main7>
//     <div className="p-4 bg-container text-light-text min-h-screen max-w-xl mx-auto">
//       <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
//       <ul className="space-y-3">
//         {users.map((user) => (
//           <li
//             key={user._id}
//             className="bg-background p-4 rounded shadow flex justify-between items-center"
//           >
//             <div>
//               <p className="font-semibold">{user.username}</p>
//               <p className="text-sm">{user.email}</p>
//             </div>
//             <button
//               onClick={() => handleDelete(user._id)}
//               className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//     </SC.Main7>
//   );
// }



import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import * as SC from "../../style";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <SC.Main8>
      <div className="text-white  min-h-screen p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

        {error && <p className="text-red-500">{error}</p>}

        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user._id}
              className="border-b pb-2 flex justify-between items-center"
            >
              <span>
                {user.username} - {user.email}
              </span>
              <button
                className="bg-red-600 px-2 py-1 rounded"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </SC.Main8>
  );
}
