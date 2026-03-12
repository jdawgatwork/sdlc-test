function ReportsAndAnalyticsScreen() {
  const [selectedReport, setSelectedReport] = React.useState(null);
  const [dateRange, setDateRange] = React.useState('last-30-days');
  const [showScheduleModal, setShowScheduleModal] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('catalog');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const reportCatalog = [
    {
      id: 1,
      name: 'API Usage Report',
      description: 'Track API endpoints, response times, and error rates',
      category: 'Performance',
      lastRun: '2 hours ago',
      icon: '📊'
    },
    {
      id: 2,
      name: 'Code Activity Summary',
      description: 'Commits, pull requests, and code reviews across repositories',
      category: 'Development',
      lastRun: '5 hours ago',
      icon: '💻'
    },
    {
      id: 3,
      name: 'Sprint Velocity',
      description: 'Story points completed, burndown charts, and team capacity',
      category: 'Planning',
      lastRun: '1 day ago',
      icon: '🚀'
    },
    {
      id: 4,
      name: 'Integration Health',
      description: 'GitHub sync status, webhook failures, and connection issues',
      category: 'Compliance',
      lastRun: '3 hours ago',
      icon: '🔗'
    },
    {
      id: 5,
      name: 'User Access Audit',
      description: 'Permission changes, login activity, and security events',
      category: 'Compliance',
      lastRun: '12 hours ago',
      icon: '🔒'
    },
    {
      id: 6,
      name: 'Documentation Coverage',
      description: 'Wiki pages created, code comments ratio, and README updates',
      category: 'Development',
      lastRun: '1 day ago',
      icon: '📝'
    }
  ];

  const recentReports = [
    { name: 'Weekly Sprint Report', generatedBy: 'Sarah Chen', date: '2 hours ago', status: 'completed' },
    { name: 'Monthly API Analytics', generatedBy: 'Alex Kumar', date: '5 hours ago', status: 'completed' },
    { name: 'Q1 Compliance Audit', generatedBy: 'Mike Johnson', date: '1 day ago', status: 'completed' }
  ];

  const metrics = [
    { label: 'Reports Generated', value: '147', change: '+12%' },
    { label: 'Scheduled Reports', value: '23', change: '+5%' },
    { label: 'Data Exports', value: '89', change: '+8%' },
    { label: 'Active Dashboards', value: '12', change: '0%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">DevNotion</h1>
            <p className="text-xs text-gray-500 mt-1">Workspace for Developers</p>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            <a href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <span>📈</span>
              <span>Dashboard</span>
            </a>
            <a href="/projects" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <span>📁</span>
              <span>Projects</span>
            </a>
            <a href="/code-editor" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <span>⚡</span>
              <span>Code Editor</span>
            </a>
            <a href="/wiki" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <span>📚</span>
              <span>Wiki</span>
            </a>
            <a href="/github-sync" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <span>🔄</span>
              <span>GitHub Sync</span>
            </a>
            <a href="/reports" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white bg-blue-600 rounded-lg">
              <span>📊</span>
              <span>Reports</span>
            </a>
            <a href="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <span>⚙️</span>
              <span>Settings</span>
            </a>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                SC
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Sarah Chen</p>
                <p className="text-xs text-gray-500 truncate">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Reports & Analytics</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Generate insights and export data</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
                  <span>📤</span>
                  <span>Export</span>
                </button>
                <button 
                  onClick={() => setShowScheduleModal(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-md transition-all duration-200"
                >
                  <span>🕐</span>
                  <span className="hidden sm:inline">Schedule</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Metrics cards */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 bg-white border-b border-gray-200">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">{metric.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{metric.value}</p>
                  <span className="text-xs text-green-600 font-medium">{metric.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex gap-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('catalog')}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  activeTab === 'catalog'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Report Catalog
              </button>
              <button
                onClick={() => setActiveTab('custom')}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  activeTab === 'custom'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Custom Builder
              </button>
              <button
                onClick={() => setActiveTab('dashboards')}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  activeTab === 'dashboards'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Dashboards
              </button>
              <button
                onClick={() => setActiveTab('recent')}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  activeTab === 'recent'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Recent
              </button>
            </div>
          </div>

          {/* Report Catalog Tab */}
          {activeTab === 'catalog' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                      <option>All Categories</option>
                      <option>Performance</option>
                      <option>Development</option>
                      <option>Planning</option>
                      <option>Compliance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                    <select 
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="last-7-days">Last 7 days</option>
                      <option value="last-30-days">Last 30 days</option>
                      <option value="last-90-days">Last 90 days</option>
                      <option value="custom">Custom range</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                      <option>PDF</option>
                      <option>Excel</option>
                      <option>CSV</option>
                      <option>JSON</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-md transition-all duration-200">
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>

              {/* Report grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reportCatalog.map((report) => (
                  <div
                    key={report.id}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer group"
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{report.icon}</div>
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {report.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {report.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500">Last run: {report.lastRun}</span>
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200">
                        Generate →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Builder Tab */}
          {activeTab === 'custom' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Build Custom Report</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Weekly Team Performance"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Data Source</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                      <option>GitHub Repositories</option>
                      <option>API Logs</option>
                      <option>Sprint Data</option>
                      <option>Wiki Activity</option>
                      <option>User Sessions</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Visualization Type</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                      <option>Bar Chart</option>
                      <option>Line Graph</option>
                      <option>Pie Chart</option>
                      <option>Table</option>
                      <option>Heatmap</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Metrics</label>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {['Commits', 'Pull Requests', 'Code Reviews', 'Issues Closed', 'Build Time', 'Test Coverage'].map((metric) => (
                      <label key={metric} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
                        <span className="text-sm text-gray-700">{metric}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filters</label>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <select className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                        <option>Team Member</option>
                        <option>Repository</option>
                        <option>Date Range</option>
                        <option>Status</option>
                      </select>
                      <select className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                        <option>Equals</option>
                        <option>Contains</option>
                        <option>Greater than</option>
                        <option>Less than</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Value"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                      + Add Filter
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
                    Preview
                  </button>
                  <button className="flex-1 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-md transition-all duration-200">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Dashboards Tab */}
          {activeTab === 'dashboards' && (
            <div className="space-y-6">
              {/* Embedded dashboard mockup */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Development Activity Dashboard</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                    Fullscreen
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Chart placeholder 1 */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 h-64 flex items-center justify-center border border-gray-200">
                    <div className="text-center">
                      <div className="text-4xl mb-3">📈</div>
                      <p className="text-sm font-medium text-gray-700">Commit Frequency</p>
                      <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                    </div>
                  </div>

                  {/* Chart placeholder 2 */}
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 h-64 flex items-center justify-center border border-gray-200">
                    <div className="text-center">
                      <div className="text-4xl mb-3">🎯</div>
                      <p className="text-sm font-medium text-gray-700">Sprint Velocity</p>
                      <p className="text-xs text-gray-500 mt-1">Story points by sprint</p>
                    </div>
                  </div>

                  {/* Chart placeholder 3 */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 h-64 flex items-center justify-center border border-gray-200">
                    <div className="text-center">
                      <div className="text-4xl mb-3">⚡</div>
                      <p className="text-sm font-medium text-gray-700">API Performance</p>
                      <p className="text-xs text-gray-500 mt-1">Response time trends</p>
                    </div>
                  </div>

                  {/* Chart placeholder 4 */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 h-64 flex items-center justify-center border border-gray-200">
                    <div className="text-center">
                      <div className="text-4xl mb-3">🔍</div>
                      <p className="text-sm font-medium text-gray-700">Code Quality</p>
                      <p className="text-xs text-gray-500 mt-1">Test coverage & complexity</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard list */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Dashboards</h3>
                <div className="space-y-3">
                  {['Team Performance Overview', 'Sprint Analytics', 'Code Quality Metrics', 'API Health Monitor'].map((dashboard, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">📊</div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{dashboard}</p>
                          <p className="text-xs text-gray-500">Last viewed 2 days ago</p>
                        </div>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recent Tab */}
          {activeTab === 'recent' && (
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Generated By</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentReports.map((report, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{report.name}</div>
                          <div className="text-xs text-gray-500 sm:hidden">{report.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 hidden sm:table-cell">{report.generatedBy}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">{report.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 mr-3">
                            View
                          </button>
                          <button className="text-gray-600 hover:text-gray-700 font-medium transition-colors duration-200">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Schedule Report</h3>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                  <option>API Usage Report</option>
                  <option>Code Activity Summary</option>
                  <option>Sprint Velocity</option>
                  <option>Integration Health</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Send To</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <div className="grid grid-cols-2 gap-3">
                  {['PDF', 'Excel', 'CSV', 'JSON'].map((format) => (
                    <label key={format} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                      <input type="radio" name="format" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">{format}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-md transition-all duration-200"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}