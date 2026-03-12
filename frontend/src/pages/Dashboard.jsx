function DashboardScreen() {
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const statusCards = [
    { id: 1, label: 'Active Projects', value: '12', change: '+3', trend: 'up', icon: '📁' },
    { id: 2, label: 'Pending Reviews', value: '8', change: '-2', trend: 'down', icon: '👀' },
    { id: 3, label: 'API Calls Today', value: '2.4k', change: '+12%', trend: 'up', icon: '🔌' },
    { id: 4, label: 'Team Members', value: '24', change: '+1', trend: 'up', icon: '👥' },
  ];

  const transactions = [
    { id: 1, project: 'API Documentation Hub', type: 'Deploy', status: 'success', user: 'Sarah Chen', time: '2 min ago', branch: 'main' },
    { id: 2, project: 'Authentication Service', type: 'PR Review', status: 'pending', user: 'Marcus Rodriguez', time: '15 min ago', branch: 'feat/oauth' },
    { id: 3, project: 'Database Schema v2', type: 'Migration', status: 'running', user: 'Emily Watson', time: '23 min ago', branch: 'migration/v2' },
    { id: 4, project: 'Frontend Components', type: 'Build', status: 'success', user: 'James Park', time: '1 hour ago', branch: 'develop' },
    { id: 5, project: 'API Documentation Hub', type: 'Test Suite', status: 'failed', user: 'Sarah Chen', time: '2 hours ago', branch: 'test/integration' },
    { id: 6, project: 'Webhook Handler', type: 'Deploy', status: 'success', user: 'Alex Kumar', time: '3 hours ago', branch: 'main' },
  ];

  const activities = [
    { id: 1, user: 'Sarah Chen', action: 'merged PR #342', target: 'API Documentation Hub', time: '5 min ago', avatar: '👩‍💻' },
    { id: 2, user: 'Marcus Rodriguez', action: 'opened issue', target: 'OAuth Integration', time: '12 min ago', avatar: '👨‍💼' },
    { id: 3, user: 'Emily Watson', action: 'commented on', target: 'Database Schema Review', time: '28 min ago', avatar: '👩‍🔬' },
    { id: 4, user: 'James Park', action: 'pushed to', target: 'develop branch', time: '45 min ago', avatar: '👨‍🎨' },
    { id: 5, user: 'Alex Kumar', action: 'deployed to', target: 'production', time: '1 hour ago', avatar: '👨‍💻' },
  ];

  const quickActions = [
    { id: 1, title: 'New Project', icon: '➕', color: 'bg-blue-50 hover:bg-blue-100', iconColor: 'text-blue-600' },
    { id: 2, title: 'Deploy', icon: '🚀', color: 'bg-green-50 hover:bg-green-100', iconColor: 'text-green-600' },
    { id: 3, title: 'View Logs', icon: '📋', color: 'bg-purple-50 hover:bg-purple-100', iconColor: 'text-purple-600' },
    { id: 4, title: 'Settings', icon: '⚙️', color: 'bg-gray-50 hover:bg-gray-100', iconColor: 'text-gray-600' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'success': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'running': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'failed': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredTransactions = activeFilter === 'all' 
    ? transactions 
    : transactions.filter(t => t.status === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            DevWorkspace
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg transition-all duration-200">
            <span>📊</span>
            Dashboard
          </a>
          <a href="/projects" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <span>📁</span>
            Projects
          </a>
          <a href="/code" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <span>💻</span>
            Code Editor
          </a>
          <a href="/github" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <span>🔗</span>
            GitHub
          </a>
          <a href="/planning" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <span>📋</span>
            Planning
          </a>
          <a href="/analytics" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <span>📈</span>
            Analytics
          </a>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
              SC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Sarah Chen</p>
              <p className="text-xs text-gray-500 truncate">sarah@dev.io</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
          <aside className="w-64 bg-white h-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                DevWorkspace
              </h1>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <nav className="p-4 space-y-1">
              <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg">
                <span>📊</span>
                Dashboard
              </a>
              <a href="/projects" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                <span>📁</span>
                Projects
              </a>
              <a href="/code" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                <span>💻</span>
                Code Editor
              </a>
              <a href="/github" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                <span>🔗</span>
                GitHub
              </a>
              <a href="/planning" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                <span>📋</span>
                Planning
              </a>
              <a href="/analytics" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                <span>📈</span>
                Analytics
              </a>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h2>
                <p className="text-sm text-gray-500 hidden sm:block">Welcome back, Sarah</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 relative">
                <span className="text-xl">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-200">
                <span>➕</span>
                New Project
              </button>
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
          {/* Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {statusCards.map((card) => (
              <div 
                key={card.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl sm:text-3xl">{card.icon}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${card.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {card.change}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mb-1">{card.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {quickActions.map((action) => (
              <button
                key={action.id}
                className={`${action.color} rounded-xl p-4 sm:p-6 flex flex-col items-center gap-2 sm:gap-3 transition-all duration-200 hover:scale-105 border border-transparent hover:border-gray-300`}
              >
                <span className="text-2xl sm:text-3xl">{action.icon}</span>
                <span className={`text-xs sm:text-sm font-medium ${action.iconColor}`}>{action.title}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Transactions Table */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                    <button
                      onClick={() => setActiveFilter('all')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                        activeFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setActiveFilter('success')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                        activeFilter === 'success' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Success
                    </button>
                    <button
                      onClick={() => setActiveFilter('pending')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                        activeFilter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => setActiveFilter('running')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                        activeFilter === 'running' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Running
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Type</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">User</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredTransactions.map((transaction) => (
                      <tr 
                        key={transaction.id} 
                        className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        onClick={() => setSelectedTransaction(transaction)}
                      >
                        <td className="px-4 sm:px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{transaction.project}</p>
                            <p className="text-xs text-gray-500">{transaction.time}</p>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                          <span className="text-sm text-gray-700">{transaction.type}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                          <span className="text-sm text-gray-700">{transaction.user}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Activity Feed</h3>
              </div>
              <div className="p-4 sm:p-6 space-y-4 max-h-96 overflow-y-auto">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">{activity.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span>
                        {' '}
                        <span className="text-gray-600">{activity.action}</span>
                        {' '}
                        <span className="font-medium text-blue-600">{activity.target}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-20">
        <div className="flex items-center justify-around">
          <a href="/dashboard" className="flex flex-col items-center gap-1 px-3 py-2 text-gray-900">
            <span className="text-xl">📊</span>
            <span className="text-xs font-medium">Dashboard</span>
          </a>
          <a href="/projects" className="flex flex-col items-center gap-1 px-3 py-2 text-gray-500 hover:text-gray-900 transition-colors duration-200">
            <span className="text-xl">📁</span>
            <span className="text-xs font-medium">Projects</span>
          </a>
          <a href="/code" className="flex flex-col items-center gap-1 px-3 py-2 text-gray-500 hover:text-gray-900 transition-colors duration-200">
            <span className="text-xl">💻</span>
            <span className="text-xs font-medium">Code</span>
          </a>
          <a href="/planning" className="flex flex-col items-center gap-1 px-3 py-2 text-gray-500 hover:text-gray-900 transition-colors duration-200">
            <span className="text-xl">📋</span>
            <span className="text-xs font-medium">Planning</span>
          </a>
        </div>
      </nav>
    </div>
  );
}