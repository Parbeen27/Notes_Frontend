import React, { useEffect, useState } from 'react'
import api from '../../services/api';
import Activitylog from '../../components/admin/Dashboard/Activitylog';

export default function AdminDashboard() {
  const [logs, setLogs] = useState([])


  const fecthLogs = async () => {
    try {
      const res = await api.get("/admin")
      console.log(res.data);
      
    setLogs(res.data)
    } catch (error) {
      console.log(error);
    }
    
  }
  useEffect(() => {
    fecthLogs()
  }, []);

return (
  <div className="p-4 md:ml-64 space-y-6 bg-gray-50 min-h-screen">

    {/* Header */}
    <div>
      <h1 className="text-2xl font-bold text-gray-800">
        📊 Admin Dashboard
      </h1>
      <p className="text-sm text-gray-500">
    
      </p>
    </div>
    <Activitylog logs={logs}/>

  </div>
);

}
