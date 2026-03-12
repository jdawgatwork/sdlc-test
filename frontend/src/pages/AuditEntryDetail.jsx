function AuditEntryDetailScreen() {
  const [activeTab, setActiveTab] = React.useState('changes');
  const [isClosing, setIsClosing] = React.useState(false);

  const auditEntry = {
    id: 'ae_9k2m4n8p',
    timestamp: '2024-01-15T14:32:18Z',
    action: 'document.updated',
    user: {
      name: 'Sarah Chen',
      email: 'sarah.chen@acme.dev',
      avatar: 'SC',
      role: 'Engineering Lead'
    },
    resource: {
      type: 'Document',
      id: 'doc_auth_flow_v2',
      name: 'Authentication Flow v2.0'
    },
    session: {
      id: 'sess_x7y9z2a4',
      ip: '192.168.1.42',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      location: 'San Francisco, CA',
      device: 'Desktop'
    },
    changes: {
      title: {
        before: 'Authentication Flow',
        after: 'Authentication Flow v2.0'
      },
      status: {
        before: 'draft',
        after: 'in_review'
      },
      content: {
        before: '// OAuth 2.0 implementation\nconst handleAuth = () => {...}',
        after: '// OAuth 2.0 + PKCE implementation\nconst handleAuth = async () => {...}'
      }
    },
    metadata: {
      duration: '2.3s',
      source: 'web_editor',
      version: 'v2.1.3'
    }
  };

  const relatedEntries = [
    { id: 'ae_8h1j3k5m', action: 'document.created', user: 'Sarah Chen', time: '2h ago' },
    { id: 'ae_7g0i2j4l', action: 'comment.added', user: 'Mike Torres', time: '3h ago' },
    { id: 'ae_6f9h1i3k', action: 'document.viewed', user: 'Emma Wilson', time: '5h ago' }
  ];

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => window.history.back(), 200);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActionColor = (action) => {
    if (action.includes('created')) return 'text-green-600 bg-green-50';
    if (action.includes('deleted')) return 'text-red-600 bg-red-50';
    if (action.includes('updated')) return 'text-blue-600 bg-blue-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col transition-all duration-200 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Audit Entry Details</h2>
              <p className="text-sm text-gray-500">{auditEntry.id}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Entry Metadata Card */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    {auditEntry.user.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{auditEntry.user.name}</p>
                    <p className="text-sm text-gray-500">{auditEntry.user.email}</p>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getActionColor(auditEntry.action)}`}>
                    {auditEntry.action}
                  </span>
                  <p className="text-sm text-gray-500 mt-2">{formatDate(auditEntry.timestamp)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Resource</p>
                  <p className="text-sm text-gray-900 mt-1">{auditEntry.resource.name}</p>
                  <p className="text-xs text-gray-500">{auditEntry.resource.type} · {auditEntry.resource.id}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Duration</p>
                  <p className="text-sm text-gray-900 mt-1">{auditEntry.metadata.duration}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Source</p>
                  <p className="text-sm text-gray-900 mt-1">{auditEntry.metadata.source.replace('_', ' ')}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab('changes')}
                  className={`pb-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    activeTab === 'changes'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Changes
                </button>
                <button
                  onClick={() => setActiveTab('session')}
                  className={`pb-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    activeTab === 'session'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Session Details
                </button>
                <button
                  onClick={() => setActiveTab('related')}
                  className={`pb-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    activeTab === 'related'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Related Entries
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'changes' && (
              <div className="space-y-4">
                {Object.entries(auditEntry.changes).map(([field, values]) => (
                  <div key={field} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-700 capitalize">{field.replace('_', ' ')}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                      <div className="p-4">
                        <p className="text-xs font-medium text-red-600 uppercase tracking-wide mb-2">Before</p>
                        <pre className="text-sm text-gray-900 font-mono bg-red-50 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap break-words">
                          {values.before}
                        </pre>
                      </div>
                      <div className="p-4">
                        <p className="text-xs font-medium text-green-600 uppercase tracking-wide mb-2">After</p>
                        <pre className="text-sm text-gray-900 font-mono bg-green-50 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap break-words">
                          {values.after}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'session' && (
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Session ID</p>
                      <p className="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded-lg">{auditEntry.session.id}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">IP Address</p>
                      <p className="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded-lg">{auditEntry.session.ip}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Location</p>
                      <p className="text-sm text-gray-900">{auditEntry.session.location}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Device</p>
                      <p className="text-sm text-gray-900">{auditEntry.session.device}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">User Agent</p>
                    <p className="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded-lg break-all">{auditEntry.session.userAgent}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'related' && (
              <div className="space-y-3">
                {relatedEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{entry.action}</p>
                          <p className="text-xs text-gray-500">by {entry.user}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">{entry.time}</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-gray-500">
            App version: {auditEntry.metadata.version}
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Export JSON
            </button>
            <button 
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}