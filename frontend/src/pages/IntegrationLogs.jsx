function IntegrationLogsScreen() {
  const [logLevel, setLogLevel] = React.useState('all');
  const [dateFilter, setDateFilter] = React.useState('24h');
  const [selectedLog, setSelectedLog] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const logs = [
    {
      id: 1,
      timestamp: '2024-01-15 14:32:18',
      level: 'info',
      event: 'GitHub Sync Completed',
      integration: 'GitHub API',
      duration: '2.3s',
      status: 'success',
      details: {
        endpoint: 'https://api.github.com/repos/acme/project/commits',
        method: 'GET',
        statusCode: 200,
        request: '{\n  "per_page": 100,\n  "since": "2024-01-15T00:00:00Z"\n}',
        response: '{\n  "commits": 47,\n  "synced": 47,\n  "skipped": 0\n}',
        mapping: 'commits → workspace.tasks'
      }
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:28:45',
      level: 'error',
      event: 'Authentication Failed',
      integration: 'GitHub API',
      duration: '0.8s',
      status: 'failed',
      details: {
        endpoint: 'https://api.github.com/user',
        method: 'GET',
        statusCode: 401,
        request: '{\n  "headers": {\n    "Authorization": "token ghp_***"\n  }\n}',
        response: '{\n  "message": "Bad credentials",\n  "documentation_url": "https://docs.github.com"\n}',
        error: 'Invalid or expired access token'
      }
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:15:22',
      level: 'warning',
      event: 'Rate Limit Approaching',
      integration: 'GitHub API',
      duration: '1.2s',
      status: 'warning',
      details: {
        endpoint: 'https://api.github.com/rate_limit',
        method: 'GET',
        statusCode: 200,
        request: '{}',
        response: '{\n  "remaining": 127,\n  "limit": 5000,\n  "reset": 1705330800\n}',
        warning: '127 requests remaining until reset'
      }
    },
    {
      id: 4,
      timestamp: '2024-01-15 13:45:10',
      level: 'info',
      event: 'Webhook Received',
      integration: 'GitHub Webhook',
      duration: '0.4s',
      status: 'success',
      details: {
        endpoint: '/webhooks/github/push',
        method: 'POST',
        statusCode: 200,
        request: '{\n  "ref": "refs/heads/main",\n  "commits": [\n    {\n      "id": "a3f2b1c",\n      "message": "Fix auth flow"\n    }\n  ]\n}',
        response: '{\n  "processed": true,\n  "tasks_updated": 3\n}',
        mapping: 'webhook.push → workspace.activity'
      }
    },
    {
      id: 5,
      timestamp: '2024-01-15 13:30:55',
      level: 'info',
      event: 'Data Sync Started',
      integration: 'GitHub API',
      duration: '0.1s',
      status: 'success',
      details: {
        endpoint: 'https://api.github.com/repos/acme/project/issues',
        method: 'GET',
        statusCode: 200,
        request: '{\n  "state": "open",\n  "sort": "updated"\n}',
        response: '{\n  "issues": 23,\n  "processing": true\n}',
        mapping: 'issues → workspace.backlog'
      }
    },
    {
      id: 6,
      timestamp: '2024-01-15 12:58:33',
      level: 'error',
      event: 'Sync Failed',
      integration: 'GitHub API',
      duration: '30.2s',
      status: 'failed',
      details: {
        endpoint: 'https://api.github.com/repos/acme/project/pulls',
        method: 'GET',
        statusCode: 500,
        request: '{\n  "state": "all",\n  "per_page": 100\n}',
        response: '{\n  "error": "Internal Server Error"\n}',
        error: 'GitHub API temporarily unavailable'
      }
    }
  ];

  const filteredLogs = logs.filter(log => {
    const matchesLevel = logLevel === 'all' || log.level === logLevel;
    const matchesSearch = log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.integration.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const handleExportLogs = () => {
    console.log('Exporting logs...');
  };

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLog(null);
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'success': return 'bg-green-100 text-green-700 border-green-200';
      case 'failed': return 'bg-red-100 text-red-700 border-red-200';
      case 'warning': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className="hidden md:block fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="font-semibold text-gray-900">Notion Dev</span>
          </div>
          
          <nav className="space-y-1">
            <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <span className="text-lg">📊</span>
              <span className="text-sm font-medium">Dashboard</span>
            </a>
            <a href="/workspaces" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <span className="text-lg">📁</span>
              <span className="text-sm font-medium">Workspaces</span>
            </a>
            <a href="/code-editor" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <span className="text-lg">💻</span>
              <span className="text-sm font-medium">Code Editor</span>
            </a>
            <a href="/admin/integrations" className="flex items-center gap-3 px-3 py-2 text-indigo-600 bg-indigo-50 rounded-lg transition-colors duration-200">
              <span className="text-lg">🔌</span>
              <span className="text-sm font-medium">Integrations</span>
            </a>
            <a href="/settings" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <span className="text-lg">⚙️</span>
              <span className="text-sm font-medium">Settings</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 z-40">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          <a href="/dashboard" className="flex flex-col items-center gap-1 py-2 text-gray-600">
            <span className="text-lg">📊</span>
            <span className="text-xs">Dashboard</span>
          </a>
          <a href="/workspaces" className="flex flex-col items-center gap-1 py-2 text-gray-600">
            <span className="text-lg">📁</span>
            <span className="text-xs">Workspaces</span>
          </a>
          <a href="/code-editor" className="flex flex-col items-center gap-1 py-2 text-gray-600">
            <span className="text-lg">💻</span>
            <span className="text-xs">Code</span>
          </a>
          <a href="/admin/integrations" className="flex flex-col items-center gap-1 py-2 text-indigo-600">
            <span className="text-lg">🔌</span>
            <span className="text-xs">Integrations</span>
          </a>
          <a href="/settings" className="flex flex-col items-center gap-1 py-2 text-gray-600">
            <span className="text-lg">⚙️</span>
            <span className="text-xs">Settings</span>
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen pb-20 md:pb-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <a href="/admin/integrations" className="hover:text-gray-900 transition-colors duration-200">Integrations</a>
                <span>/</span>
                <span>GitHub Integration</span>
                <span>/</span>
                <span className="text-gray-900">Logs</span>
              </div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Integration Logs</h1>
            </div>
            <button
              onClick={handleCloseModal}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Log Level Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setLogLevel('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  logLevel === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setLogLevel('info')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  logLevel === 'info'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Info
              </button>
              <button
                onClick={() => setLogLevel('warning')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  logLevel === 'warning'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Warning
              </button>
              <button
                onClick={() => setLogLevel('error')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  logLevel === 'error'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Error
              </button>
            </div>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>

            {/* Export Button */}
            <button
              onClick={handleExportLogs}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden md:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="px-4 md:px-8 py-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Integration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLogs.map(log => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                        {log.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getLevelColor(log.level)}`}>
                          {log.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {log.event}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {log.integration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                        {log.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getStatusBadge(log.status)}`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleViewDetails(log)}
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors duration-200"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-200">
              {filteredLogs.map(log => (
                <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getLevelColor(log.level)}`}>
                        {log.level}
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getStatusBadge(log.status)}`}>
                        {log.status}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">{log.duration}</span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">{log.event}</h3>
                  <p className="text-xs text-gray-600 mb-2">{log.integration}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-mono">{log.timestamp}</span>
                    <button
                      onClick={() => handleViewDetails(log)}
                      className="text-indigo-600 hover:text-indigo-800 text-xs font-medium transition-colors duration-200"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredLogs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">
                  <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">No logs found matching your filters</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Log Details Modal */}
      {isModalOpen && selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{selectedLog.event}</h2>
                <p className="text-sm text-gray-500 font-mono mt-0.5">{selectedLog.timestamp}</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Level</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getLevelColor(selectedLog.level)}`}>
                    {selectedLog.level}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getStatusBadge(selectedLog.status)}`}>
                    {selectedLog.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Duration</p>
                  <p className="text-sm font-medium text-gray-900 font-mono">{selectedLog.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Integration</p>
                  <p className="text-sm font-medium text-gray-900">{selectedLog.integration}</p>
                </div>
              </div>

              {/* Request Details */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Request</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Endpoint</p>
                    <p className="text-sm text-gray-900 font-mono break-all">{selectedLog.details.endpoint}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Method</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                      {selectedLog.details.method}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Payload</p>
                    <pre className="text-xs text-gray-800 font-mono bg-white rounded p-3 border border-gray-200 overflow-x-auto">
                      {selectedLog.details.request}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Response Details */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Response</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Status Code</p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium font-mono ${
                      selectedLog.details.statusCode === 200 
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : selectedLog.details.statusCode >= 400 && selectedLog.details.statusCode < 500
                        ? 'bg-amber-100 text-amber-700 border border-amber-200'
                        : 'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {selectedLog.details.statusCode}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Body</p>
                    <pre className="text-xs text-gray-800 font-mono bg-white rounded p-3 border border-gray-200 overflow-x-auto">
                      {selectedLog.details.response}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Data Mapping */}
              {selectedLog.details.mapping && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Data Mapping</h3>
                  <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                    <p className="text-sm text-indigo-900 font-mono">{selectedLog.details.mapping}</p>
                  </div>
                </div>
              )}

              {/* Error Details */}
              {selectedLog.details.error && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Error Details</h3>
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <p className="text-sm text-red-900">{selectedLog.details.error}</p>
                  </div>
                </div>
              )}

              {/* Warning Details */}
              {selectedLog.details.warning && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Warning</h3>
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <p className="text-sm text-amber-900">{selectedLog.details.warning}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Close
              </button>
              <button
                onClick={() => console.log('Copy log details')}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Copy Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}