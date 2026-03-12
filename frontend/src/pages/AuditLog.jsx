function AuditLogScreen() {
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterPanelOpen, setFilterPanelOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState('last-7-days');
  const [selectedUser, setSelectedUser] = React.useState('all');
  const [selectedAction, setSelectedAction] = React.useState('all');
  const [selectedEntity, setSelectedEntity] = React.useState('all');
  const [currentPage, setCurrentPage] = React.useState(1);

  const auditLogs = [
    {
      id: 'evt_9k2m4n5p',
      timestamp: '2024-01-15T14:32:18Z',
      user: 'sarah.chen@acme.dev',
      avatar: 'SC',
      action: 'document.updated',
      actionLabel: 'Updated Document',
      entity: 'API Rate Limiting Strategy',
      entityType: 'document',
      ipAddress: '192.168.1.45',
      location: 'San Francisco, CA',
      details: 'Modified 3 code blocks, added 142 characters',
      severity: 'info'
    },
    {
      id: 'evt_8h1j2k3l',
      timestamp: '2024-01-15T14:28:03Z',
      user: 'marcus.kim@acme.dev',
      avatar: 'MK',
      action: 'integration.connected',
      actionLabel: 'Connected Integration',
      entity: 'GitHub Repository: backend-api',
      entityType: 'integration',
      ipAddress: '10.0.2.18',
      location: 'Austin, TX',
      details: 'OAuth authorization granted, webhook configured',
      severity: 'success'
    },
    {
      id: 'evt_7g9h0i1j',
      timestamp: '2024-01-15T14:15:47Z',
      user: 'admin@acme.dev',
      avatar: 'AD',
      action: 'user.permissions.changed',
      actionLabel: 'Changed Permissions',
      entity: 'jessica.wong@acme.dev',
      entityType: 'user',
      ipAddress: '172.16.0.5',
      location: 'New York, NY',
      details: 'Role changed from "Member" to "Admin"',
      severity: 'warning'
    },
    {
      id: 'evt_6f7g8h9i',
      timestamp: '2024-01-15T13:58:22Z',
      user: 'david.park@acme.dev',
      avatar: 'DP',
      action: 'workspace.created',
      actionLabel: 'Created Workspace',
      entity: 'Q1 2024 Planning',
      entityType: 'workspace',
      ipAddress: '192.168.1.89',
      location: 'Seattle, WA',
      details: 'New workspace with 5 initial members',
      severity: 'info'
    },
    {
      id: 'evt_5e6f7g8h',
      timestamp: '2024-01-15T13:42:11Z',
      user: 'emma.rodriguez@acme.dev',
      avatar: 'ER',
      action: 'code.executed',
      actionLabel: 'Executed Code',
      entity: 'data-pipeline.py',
      entityType: 'code',
      ipAddress: '10.1.3.27',
      location: 'Miami, FL',
      details: 'Python script executed successfully, 2.3s runtime',
      severity: 'info'
    },
    {
      id: 'evt_4d5e6f7g',
      timestamp: '2024-01-15T13:25:33Z',
      user: 'system',
      avatar: 'SY',
      action: 'backup.completed',
      actionLabel: 'Backup Completed',
      entity: 'Daily automated backup',
      entityType: 'system',
      ipAddress: 'internal',
      location: 'AWS us-west-2',
      details: '1.2 GB backed up to S3, 847 documents',
      severity: 'success'
    },
    {
      id: 'evt_3c4d5e6f',
      timestamp: '2024-01-15T12:58:09Z',
      user: 'alex.thompson@acme.dev',
      avatar: 'AT',
      action: 'document.deleted',
      actionLabel: 'Deleted Document',
      entity: 'Draft: Old Architecture Proposal',
      entityType: 'document',
      ipAddress: '192.168.1.103',
      location: 'Boston, MA',
      details: 'Permanent deletion after 30 days in trash',
      severity: 'warning'
    },
    {
      id: 'evt_2b3c4d5e',
      timestamp: '2024-01-15T12:33:45Z',
      user: 'priya.patel@acme.dev',
      avatar: 'PP',
      action: 'api.key.generated',
      actionLabel: 'Generated API Key',
      entity: 'Production API Key',
      entityType: 'api_key',
      ipAddress: '10.0.5.42',
      location: 'Chicago, IL',
      details: 'New API key created with write permissions',
      severity: 'warning'
    },
    {
      id: 'evt_1a2b3c4d',
      timestamp: '2024-01-15T11:47:18Z',
      user: 'jordan.lee@acme.dev',
      avatar: 'JL',
      action: 'comment.added',
      actionLabel: 'Added Comment',
      entity: 'Sprint Planning Doc',
      entityType: 'document',
      ipAddress: '192.168.1.67',
      location: 'Portland, OR',
      details: 'Commented on Task #127',
      severity: 'info'
    },
    {
      id: 'evt_0z1a2b3c',
      timestamp: '2024-01-15T11:22:56Z',
      user: 'system',
      avatar: 'SY',
      action: 'security.scan.completed',
      actionLabel: 'Security Scan',
      entity: 'Weekly vulnerability scan',
      entityType: 'system',
      ipAddress: 'internal',
      location: 'AWS us-east-1',
      details: 'No critical vulnerabilities detected',
      severity: 'success'
    }
  ];

  const actionTypes = [
    'all',
    'document.updated',
    'document.created',
    'document.deleted',
    'user.permissions.changed',
    'integration.connected',
    'code.executed',
    'api.key.generated',
    'workspace.created',
    'backup.completed',
    'security.scan.completed'
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'success':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'warning':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'error':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="font-semibold text-gray-900">DevNotion</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <a href="/dashboard" className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-sm font-medium">Dashboard</span>
          </a>
          <a href="/workspaces" className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span className="text-sm font-medium">Workspaces</span>
          </a>
          <a href="/code-editor" className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="text-sm font-medium">Code Editor</span>
          </a>
          <a href="/integrations" className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
            <span className="text-sm font-medium">Integrations</span>
          </a>
          
          <div className="pt-4 mt-4 border-t border-gray-200">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Admin</p>
            <a href="/admin/users" className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-sm font-medium">Users</span>
            </a>
            <a href="/admin/audit" className="flex items-center space-x-3 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium">Audit Log</span>
            </a>
            <a href="/admin/settings" className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium">Settings</span>
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Audit Log</h1>
                <p className="mt-1 text-sm text-gray-500">Track all system activities and user actions</p>
              </div>
              <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export CSV
              </button>
            </div>
          </div>
        </header>

        {/* Filters and Search */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 bg-white border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events, users, or entities..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-shadow duration-200"
                />
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <option value="today">Today</option>
                <option value="last-7-days">Last 7 days</option>
                <option value="last-30-days">Last 30 days</option>
                <option value="last-90-days">Last 90 days</option>
                <option value="custom">Custom range</option>
              </select>

              <button
                onClick={() => setFilterPanelOpen(!filterPanelOpen)}
                className={`inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium transition-colors duration-200 ${
                  filterPanelOpen
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
                {(selectedUser !== 'all' || selectedAction !== 'all' || selectedEntity !== 'all') && (
                  <span className="ml-2 px-2 py-0.5 bg-indigo-600 text-white text-xs rounded-full">
                    {[selectedUser !== 'all', selectedAction !== 'all', selectedEntity !== 'all'].filter(Boolean).length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Advanced Filter Panel */}
          {filterPanelOpen && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User</label>
                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  >
                    <option value="all">All users</option>
                    <option value="sarah.chen@acme.dev">sarah.chen@acme.dev</option>
                    <option value="marcus.kim@acme.dev">marcus.kim@acme.dev</option>
                    <option value="admin@acme.dev">admin@acme.dev</option>
                    <option value="system">System</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
                  <select
                    value={selectedAction}
                    onChange={(e) => setSelectedAction(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  >
                    <option value="all">All actions</option>
                    <option value="document.updated">Document Updated</option>
                    <option value="document.deleted">Document Deleted</option>
                    <option value="user.permissions.changed">Permissions Changed</option>
                    <option value="integration.connected">Integration Connected</option>
                    <option value="code.executed">Code Executed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Entity Type</label>
                  <select
                    value={selectedEntity}
                    onChange={(e) => setSelectedEntity(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  >
                    <option value="all">All entities</option>
                    <option value="document">Documents</option>
                    <option value="user">Users</option>
                    <option value="workspace">Workspaces</option>
                    <option value="integration">Integrations</option>
                    <option value="code">Code</option>
                    <option value="system">System</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end space-x-3">
                <button
                  onClick={() => {
                    setSelectedUser('all');
                    setSelectedAction('all');
                    setSelectedEntity('all');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Audit Log Table */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header - Hidden on mobile */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-2">Timestamp</div>
              <div className="col-span-2">User</div>
              <div className="col-span-2">Action</div>
              <div className="col-span-3">Entity</div>
              <div className="col-span-2">Location</div>
              <div className="col-span-1">Details</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  onClick={() => setSelectedEvent(log)}
                >
                  {/* Mobile Layout */}
                  <div className="lg:hidden space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {log.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{log.user}</p>
                          <p className="text-xs text-gray-500">{formatTimestamp(log.timestamp)}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getSeverityColor(log.severity)}`}>
                        {log.actionLabel}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 font-medium">{log.entity}</p>
                      <p className="text-xs text-gray-500 mt-1">{log.details}</p>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-center">
                    <div className="col-span-2">
                      <p className="text-sm text-gray-900">{formatTimestamp(log.timestamp)}</p>
                      <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</p>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {log.avatar}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{log.user}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md border ${getSeverityColor(log.severity)}`}>
                        {log.actionLabel}
                      </span>
                    </div>
                    <div className="col-span-3">
                      <p className="text-sm text-gray-900 font-medium truncate">{log.entity}</p>
                      <p className="text-xs text-gray-500 capitalize">{log.entityType}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-700">{log.location}</p>
                      <p className="text-xs text-gray-500">{log.ipAddress}</p>
                    </div>
                    <div className="col-span-1 text-right">
                      <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors duration-200">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">247</span> events
              </p>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                <button className="px-3 py-2 bg-indigo-600 border border-indigo-600 rounded-lg text-sm font-medium text-white">
                  1
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  2
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  3
                </button>
                <span className="px-3 py-2 text-sm text-gray-500">...</span>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  25
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Event Detail Drawer */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setSelectedEvent(null)}
            ></div>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-md transform transition-transform duration-300 ease-in-out">
                <div className="h-full flex flex-col bg-white shadow-xl">
                  {/* Drawer Header */}
                  <div className="px-6 py-6 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">Event Details</h2>
                        <p className="mt-1 text-sm text-gray-500">{selectedEvent.id}</p>
                      </div>
                      <button
                        onClick={() => setSelectedEvent(null)}
                        className="ml-3 text-gray-400 hover:text-gray-500 transition-colors duration-200"
                      >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Drawer Content */}
                  <div className="flex-1 overflow-y-auto px-6 py-6">
                    <div className="space-y-6">
                      {/* Action Badge */}
                      <div>
                        <span className={`inline-flex px-3 py-1.5 text-sm font-medium rounded-lg border ${getSeverityColor(selectedEvent.severity)}`}>
                          {selectedEvent.actionLabel}
                        </span>
                      </div>

                      {/* User Info */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">User</h3>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                            {selectedEvent.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{selectedEvent.user}</p>
                            <p className="text-xs text-gray-500">{selectedEvent.location}</p>
                          </div>
                        </div>
                      </div>

                      {/* Timestamp */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Timestamp</h3>
                        <p className="text-sm text-gray-900">{new Date(selectedEvent.timestamp).toLocaleString()}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatTimestamp(selectedEvent.timestamp)}</p>
                      </div>

                      {/* Entity */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Entity</h3>
                        <p className="text-sm font-medium text-gray-900">{selectedEvent.entity}</p>
                        <p className="text-xs text-gray-500 mt-1 capitalize">{selectedEvent.entityType}</p>
                      </div>

                      {/* Details */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Details</h3>
                        <p className="text-sm text-gray-700">{selectedEvent.details}</p>
                      </div>

                      {/* Network Info */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Network</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">IP Address</span>
                            <span className="text-sm font-medium text-gray-900">{selectedEvent.ipAddress}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Location</span>
                            <span className="text-sm font-medium text-gray-900">{selectedEvent.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Metadata */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Metadata</h3>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
{`{
  "event_id": "${selectedEvent.id}",
  "action": "${selectedEvent.action}",
  "entity_type": "${selectedEvent.entityType}",
  "severity": "${selectedEvent.severity}",
  "timestamp": "${selectedEvent.timestamp}"
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Drawer Footer */}
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <button className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                      Export Event Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 px-4 py-2 z-20">
        <div className="flex items-center justify-around">
          <a href="/dashboard" className="flex flex-col items-center py-2 text-gray-500 hover:text-gray-900 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </a>
          <a href="/workspaces" className="flex flex-col items-center py-2 text-gray-500 hover:text-gray-900 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span className="text-xs mt-1">Work</span>
          </a>
          <a href="/code-editor" className="flex flex-col items-center py-2 text-gray-500 hover:text-gray-900 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="text-xs mt-1">Code</span>
          </a>
          <a href="/admin/audit" className="flex flex-col items-center py-2 text-indigo-600 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs mt-1 font-medium">Audit</span>
          </a>
        </div>
      </nav>
    </div>
  );
}