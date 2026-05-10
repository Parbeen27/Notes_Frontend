export default function Activitylog({ logs }) {
const groupLogsByDate = (logs) => {
  const grouped = {};

  logs.forEach((log) => {
    const date = new Date(log.createdAt).toDateString();

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(log);
  });

  return grouped;
};
  const groupedLogs = groupLogsByDate(logs);

  return (
    <div className="bg-white p-5 rounded-xl shadow mt-6">
      <h2 className="text-lg font-bold mb-4">📝 Activity Timeline</h2>

      <div className="space-y-6">
        {Object.entries(groupedLogs).map(([date, items]) => (
          <div key={date}>
            
            {/* Date Header */}
            <h3 className="text-sm font-semibold text-gray-500 mb-2">
              {date === new Date().toDateString() ? "Today" : date}
            </h3>

            {/* Logs */}
            <div className="space-y-3 border-l-2 border-gray-200 pl-4">
              {items.map((log) => (
                <ActivityItem key={log._id} log={log} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityItem({ log }) {
  const getColor = (action) => {
    if (action.includes("DELETE")) return "text-red-600";
    if (action.includes("BLOCK")) return "text-yellow-600";
    if (action.includes("UPDATE")) return "text-blue-600";
    return "text-green-600";
  };

  return (
    <div className="flex items-start gap-3">

      {/* Dot */}
      <div className="w-2 h-2 mt-2 rounded-full bg-gray-400"></div>

      {/* Content */}
      <div>
        <p className={`text-sm font-medium ${getColor(log.action)}`}>
          {log.action}
        </p>

        <p className="text-xs text-gray-500">
          by <b>{log.performedBy?.username}</b>
          {log.targetUser && (
            <> → {log.targetUser.username}</>
          )}
        </p>

        <p className="text-xs text-gray-400">
          {new Date(log.createdAt).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}