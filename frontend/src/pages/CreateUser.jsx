function CreateUserScreen() {
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const [formData, setFormData] = React.useState({
    email: '',
    name: '',
    role: 'developer'
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [activeNav, setActiveNav] = React.useState('users');

  const roles = [
    { value: 'developer', label: 'Developer', description: 'Full access to workspaces and code editing' },
    { value: 'viewer', label: 'Viewer', description: 'Read-only access to shared workspaces' },
    { value: 'admin', label: 'Admin', description: 'Full system access and user management' },
    { value: 'team-lead', label: 'Team Lead', description: 'Manage team workspaces and permissions' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1500);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="text-lg font-semibold text-gray-900 hidden sm:block">Notion for Developers</span>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <button 
                  onClick={() => setActiveNav('workspaces')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activeNav === 'workspaces' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Workspaces
                </button>
                <button 
                  onClick={() => setActiveNav('integrations')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activeNav === 'integrations' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Integrations
                </button>
                <button 
                  onClick={() => setActiveNav('users')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activeNav === 'users' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Users
                </button>
                <button 
                  onClick={() => setActiveNav('settings')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activeNav === 'settings' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Settings
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Admin</h2>
            <nav className="space-y-1">
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Users
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Teams
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Permissions
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Audit Logs
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-sm md:text-base text-gray-600">Manage user accounts and SSO invitations</p>
          </div>

          {/* Users Table/List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-200"
                />
              </div>
              <button className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add User
              </button>
            </div>

            {/* Table - Hidden on mobile, shown as cards */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Active</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-medium">SK</span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Sarah Kim</p>
                          <p className="text-sm text-gray-500">sarah.kim@company.dev</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">Developer</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center text-sm text-green-600">
                        <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">2 hours ago</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">MC</span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Marcus Chen</p>
                          <p className="text-sm text-gray-500">marcus.chen@company.dev</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Admin</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center text-sm text-green-600">
                        <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">5 minutes ago</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-medium">AP</span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Aisha Patel</p>
                          <p className="text-sm text-gray-500">aisha.patel@company.dev</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">Team Lead</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center text-sm text-gray-500">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">Invited 3 days ago</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-200">
              <div className="p-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-medium">SK</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Sarah Kim</p>
                      <p className="text-xs text-gray-500">sarah.kim@company.dev</p>
                    </div>
                  </div>
                  <button className="text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 font-medium">Developer</span>
                  <span className="text-gray-500">2 hours ago</span>
                </div>
              </div>
              <div className="p-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium">MC</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Marcus Chen</p>
                      <p className="text-xs text-gray-500">marcus.chen@company.dev</p>
                    </div>
                  </div>
                  <button className="text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-purple-100 text-purple-800 font-medium">Admin</span>
                  <span className="text-gray-500">5 minutes ago</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Create New User</h2>
                <p className="text-sm text-gray-500 mt-1">Send an SSO invitation to a new team member</p>
              </div>
              <button 
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="px-6 py-6">
              <div className="space-y-5">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="developer@company.dev"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-200 hover:border-gray-400"
                  />
                  <p className="mt-1.5 text-xs text-gray-500">We'll send an SSO invitation to this email</p>
                </div>

                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Jane Developer"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-200 hover:border-gray-400"
                  />
                </div>

                {/* Role Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <div className="space-y-2">
                    {roles.map((role) => (
                      <label
                        key={role.value}
                        className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          formData.role === role.value
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={role.value}
                          checked={formData.role === role.value}
                          onChange={handleInputChange}
                          className="mt-0.5 w-4 h-4 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">{role.label}</span>
                            {formData.role === role.value && (
                              <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{role.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end space-y-3 space-y-reverse sm:space-y-0 sm:space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto px-5 py-2.5 text-white text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isSubmitting
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-sm hover:shadow'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Invitation...
                    </span>
                  ) : (
                    'Create User & Send Invite'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 px-4 py-2 z-40">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center py-2 px-3 text-gray-600">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-indigo-600">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-xs font-medium">Users</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-gray-600">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}