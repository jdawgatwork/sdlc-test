function TransactionDetailScreen() {
  const [activeTab, setActiveTab] = React.useState('details');
  const [comment, setComment] = React.useState('');
  const [showCommentForm, setShowCommentForm] = React.useState(false);

  const transaction = {
    id: 'TXN-2024-00847',
    title: 'API Rate Limit Upgrade - Enterprise Plan',
    status: 'pending_approval',
    amount: '$2,499.00',
    createdAt: '2024-01-15 14:32:00 UTC',
    createdBy: 'sarah.chen@devteam.io',
    category: 'Infrastructure',
    priority: 'high',
    description: 'Upgrade API rate limits from 10k to 100k requests/hour to support Q1 growth projections',
    metadata: {
      apiEndpoint: '/v2/workspaces',
      currentLimit: '10,000 req/hr',
      requestedLimit: '100,000 req/hr',
      estimatedUsage: '75,000 req/hr',
      businessJustification: 'Current usage at 92% capacity during peak hours'
    }
  };

  const statusHistory = [
    { status: 'created', timestamp: '2024-01-15 14:32:00', user: 'sarah.chen@devteam.io', note: 'Transaction initiated' },
    { status: 'submitted', timestamp: '2024-01-15 14:35:12', user: 'sarah.chen@devteam.io', note: 'Submitted for review' },
    { status: 'under_review', timestamp: '2024-01-15 15:20:45', user: 'michael.wong@devteam.io', note: 'Technical review started' },
    { status: 'pending_approval', timestamp: '2024-01-16 09:15:30', user: 'michael.wong@devteam.io', note: 'Awaiting finance approval' }
  ];

  const auditLog = [
    { id: 1, action: 'Status changed', details: 'under_review → pending_approval', user: 'michael.wong@devteam.io', timestamp: '2024-01-16 09:15:30' },
    { id: 2, action: 'Comment added', details: 'Reviewed usage metrics, approved from engineering side', user: 'michael.wong@devteam.io', timestamp: '2024-01-16 09:14:18' },
    { id: 3, action: 'Document uploaded', details: 'usage-forecast-q1.pdf', user: 'sarah.chen@devteam.io', timestamp: '2024-01-15 16:42:00' },
    { id: 4, action: 'Field updated', details: 'Priority changed from medium to high', user: 'sarah.chen@devteam.io', timestamp: '2024-01-15 14:38:22' },
    { id: 5, action: 'Status changed', details: 'submitted → under_review', user: 'system', timestamp: '2024-01-15 15:20:45' }
  ];

  const comments = [
    { id: 1, user: 'michael.wong@devteam.io', avatar: 'MW', timestamp: '2024-01-16 09:14:18', text: 'Reviewed usage metrics and growth projections. Engineering approves this upgrade. The forecast shows we\'ll hit current limits by end of month.' },
    { id: 2, user: 'sarah.chen@devteam.io', avatar: 'SC', timestamp: '2024-01-15 16:45:00', text: 'Added Q1 usage forecast document showing projected 85k req/hr by March. Current 92% utilization is causing occasional 429 errors during peak hours.' }
  ];

  const documents = [
    { id: 1, name: 'usage-forecast-q1.pdf', size: '847 KB', uploadedBy: 'sarah.chen@devteam.io', uploadedAt: '2024-01-15 16:42:00' },
    { id: 2, name: 'cost-analysis.xlsx', size: '124 KB', uploadedBy: 'sarah.chen@devteam.io', uploadedAt: '2024-01-15 14:38:00' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      created: 'bg-gray-100 text-gray-700',
      submitted: 'bg-blue-100 text-blue-700',
      under_review: 'bg-purple-100 text-purple-700',
      pending_approval: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const formatStatus = (status) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">N</span>
                </div>
                <span className="text-lg font-semibold text-gray-900 hidden sm:block">Notion for Developers</span>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <a href="/dashboard" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200">Dashboard</a>
                <a href="/workspaces" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200">Workspaces</a>
                <a href="/transactions" className="px-3 py-2 text-sm text-indigo-600 bg-indigo-50 rounded-md font-medium">Transactions</a>
                <a href="/docs" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200">Documents</a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">SC</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <a href="/transactions" className="hover:text-gray-900 transition-colors duration-200">Transactions</a>
          <span>/</span>
          <span className="text-gray-900">{transaction.id}</span>
        </div>

        {/* Transaction Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
            <div className="flex-1 mb-4 lg:mb-0">
              <div className="flex items-center space-x-3 mb-3">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{transaction.title}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                  {formatStatus(transaction.status)}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{transaction.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{transaction.createdBy}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{transaction.createdAt}</span>
                </span>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                  {transaction.priority.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:ml-6">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all duration-200 hover:shadow-md">
                Approve Transaction
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                Request Changes
              </button>
              <button className="px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200">
                Reject
              </button>
            </div>
          </div>

          {/* Amount Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100">
            <p className="text-sm text-indigo-600 font-medium mb-1">Transaction Amount</p>
            <p className="text-3xl font-bold text-indigo-900">{transaction.amount}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200 px-6">
            <div className="flex space-x-1 overflow-x-auto">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  activeTab === 'details'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  activeTab === 'timeline'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                Status Timeline
              </button>
              <button
                onClick={() => setActiveTab('audit')}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  activeTab === 'audit'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                Audit Log
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  activeTab === 'documents'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                Documents
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Transaction ID</label>
                    <p className="text-gray-900 font-mono text-sm bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">{transaction.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">{transaction.category}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-1">API Endpoint</p>
                      <p className="text-gray-900 font-mono text-sm">{transaction.metadata.apiEndpoint}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-1">Current Limit</p>
                      <p className="text-gray-900 font-mono text-sm">{transaction.metadata.currentLimit}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-1">Requested Limit</p>
                      <p className="text-gray-900 font-mono text-sm">{transaction.metadata.requestedLimit}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-1">Estimated Usage</p>
                      <p className="text-gray-900 font-mono text-sm">{transaction.metadata.estimatedUsage}</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <p className="text-sm font-medium text-amber-900 mb-1">Business Justification</p>
                    <p className="text-amber-800 text-sm">{transaction.metadata.businessJustification}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="space-y-4">
                {statusHistory.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 relative">
                    {index !== statusHistory.length - 1 && (
                      <div className="absolute left-4 top-10 bottom-0 w-px bg-gray-200"></div>
                    )}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getStatusColor(item.status)}`}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <p className="font-medium text-gray-900">{formatStatus(item.status)}</p>
                        <p className="text-sm text-gray-500">{item.timestamp}</p>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{item.note}</p>
                      <p className="text-xs text-gray-500">{item.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Audit Log Tab */}
            {activeTab === 'audit' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Action</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 hidden md:table-cell">Details</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">User</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 hidden lg:table-cell">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLog.map((log) => (
                      <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                        <td className="py-3 px-4 text-sm text-gray-900">{log.action}</td>
                        <td className="py-3 px-4 text-sm text-gray-600 hidden md:table-cell font-mono text-xs">{log.details}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{log.user.split('@')[0]}</td>
                        <td className="py-3 px-4 text-sm text-gray-500 hidden lg:table-cell">{log.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-200">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-500">{doc.size} • Uploaded by {doc.uploadedBy.split('@')[0]}</p>
                      </div>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="font-medium">Upload Document</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Comments</h2>
            <button
              onClick={() => setShowCommentForm(!showCommentForm)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-200"
            >
              Add Comment
            </button>
          </div>

          {showCommentForm && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add your comment..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-200 resize-none"
                rows="4"
              />
              <div className="flex justify-end space-x-2 mt-3">
                <button
                  onClick={() => setShowCommentForm(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                  Post Comment
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">{comment.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-medium text-gray-900">{comment.user.split('@')[0]}</p>
                    <span className="text-sm text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
        <div className="grid grid-cols-4 gap-1">
          <a href="/dashboard" className="flex flex-col items-center justify-center py-3 text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs">Home</span>
          </a>
          <a href="/workspaces" className="flex flex-col items-center justify-center py-3 text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span className="text-xs">Workspaces</span>
          </a>
          <a href="/transactions" className="flex flex-col items-center justify-center py-3 text-indigo-600 transition-colors duration-200">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs font-medium">Transactions</span>
          </a>
          <a href="/docs" className="flex flex-col items-center justify-center py-3 text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">Docs</span>
          </a>
        </div>
      </nav>
    </div>
  );
}