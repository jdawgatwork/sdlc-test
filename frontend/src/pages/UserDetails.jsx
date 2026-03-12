function UserDetailsScreen() {
  const [isOpen, setIsOpen] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('overview');
  const [selectedRole, setSelectedRole] = React.useState('developer');
  const [isSaving, setIsSaving] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const user = {
    id: 'usr_8k3j2h9f',
    name: 'Sarah Chen',
    email: 'sarah.chen@acme.dev',
    avatar: 'SC',
    role: 'developer',
    status: 'active',
    joinedAt: '2024-01-15',
    lastLogin: '2 hours ago',
    timezone: 'PST (UTC-8)',
    githubUsername: 'sarahchen'
  };

  const permissions = [
    { id: 1, name: 'Create workspaces', enabled: true, category: 'Workspaces' },
    { id: 2, name: 'Delete workspaces', enabled: false, category: 'Workspaces' },
    { id: 3, name: 'Invite members', enabled: true, category: 'Team' },
    { id: 4, name: 'Manage billing', enabled: false, category: 'Billing' },
    { id: 5, name: 'Access API keys', enabled: true, category: 'Developer' },
    { id: 6, name: 'Edit code blocks', enabled: true, category: 'Content' },
    { id: 7, name: 'Connect GitHub repos', enabled: true, category: 'Integrations' },
    { id: 8, name: 'Export data', enabled: true, category: 'Data' }
  ];

  const loginHistory = [
    { id: 1, timestamp: '2024-03-15 14:32', location: 'San Francisco, CA', device: 'Chrome on macOS', ip: '192.168.1.45' },
    { id: 2, timestamp: '2024-03-15 09:15', location: 'San Francisco, CA', device: 'Chrome on macOS', ip: '192.168.1.45' },
    { id: 3, timestamp: '2024-03-14 16:20', location: 'San Francisco, CA', device: 'Safari on iOS', ip: '192.168.1.89' },
    { id: 4, timestamp: '2024-03-14 08:45', location: 'San Francisco, CA', device: 'Chrome on macOS', ip: '192.168.1.45' },
    { id: 5, timestamp: '2024-03-13 13:10', location: 'Oakland, CA', device: 'Chrome on macOS', ip: '192.168.2.12' }
  ];

  const activityLog = [
    { id: 1, action: 'Created workspace', target: 'API Documentation Hub', timestamp: '3 hours ago', icon: '📁' },
    { id: 2, action: 'Edited code block', target: 'authentication.js', timestamp: '5 hours ago', icon: '💻' },
    { id: 3, action: 'Connected GitHub repo', target: 'acme/backend-services', timestamp: '1 day ago', icon: '🔗' },
    { id: 4, action: 'Commented on page', target: 'Sprint Planning Q1', timestamp: '1 day ago', icon: '💬' },
    { id: 5, action: 'Invited team member', target: 'mike.torres@acme.dev', timestamp: '2 days ago', icon: '👤' },
    { id: 6, action: 'Updated profile', target: 'Added GitHub username', timestamp: '3 days ago', icon: '⚙️' }
  ];

  const roles = [
    { value: 'admin', label: 'Admin', description: 'Full access to all features' },
    { value: 'developer', label: 'Developer', description: 'Can create and edit content' },
    { value: 'viewer', label: 'Viewer', description: 'Read-only access' }
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end">
      <div className="bg-white h-full w-full md:w-2/3 lg:w-1/2 xl:w-2/5 shadow-2xl overflow-hidden flex flex-col animate-slide-in">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-900">User Details</h2>
          </div>
          <div className="flex items-center space-x-2">
            {showSuccess && (
              <span className="text-sm text-green-600 font-medium animate-fade-in">Saved!</span>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 px-6">
          <div className="flex space-x-6">
            {['overview', 'activity', 'security'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6 space-y-6">
            
            {activeTab === 'overview' && (
              <>
                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-semibold flex-shrink-0">
                      {user.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                          {user.status}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                          ID: {user.id}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Joined</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{user.joinedAt}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Last Login</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{user.lastLogin}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Timezone</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{user.timezone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">GitHub</p>
                      <p className="mt-1 text-sm font-medium text-indigo-600">@{user.githubUsername}</p>
                    </div>
                  </div>
                </div>

                {/* Role Selector */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Role & Access Level</h4>
                  <div className="space-y-3">
                    {roles.map(role => (
                      <label
                        key={role.value}
                        className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedRole === role.value
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={role.value}
                          checked={selectedRole === role.value}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          className="mt-1 text-indigo-600 focus:ring-indigo-500"
                        />
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">{role.label}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{role.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Permissions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Permissions</h4>
                  <div className="space-y-1">
                    {permissions.map(permission => (
                      <div
                        key={permission.id}
                        className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{permission.name}</p>
                          <p className="text-xs text-gray-500">{permission.category}</p>
                        </div>
                        {permission.enabled ? (
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'activity' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h4>
                <div className="space-y-4">
                  {activityLog.map((activity, index) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.action}</span>
                          {' · '}
                          <span className="text-gray-600">{activity.target}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{activity.timestamp}</p>
                      </div>
                      {index < activityLog.length - 1 && (
                        <div className="absolute left-10 top-12 w-px h-6 bg-gray-200"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-gray-900">Login History</h4>
                  <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200">
                    Export All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wide">Time</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wide hidden md:table-cell">Location</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wide">Device</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wide hidden lg:table-cell">IP Address</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {loginHistory.map(login => (
                        <tr key={login.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="py-3 px-2 text-gray-900 whitespace-nowrap">{login.timestamp}</td>
                          <td className="py-3 px-2 text-gray-600 hidden md:table-cell">{login.location}</td>
                          <td className="py-3 px-2 text-gray-600">{login.device}</td>
                          <td className="py-3 px-2 text-gray-500 font-mono text-xs hidden lg:table-cell">{login.ip}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h5 className="text-sm font-semibold text-gray-900 mb-3">Security Actions</h5>
                  <div className="space-y-2">
                    <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 text-sm text-gray-700">
                      Force Password Reset
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 text-sm text-gray-700">
                      Revoke All Sessions
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-lg border border-red-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 text-sm text-red-600">
                      Suspend Account
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}