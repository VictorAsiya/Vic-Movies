import React, { useState, useEffect } from "react";
import * as SC from "../../style";
import logo from "/logo.png";
import BottomNav from "../components/BottomNav.tsx/bottomNav";
import API from "../../api/axios"; // your axios setup file
import { useNavigate, Link } from "react-router-dom";
import { CustomInput } from "../components/input";
import { ArrowLeft } from "lucide-react";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch user info on mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await API.get("/auth/me"); // Adjust endpoint if needed
        setUsername(data.username);
        setNewUsername(data.username);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await API.put("/auth/update", { username: newUsername });
      setUsername(newUsername);
      alert("Username updated!");
    } catch (err) {
      alert("Update failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    try {
      await API.delete("/auth/delete");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      alert("Failed to delete account.");
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await API.post("/auth/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/log_In");
  };

  return (
    <SC.Main6 className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-container text-light-text py-8 px-4 lg:rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center">
        <span className="flex justify-between items-center px-3 mb-5">
          <Link to="/home">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-xl font-semibold ">Profile</h2>
          <Link to="/home">
            <img src={logo} alt="" className="h-10" />
          </Link>
        </span>

        <p className="text-sm mb-2 text-gray-400 text-left">Update Details:</p>
        <p className="text-lg font-medium mb-4">{username}</p>

        <CustomInput
          name="username"
          placeholder="Your User-Name"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          rightIcon={null}
          className="mb-5"
        />

        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white py-2 rounded mb-4 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Username"}
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white py-2 rounded mb-4 "
        >
          Delete Account
        </button>

        <button
          onClick={handleLogout}
          className="bg-gray-700 text-white py-2 rounded cursor-pointer"
        >
          Log Out
        </button>
      </div>

      <BottomNav />
    </SC.Main6>
  );
}
