import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify"
import api from "../../services/api";

export default function ProfilePage() {
  const [username, setUsername] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("accessToken");

  const handleUsernameUpdate = async () => {
    setLoading(true);
    try {
      const res = await api.patch(
        "/user/update/username",
        { username: newUsername },
      );
      setUsername(res.data.username);
      setNewUsername("");
      toast.success("Username Updated ",{
        position: "top-right",
        autoClose: 500,
        theme: "colored",
        transition: Bounce
      })
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data.message || err.message,{
        position: "top-right",
        autoClose: 500,
        theme: "colored",
        transition: Bounce
      })
    }
    setLoading(false);
  };

  const handlePasswordUpdate = async () => {
    setLoading(true);
    try {
      await api.patch(
        "/user/update/password",
        passwordData,
      );
      setPasswordData({ currentPassword: "", newPassword: "" });
      toast.success("Paasword Updated ",{
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
        transition: Bounce
      })
    } catch (err) {
      toast.error(err.response?.data.message || err.message,{
        position: "top-right",
        autoClose: 500,
        theme: "colored",
        transition: Bounce
      })
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/me")
        setUsername(res.data.username)
        
      }
      catch(err){
        console.log(err);
        
      }
    }
    fetchUser()
  },[])

return (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 mt-16 md:mt-15">
    <div className="max-w-3xl mx-auto space-y-6">

      {/* HEADER */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex items-center justify-between">

  <div>
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
      👤 Profile Dashboard
    </h2>
    <p className="text-sm text-gray-500 dark:text-gray-400">
      Manage your account & security
    </p>
  </div>

</div>

      {/* ACCOUNT INFO */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
          Username : 
        </h3>
        <p className="font-bold text-4xl text-gray-600 dark:text-gray-300">
         {username}
        </p>
      </div>

      {/* UPDATE USERNAME */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 space-y-3">

  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
    ✏️ Update Username
  </h3>

  <div className="flex flex-col sm:flex-row gap-3">
    <input
      type="text"
      placeholder="Enter new username"
      value={newUsername}
      onChange={(e) => setNewUsername(e.target.value)}
      className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
    />

    <button
      onClick={handleUsernameUpdate}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
    >
      {loading ? "Updating..." : "Update"}
    </button>
  </div>

</div>

      {/* CHANGE PASSWORD */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 space-y-3">

  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
    🔐 Change Password
  </h3>

  <div className="space-y-3">

    <input
      type="password"
      placeholder="Current Password"
      className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:text-white"
      value={passwordData.currentPassword}
      onChange={(e) =>
        setPasswordData({
          ...passwordData,
          currentPassword: e.target.value,
        })
      }
    />

    <input
      type="password"
      placeholder="New Password"
      className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:text-white"
      value={passwordData.newPassword}
      onChange={(e) =>
        setPasswordData({
          ...passwordData,
          newPassword: e.target.value,
        })
      }
    />

    <button
      onClick={handlePasswordUpdate}
      disabled={loading}
      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition disabled:opacity-50"
    >
      {loading ? "Updating..." : "Change Password"}
    </button>

  </div>

</div>

    </div>
  </div>
);
}
