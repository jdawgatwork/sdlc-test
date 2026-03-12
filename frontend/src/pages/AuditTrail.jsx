function AuditTrailScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [dateRange, setDateRange] = React.useState('last-7-days');
  const [selectedUser, setSelectedUser] = React.useState('all');
  const [selectedAction, setSelectedAction] = React.useState('all');
  const [selectedLog, setSelectedLog] = React.useState(null);
  const [showFilters, setShowFilters] = React.useState(false);

  const auditLogs = [
    {
      id: 'evt_1a2b3c',
      timestamp: '2024-01-15 14:32:18',
      user: 'sarah.chen@company.com',
      action: 'page.updated',
      entity: 'API Documentation',
      details: 'Updated code snippet in Authentication section',
      ip: '192.168.1.45',
      changes: { before: 'Bearer {token}', after: 'Bearer {access_token}' }
    },
    {
      id: 'evt_2b3c4d',
      timestamp: '2024-01-15 14:28:03',
      user: 'mike.rodriguez@company.com',
      action: 'user.login',
      entity: 'Authentication',
      details: 'Successful login via OAuth',
      ip: '203.0.113.42',
      changes: null
    },
    {
      id: 'evt_3c4d5e',
      timestamp: '2024-01-15 14:15:47',
      user: 'emma.wilson@company.com',
      action: 'workspace.deleted',
      entity: 'Legacy Project Workspace',
      details: 'Permanently deleted workspace and all contents',
      ip: '198.51.100.78',
      changes: { pages_deleted: 24, members_removed: 5 }
    },
    {
      id: 'evt_4d5e6f',
      timestamp: '2024-01-15 13:58:22',
      user: 'david.kim@company.com',
      action: 'integration.connected',
      entity: 'GitHub Repository',
      details: 'Connected repository: company/backend-api',
      ip: '192.168.1.103',
      changes: { repo: 'company/backend-api', permissions: ['read', 'write'] }
    },
    {
      id: 'evt_5e6f7g',
      timestamp: '2024-01-15 13:42:11',
      user: 'sarah.chen@company.com',
      action: 'page.created',
      entity: 'Sprint Planning Q1 2024',
      details: 'Created new planning page from template',
      ip: '192.168.1.45',
      changes: null
    },
    {
      id: 'evt_6f7g8h',
      timestamp: '2024-01-15 13:31:05',
      user: 'admin@company.com',
      action: 'user.role_changed',
      entity: 'mike.rodriguez@company.com',
      details: 'Role changed from Member to Admin',
      ip: '203.0.113.12',
      changes: { from: 'member', to: 'admin' }
    },
    {
      id: 'evt_7g8h9i',
      timestamp: '2024-01-15 12:58:33',
      user: 'emma.wilson@company.com',
      action: 'code.executed',
      entity: 'data-processor.js',
      details: 'Executed code block in development environment',
      ip: '198.51.100.78',
      changes: { runtime: 'Node.js 18', exit_code: 0 }
    },
    {
      id: 'evt_8h9i0j',
      timestamp: '2024-01-15 12:23:19',
      user: 'david.kim@company.com',
      action: 'export.completed',
      entity: 'Product Roadmap 2024',
      details: 'Exported workspace to PDF format',
      ip: '192.168.1.103',
      changes: { format: 'PDF', size: '2.4 MB' }
    }
  ];

  const actionTypes = [
    { value: 'all', label: 'All Actions' },
    { value: 'page.created', label: 'Page Created' },
    { value: 'page.updated', label: 'Page Updated' },
    { value: 'page.deleted', label: 'Page Deleted' },
    { value: 'workspace.deleted', label: 'Workspace Deleted' },
    { value: 'user.login', label: 'User Login' },
    { value: 'user.role_changed', label: 'Role Changed' },
    { value: 'integration.connected', label: 'Integration Connected' },
    { value: 'code.executed', label: 'Code Executed' },
    { value: 'export.completed', label: 'Export Completed' }
  ];

  const users = [
    { value: 'all', label: 'All Users' },
    { value: 'sarah.chen@company.com', label: 'Sarah Chen' },
    { value: 'mike.rodriguez@company.com', label: 'Mike Rodriguez' },
    { value: 'emma.wilson@company.com', label: 'Emma Wilson' },
    { value: 'david.kim@company.com', label: 'David Kim' },
    { value: 'admin@company.com', label: 'Admin' }
  ];

  const getActionColor = (action) => {
    if (action.includes('deleted')) return 'text-red-600 bg-red-50';
    if (action.includes('created')) return 'text-green-600 bg-green-50';
    if (action.includes('updated')) return 'text-blue-600 bg-blue-50';
    if (action.includes('login')) return 'text-purple-600 bg-purple-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getActionIcon = (action) => {
    if (action.includes('deleted')) return '🗑️';
    if (action.includes('created')) return '✨';
    if (action.includes('updated')) return '✏️';
    if (action.includes('login')) return '🔐';
    if (action.includes('integration')) return '🔗';
    if (action.includes('code')) return '⚡';
    if (action.includes('export')) return '📥';
    if (action.includes('role')) return '👤';
    return '📝';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">DevWorkspace</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <span>📊</span>
            <span className="font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <span>📄</span>
            <span className="font-medium">Pages</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <span>💻</span>
            <span className="font-medium">Code Editor</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <span>🔗</span>
            <span className="font-medium">Integrations</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <span>📋</span>
            <span className="font-medium">Sprint Board</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 transition-colors">
            <span>🔍</span>
            <span className="font-medium">Audit Trail</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <span>⚙️</span>
            <span className="font-medium">Settings</span>
          </a>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
              SC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Sarah Chen</p>
              <p className="text-xs text-gray-500 truncate">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation (Mobile) */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-gray-900">Audit Trail</h1>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        {/* Page Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Audit Trail</h2>
                <p className="text-sm text-gray-500 mt-1">Complete activity log for compliance and security monitoring</p>
              </div>
              <button className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by user, action, or entity..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  />
                </div>
              </div>

              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>

              {/* Filters (Desktop always visible, Mobile toggleable) */}
              <div className={`flex flex-col sm:flex-row gap-3 ${showFilters ? 'flex' : 'hidden lg:flex'}`}>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-white"
                >
                  <option value="today">Today</option>
                  <option value="last-7-days">Last 7 Days</option>
                  <option value="last-30-days">Last 30 Days</option>
                  <option value="last-90-days">Last 90 Days</option>
                  <option value="custom">Custom Range</option>
                </select>

                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-white"
                >
                  {users.map(user => (
                    <option key={user.value} value={user.value}>{user.label}</option>
                  ))}
                </select>

                <select
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-white"
                >
                  {actionTypes.map(action => (
                    <option key={action.value} value={action.value}>{action.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Audit Log Table */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Table Header */}
                  <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="col-span-3">Timestamp</div>
                    <div className="col-span-3">User</div>
                    <div className="col-span-3">Action</div>
                    <div className="col-span-3">Entity</div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-gray-200">
                    {auditLogs.map((log) => (
                      <div
                        key={log.id}
                        onClick={() => setSelectedLog(log)}
                        className="px-4 md:px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
                          {/* Timestamp */}
                          <div className="md:col-span-3">
                            <p className="text-xs text-gray-500 md:hidden font-medium mb-1">Timestamp</p>
                            <p className="text-sm text-gray-900 font-mono">{log.timestamp}</p>
                          </div>

                          {/* User */}
                          <div className="md:col-span-3">
                            <p className="text-xs text-gray-500 md:hidden font-medium mb-1">User</p>
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                                {log.user.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-sm text-gray-900 truncate">{log.user}</span>
                            </div>
                          </div>

                          {/* Action */}
                          <div className="md:col-span-3">
                            <p className="text-xs text-gray-500 md:hidden font-medium mb-1">Action</p>
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium ${getActionColor(log.action)}`}>
                              <span>{getActionIcon(log.action)}</span>
                              <span>{log.action}</span>
                            </span>
                          </div>

                          {/* Entity */}
                          <div className="md:col-span-3">
                            <p className="text-xs text-gray-500 md:hidden font-medium mb-1">Entity</p>
                            <p className="text-sm text-gray-900 truncate">{log.entity}</p>
                          </div>
                        </div>

                        {/* Details (Mobile) */}
                        <div className="mt-2 md:hidden">
                          <p className="text-xs text-gray-600">{log.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Showing <span className="font-medium">1-8</span> of <span className="font-medium">247</span> events
                    </p>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        Previous
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detail Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
                  {selectedLog ? (
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
                          <button
                            onClick={() => setSelectedLog(null)}
                            className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium ${getActionColor(selectedLog.action)}`}>
                          <span>{getActionIcon(selectedLog.action)}</span>
                          <span>{selectedLog.action}</span>
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Event ID</p>
                          <p className="text-sm text-gray-900 font-mono">{selectedLog.id}</p>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Timestamp</p>
                          <p className="text-sm text-gray-900 font-mono">{selectedLog.timestamp}</p>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">User</p>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                              {selectedLog.user.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm text-gray-900">{selectedLog.user}</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">IP Address</p>
                          <p className="text-sm text-gray-900 font-mono">{selectedLog.ip}</p>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Entity</p>
                          <p className="text-sm text-gray-900">{selectedLog.entity}</p>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Description</p>
                          <p className="text-sm text-gray-700 leading-relaxed">{selectedLog.details}</p>
                        </div>

                        {selectedLog.changes && (
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Changes</p>
                            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                              {Object.entries(selectedLog.changes).map(([key, value]) => (
                                <div key={key} className="text-xs">
                                  <span className="font-medium text-gray-700">{key}:</span>
                                  <span className="ml-2 text-gray-600 font-mono">
                                    {typeof value === 'object' ? JSON.stringify(value) : value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        View Full Context
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-sm text-gray-500">Select an event to view details</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <a href="#" className="flex flex-col items-center space-y-1 px-3 py-2 text-gray-600 hover:text-gray-900">
            <span className="text-xl">📊</span>
            <span className="text-xs">Dashboard</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-1 px-3 py-2 text-gray-600 hover:text-gray-900">
            <span className="text-xl">📄</span>
            <span className="text-xs">Pages</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-1 px-3 py-2 text-blue-600">
            <span className="text-xl">🔍</span>
            <span className="text-xs font-medium">Audit</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-1 px-3 py-2 text-gray-600 hover:text-gray-900">
            <span className="text-xl">⚙️</span>
            <span className="text-xs">Settings</span>
          </a>
        </div>
      </nav>
    </div>
  );
}