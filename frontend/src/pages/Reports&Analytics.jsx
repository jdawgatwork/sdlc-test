function ReportsAndAnalyticsScreen() {
  const [selectedReport, setSelectedReport] = React.useState('api-usage');
  const [dateRange, setDateRange] = React.useState('last-7-days');
  const [showFilterPanel, setShowFilterPanel] = React.useState(false);
  const [showExportMenu, setShowExportMenu] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const reportTypes = [
    { id: 'api-usage', name: 'API Usage', icon: '📊' },
    { id: 'workspace-activity', name: 'Workspace Activity', icon: '👥' },
    { id: 'code-commits', name: 'Code Commits', icon: '💻' },
    { id: 'integration-health', name: 'Integration Health', icon: '🔗' },
    { id: 'user-sessions', name: 'User Sessions', icon: '⏱️' },
    { id: 'document-edits', name: 'Document Edits', icon: '📝' }
  ];

  const metricsData = [
    { label: 'Total API Calls', value: '1,247,893', change: '+12.3%', trend: 'up' },
    { label: 'Active Workspaces', value: '342', change: '+8.1%', trend: 'up' },
    { label: 'Avg Response Time', value: '124ms', change: '-5.2%', trend: 'down' },
    { label: 'Error Rate', value: '0.12%', change: '-0.03%', trend: 'down' }
  ];

  const tableData = [
    { endpoint: '/api/documents/create', calls: '45,231', avgTime: '142ms', errors: '0.08%', lastUsed: '2 min ago' },
    { endpoint: '/api/workspaces/list', calls: '38,942', avgTime: '98ms', errors: '0.02%', lastUsed: '5 min ago' },
    { endpoint: '/api/code/execute', calls: '32,109', avgTime: '387ms', errors: '0.31%', lastUsed: '12 min ago' },
    { endpoint: '/api/github/sync', calls: '28,445', avgTime: '1.2s', errors: '0.15%', lastUsed: '18 min ago' },
    { endpoint: '/api/users/activity', calls: '19,832', avgTime: '76ms', errors: '0.01%', lastUsed: '23 min ago' },
    { endpoint: '/api/search/query', calls: '15,672', avgTime: '234ms', errors: '0.19%', lastUsed: '34 min ago' }
  ];

  const chartData = [
    { time: '00:00', value: 85 },
    { time: '04:00', value: 42 },
    { time: '08:00', value: 158 },
    { time: '12:00', value: 224 },
    { time: '16:00', value: 198 },
    { time: '20:00', value: 134 },
    { time: '23:59', value: 92 }
  ];

  const maxChartValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Notion Dev</h1>
          <p className="text-xs text-gray-500 mt-1">Developer Workspace</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <span>📈</span>
            <span>Dashboard</span>
          </a>
          <a href="/workspaces" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <span>📁</span>
            <span>Workspaces</span>
          </a>
          <a href="/code-editor" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <span>💻</span>
            <span>Code Editor</span>
          </a>
          <a href="/integrations" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <span>🔗</span>
            <span>Integrations</span>
          </a>
          <a href="/reports" className="flex items-center gap-3 px-3 py-2 text-sm text-white bg-indigo-600 rounded-lg">
            <span>📊</span>
            <span>Reports</span>
          </a>
          <a href="/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <span>⚙️</span>
            <span>Settings</span>
          </a>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-medium text-indigo-600">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate">john@company.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50" onClick={() => setSidebarOpen(false)}></div>
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Notion Dev</h1>
                <p className="text-xs text-gray-500 mt-1">Developer Workspace</p>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
                <span className="text-xl">✕</span>
              </button>
            </div>
            <nav className="p-4 space-y-1">
              <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100">
                <span>📈</span>
                <span>Dashboard</span>
              </a>
              <a href="/workspaces" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100">
                <span>📁</span>
                <span>Workspaces</span>
              </a>
              <a href="/code-editor" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100">
                <span>💻</span>
                <span>Code Editor</span>
              </a>
              <a href="/integrations" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100">
                <span>🔗</span>
                <span>Integrations</span>
              </a>
              <a href="/reports" className="flex items-center gap-3 px-3 py-2 text-sm text-white bg-indigo-600 rounded-lg">
                <span>📊</span>
                <span>Reports</span>
              </a>
              <a href="/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100">
                <span>⚙️</span>
                <span>Settings</span>
              </a>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-gray-500 hover:text-gray-700"
              >
                <span className="text-2xl">☰</span>
              </button>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Reports & Analytics</h2>
                <p className="text-sm text-gray-500 mt-1 hidden sm:block">Monitor performance and analyze usage patterns</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Schedule
              </button>
              <div className="relative">
                <button 
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Export
                </button>
                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                      Export as CSV
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                      Export as JSON
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                      Export as PDF
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                      Export to Excel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Report Selector */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                  <select 
                    value={selectedReport}
                    onChange={(e) => setSelectedReport(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    {reportTypes.map(report => (
                      <option key={report.id} value={report.id}>
                        {report.icon} {report.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Range Picker */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <select 
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="last-24-hours">Last 24 hours</option>
                    <option value="last-7-days">Last 7 days</option>
                    <option value="last-30-days">Last 30 days</option>
                    <option value="last-90-days">Last 90 days</option>
                    <option value="custom">Custom range</option>
                  </select>
                </div>

                {/* Filter Toggle */}
                <div className="flex items-end">
                  <button 
                    onClick={() => setShowFilterPanel(!showFilterPanel)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                      showFilterPanel 
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    🔍 Filters {showFilterPanel ? '(Active)' : ''}
                  </button>
                </div>
              </div>

              {/* Filter Panel */}
              {showFilterPanel && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Workspace</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>All workspaces</option>
                        <option>Main Project</option>
                        <option>API Documentation</option>
                        <option>Testing Environment</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">User</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>All users</option>
                        <option>John Doe</option>
                        <option>Jane Smith</option>
                        <option>Bob Johnson</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>All statuses</option>
                        <option>Success</option>
                        <option>Error</option>
                        <option>Warning</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Integration</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>All integrations</option>
                        <option>GitHub</option>
                        <option>GitLab</option>
                        <option>Slack</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
              {metricsData.map((metric, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">{metric.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{metric.value}</p>
                    <span className={`text-xs sm:text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart Visualization */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">API Calls Over Time</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-200">
                    Hourly
                  </button>
                  <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    Daily
                  </button>
                  <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    Weekly
                  </button>
                </div>
              </div>
              <div className="h-64 sm:h-80 flex items-end justify-between gap-2 sm:gap-4">
                {chartData.map((point, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-indigo-100 rounded-t-lg hover:bg-indigo-200 transition-colors duration-200 relative" 
                         style={{ height: `${(point.value / maxChartValue) * 100}%` }}>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        {point.value}k calls
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{point.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">API Endpoint Performance</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Detailed breakdown of endpoint usage and performance metrics</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Endpoint
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Calls
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        Avg Time
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                        Error Rate
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                        Last Used
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tableData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className="text-xs sm:text-sm font-mono text-gray-900">{row.endpoint}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className="text-xs sm:text-sm font-medium text-gray-900">{row.calls}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                          <span className="text-xs sm:text-sm text-gray-600">{row.avgTime}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            parseFloat(row.errors) > 0.2 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {row.errors}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                          <span className="text-xs sm:text-sm text-gray-500">{row.lastUsed}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-500">Showing 6 of 47 endpoints</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    Previous
                  </button>
                  <button className="px-3 py-1 text-xs sm:text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}