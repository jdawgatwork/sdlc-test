function TransactionDetailScreen() {
  const [activeTab, setActiveTab] = React.useState('details');
  const [isNotesExpanded, setIsNotesExpanded] = React.useState(false);
  const [noteText, setNoteText] = React.useState('');
  const [showActionMenu, setShowActionMenu] = React.useState(false);

  const transaction = {
    id: 'TXN-2024-00147',
    type: 'API Request',
    status: 'completed',
    createdAt: '2024-01-15T14:32:00Z',
    completedAt: '2024-01-15T14:32:03Z',
    initiatedBy: 'sarah.chen@example.com',
    endpoint: '/api/v1/documents/create',
    method: 'POST',
    duration: '3.2s',
    requestSize: '2.4 MB',
    responseCode: 201
  };

  const statusTimeline = [
    { status: 'initiated', timestamp: '2024-01-15T14:32:00Z', user: 'sarah.chen@example.com', message: 'Transaction initiated' },
    { status: 'validating', timestamp: '2024-01-15T14:32:01Z', user: 'system', message: 'Schema validation passed' },
    { status: 'processing', timestamp: '2024-01-15T14:32:02Z', user: 'system', message: 'Processing document creation' },
    { status: 'completed', timestamp: '2024-01-15T14:32:03Z', user: 'system', message: 'Transaction completed successfully' }
  ];

  const dataFields = [
    { label: 'Document Title', value: 'Q1 Architecture Review', type: 'string' },
    { label: 'Workspace', value: 'engineering-docs', type: 'reference' },
    { label: 'Template', value: 'technical-spec', type: 'reference' },
    { label: 'Collaborators', value: '4 users', type: 'array' },
    { label: 'Initial Content', value: '1,247 characters', type: 'text' },
    { label: 'Tags', value: 'architecture, review, q1', type: 'array' }
  ];

  const documents = [
    { id: 1, name: 'request-payload.json', size: '2.4 MB', uploadedAt: '2024-01-15T14:32:00Z' },
    { id: 2, name: 'validation-report.pdf', size: '156 KB', uploadedAt: '2024-01-15T14:32:01Z' },
    { id: 3, name: 'response-body.json', size: '890 KB', uploadedAt: '2024-01-15T14:32:03Z' }
  ];

  const auditLog = [
    { id: 1, timestamp: '2024-01-15T14:32:03Z', action: 'Transaction completed', user: 'system', details: 'Status changed to completed' },
    { id: 2, timestamp: '2024-01-15T14:32:02Z', action: 'Document created', user: 'system', details: 'Document ID: DOC-2024-00891' },
    { id: 3, timestamp: '2024-01-15T14:32:01Z', action: 'Validation passed', user: 'system', details: 'All schema validations successful' },
    { id: 4, timestamp: '2024-01-15T14:32:00Z', action: 'Transaction initiated', user: 'sarah.chen@example.com', details: 'API request received' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      initiated: 'bg-blue-100 text-blue-700 border-blue-200',
      validating: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      processing: 'bg-purple-100 text-purple-700 border-purple-200',
      completed: 'bg-green-100 text-green-700 border-green-200',
      failed: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className="hidden md:block fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">DevWorkspace</h1>
        </div>
        <nav className="px-3 space-y-1">
          <a href="/dashboard" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <span className="mr-3">📊</span>
            Dashboard
          </a>
          <a href="/documents" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <span className="mr-3">📄</span>
            Documents
          </a>
          <a href="/transactions" className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg">
            <span className="mr-3">🔄</span>
            Transactions
          </a>
          <a href="/integrations" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <span className="mr-3">🔌</span>
            Integrations
          </a>
          <a href="/settings" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <span className="mr-3">⚙️</span>
            Settings
          </a>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          <a href="/dashboard" className="flex flex-col items-center py-2 text-xs text-gray-600 hover:text-gray-900 transition-colors">
            <span className="text-lg mb-1">📊</span>
            Dashboard
          </a>
          <a href="/documents" className="flex flex-col items-center py-2 text-xs text-gray-600 hover:text-gray-900 transition-colors">
            <span className="text-lg mb-1">📄</span>
            Docs
          </a>
          <a href="/transactions" className="flex flex-col items-center py-2 text-xs text-gray-900 font-medium">
            <span className="text-lg mb-1">🔄</span>
            Transactions
          </a>
          <a href="/integrations" className="flex flex-col items-center py-2 text-xs text-gray-600 hover:text-gray-900 transition-colors">
            <span className="text-lg mb-1">🔌</span>
            Integrations
          </a>
          <a href="/settings" className="flex flex-col items-center py-2 text-xs text-gray-600 hover:text-gray-900 transition-colors">
            <span className="text-lg mb-1">⚙️</span>
            Settings
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="md:ml-64 pb-20 md:pb-8">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <a href="/transactions" className="text-gray-500 hover:text-gray-700 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </a>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{transaction.id}</h1>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {transaction.method} {transaction.endpoint}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all">
                  Export
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all">
                  Share
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setShowActionMenu(!showActionMenu)}
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all"
                  >
                    Actions
                  </button>
                  {showActionMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                      <button className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors">
                        Retry Transaction
                      </button>
                      <button className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors">
                        Clone Transaction
                      </button>
                      <button className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition-colors">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">Duration</p>
              <p className="text-lg font-semibold text-gray-900">{transaction.duration}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">Response Code</p>
              <p className="text-lg font-semibold text-green-600">{transaction.responseCode}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">Request Size</p>
              <p className="text-lg font-semibold text-gray-900">{transaction.requestSize}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">Initiated By</p>
              <p className="text-sm font-medium text-gray-900 truncate">{transaction.initiatedBy.split('@')[0]}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <div className="border-b border-gray-200 overflow-x-auto">
              <nav className="flex space-x-6 px-6" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === 'details'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === 'timeline'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === 'documents'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Documents
                </button>
                <button
                  onClick={() => setActiveTab('audit')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === 'audit'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Audit Log
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* Details Tab */}
              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Data Fields</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dataFields.map((field, index) => (
                        <div key={index} className="border-l-2 border-gray-200 pl-4">
                          <p className="text-xs font-medium text-gray-500 mb-1">{field.label}</p>
                          <p className="text-sm text-gray-900">{field.value}</p>
                          <p className="text-xs text-gray-400 mt-1">Type: {field.type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Validation Results</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-600">✓</span>
                        <span className="text-gray-700">Schema validation passed</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-600">✓</span>
                        <span className="text-gray-700">Authentication verified</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-600">✓</span>
                        <span className="text-gray-700">Rate limit check passed</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-600">✓</span>
                        <span className="text-gray-700">Workspace permissions verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Timeline Tab */}
              {activeTab === 'timeline' && (
                <div className="space-y-4">
                  {statusTimeline.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(item.status)}`}>
                          {index === statusTimeline.length - 1 ? '✓' : '•'}
                        </div>
                        {index < statusTimeline.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-gray-900 capitalize">{item.status}</h4>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{formatTimestamp(item.timestamp)}</span>
                        </div>
                        <p className="text-sm text-gray-600">{item.message}</p>
                        <p className="text-xs text-gray-500 mt-1">by {item.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Documents Tab */}
              {activeTab === 'documents' && (
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg">📎</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.size} • {formatTimestamp(doc.uploadedAt)}</p>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Audit Log Tab */}
              {activeTab === 'audit' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {auditLog.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{formatTimestamp(log.timestamp)}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{log.action}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{log.user}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{log.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-white rounded-lg border border-gray-200">
            <button
              onClick={() => setIsNotesExpanded(!isNotesExpanded)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-sm font-semibold text-gray-900">Notes & Comments</h3>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${isNotesExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isNotesExpanded && (
              <div className="px-6 pb-6 border-t border-gray-200">
                <div className="mt-4">
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Add a note or comment..."
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none transition-all"
                    rows="4"
                  />
                  <div className="flex justify-end gap-2 mt-3">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                      Cancel
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all">
                      Add Note
                    </button>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="border-l-2 border-gray-300 pl-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900">Sarah Chen</p>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Document created successfully. Notified all collaborators via email.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}