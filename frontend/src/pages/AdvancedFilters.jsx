function AdvancedFiltersScreen() {
  const [isOpen, setIsOpen] = React.useState(true);
  const [dateRange, setDateRange] = React.useState({ start: '2024-01-01', end: '2024-01-31' });
  const [selectedStatuses, setSelectedStatuses] = React.useState(['active', 'pending']);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [selectedTypes, setSelectedTypes] = React.useState([]);
  const [selectedPriorities, setSelectedPriorities] = React.useState([]);
  const [presetName, setPresetName] = React.useState('');
  const [showSavePreset, setShowSavePreset] = React.useState(false);
  const [savedPresets, setSavedPresets] = React.useState([
    { id: 1, name: 'High Priority API Issues', filters: 5 },
    { id: 2, name: 'Pending Code Reviews', filters: 3 },
    { id: 3, name: 'This Week\'s Deployments', filters: 4 }
  ]);

  const statuses = [
    { id: 'active', label: 'Active', count: 24 },
    { id: 'pending', label: 'Pending', count: 18 },
    { id: 'completed', label: 'Completed', count: 142 },
    { id: 'blocked', label: 'Blocked', count: 6 },
    { id: 'cancelled', label: 'Cancelled', count: 12 }
  ];

  const users = [
    { id: 1, name: 'Sarah Chen', avatar: 'SC', role: 'Lead Developer' },
    { id: 2, name: 'Marcus Kim', avatar: 'MK', role: 'Backend Engineer' },
    { id: 3, name: 'Olivia Torres', avatar: 'OT', role: 'Frontend Engineer' },
    { id: 4, name: 'Dev Patel', avatar: 'DP', role: 'DevOps' },
    { id: 5, name: 'Emma Wilson', avatar: 'EW', role: 'QA Engineer' }
  ];

  const transactionTypes = [
    { id: 'code_commit', label: 'Code Commit', icon: '📝' },
    { id: 'pull_request', label: 'Pull Request', icon: '🔀' },
    { id: 'deployment', label: 'Deployment', icon: '🚀' },
    { id: 'code_review', label: 'Code Review', icon: '👀' },
    { id: 'bug_fix', label: 'Bug Fix', icon: '🐛' },
    { id: 'feature', label: 'Feature', icon: '✨' }
  ];

  const priorities = [
    { id: 'critical', label: 'Critical', color: 'text-red-600 bg-red-50' },
    { id: 'high', label: 'High', color: 'text-orange-600 bg-orange-50' },
    { id: 'medium', label: 'Medium', color: 'text-yellow-600 bg-yellow-50' },
    { id: 'low', label: 'Low', color: 'text-blue-600 bg-blue-50' }
  ];

  const toggleStatus = (statusId) => {
    setSelectedStatuses(prev =>
      prev.includes(statusId)
        ? prev.filter(s => s !== statusId)
        : [...prev, statusId]
    );
  };

  const toggleUser = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(u => u !== userId)
        : [...prev, userId]
    );
  };

  const toggleType = (typeId) => {
    setSelectedTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    );
  };

  const togglePriority = (priorityId) => {
    setSelectedPriorities(prev =>
      prev.includes(priorityId)
        ? prev.filter(p => p !== priorityId)
        : [...prev, priorityId]
    );
  };

  const handleClearFilters = () => {
    setSelectedStatuses([]);
    setSelectedUsers([]);
    setSelectedTypes([]);
    setSelectedPriorities([]);
    setDateRange({ start: '', end: '' });
  };

  const handleSavePreset = () => {
    if (presetName.trim()) {
      const newPreset = {
        id: savedPresets.length + 1,
        name: presetName,
        filters: selectedStatuses.length + selectedUsers.length + selectedTypes.length + selectedPriorities.length
      };
      setSavedPresets([...savedPresets, newPreset]);
      setPresetName('');
      setShowSavePreset(false);
    }
  };

  const activeFilterCount = selectedStatuses.length + selectedUsers.length + selectedTypes.length + selectedPriorities.length + (dateRange.start ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Notion<span className="text-indigo-600">Dev</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <a href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <span className="text-lg">📊</span>
            <span>Dashboard</span>
          </a>
          <a href="/projects" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <span className="text-lg">📁</span>
            <span>Projects</span>
          </a>
          <a href="/transactions" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg transition-colors duration-200">
            <span className="text-lg">📝</span>
            <span>Transactions</span>
          </a>
          <a href="/code-editor" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <span className="text-lg">💻</span>
            <span>Code Editor</span>
          </a>
          <a href="/github" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <span className="text-lg">🔗</span>
            <span>GitHub</span>
          </a>
          <a href="/team" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <span className="text-lg">👥</span>
            <span>Team</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">Transactions</h2>
                <p className="text-sm text-gray-500 hidden md:block">View and manage all development activities</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-indigo-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Content Area with Filter Drawer */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                      <p className="text-sm text-gray-500 mt-1">Showing 142 results</p>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      Export
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {[
                    { id: 1, type: 'pull_request', title: 'Implement user authentication system', user: 'Sarah Chen', status: 'active', priority: 'high', time: '2 hours ago' },
                    { id: 2, type: 'deployment', title: 'Deploy v2.4.1 to production', user: 'Dev Patel', status: 'completed', priority: 'critical', time: '5 hours ago' },
                    { id: 3, type: 'bug_fix', title: 'Fix memory leak in data processor', user: 'Marcus Kim', status: 'pending', priority: 'high', time: '1 day ago' },
                    { id: 4, type: 'code_review', title: 'Review API endpoint refactoring', user: 'Olivia Torres', status: 'active', priority: 'medium', time: '1 day ago' },
                    { id: 5, type: 'feature', title: 'Add dark mode support', user: 'Emma Wilson', status: 'blocked', priority: 'low', time: '2 days ago' }
                  ].map(transaction => (
                    <div key={transaction.id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="text-2xl">
                          {transactionTypes.find(t => t.id === transaction.type)?.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">{transaction.title}</h4>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                            <span>{transaction.user}</span>
                            <span>•</span>
                            <span>{transaction.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-md ${
                            transaction.status === 'active' ? 'text-green-700 bg-green-50' :
                            transaction.status === 'pending' ? 'text-yellow-700 bg-yellow-50' :
                            transaction.status === 'completed' ? 'text-blue-700 bg-blue-50' :
                            'text-red-700 bg-red-50'
                          }`}>
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>

          {/* Filter Drawer */}
          <aside className={`
            fixed lg:relative inset-y-0 right-0 z-40
            w-full sm:w-96 bg-white border-l border-gray-200 
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            overflow-y-auto
          `}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Saved Presets */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Saved Presets</label>
                <div className="space-y-2">
                  {savedPresets.map(preset => (
                    <button
                      key={preset.id}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <span className="font-medium text-gray-900">{preset.name}</span>
                      <span className="text-xs text-gray-500">{preset.filters} filters</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Date Range</label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">End Date</label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Status</label>
                <div className="space-y-2">
                  {statuses.map(status => (
                    <label
                      key={status.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedStatuses.includes(status.id)}
                          onChange={() => toggleStatus(status.id)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                        />
                        <span className="text-sm text-gray-900">{status.label}</span>
                      </div>
                      <span className="text-xs text-gray-500">{status.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Assigned Users */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Assigned To</label>
                <div className="space-y-2">
                  {users.map(user => (
                    <label
                      key={user.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUser(user.id)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                      />
                      <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold">
                        {user.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.role}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Transaction Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {transactionTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => toggleType(type.id)}
                      className={`
                        flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg border transition-all duration-200
                        ${selectedTypes.includes(type.id)
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-medium'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      <span>{type.icon}</span>
                      <span className="truncate">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority Level */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Priority Level</label>
                <div className="space-y-2">
                  {priorities.map(priority => (
                    <label
                      key={priority.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPriorities.includes(priority.id)}
                        onChange={() => togglePriority(priority.id)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                      />
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-md ${priority.color}`}>
                        {priority.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Save Preset */}
              {showSavePreset ? (
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <label className="block text-sm font-medium text-gray-900">Preset Name</label>
                  <input
                    type="text"
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    placeholder="e.g., High Priority Issues"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSavePreset}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowSavePreset(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowSavePreset(true)}
                  className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
                >
                  Save as Preset
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 space-y-3">
              <button className="w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow">
                Apply Filters
              </button>
              <button
                onClick={handleClearFilters}
                className="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-20">
        <div className="flex items-center justify-around">
          <a href="/dashboard" className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <span className="text-xl">📊</span>
            <span className="text-xs">Dashboard</span>
          </a>
          <a href="/projects" className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <span className="text-xl">📁</span>
            <span className="text-xs">Projects</span>
          </a>
          <a href="/transactions" className="flex flex-col items-center gap-1 text-indigo-600 transition-colors duration-200">
            <span className="text-xl">📝</span>
            <span className="text-xs font-medium">Transactions</span>
          </a>
          <a href="/code-editor" className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <span className="text-xl">💻</span>
            <span className="text-xs">Code</span>
          </a>
        </div>
      </nav>
    </div>
  );
}