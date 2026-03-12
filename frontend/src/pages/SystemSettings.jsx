function SystemSettingsScreen() {
  const [activeSection, setActiveSection] = React.useState('general');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [showSaveNotification, setShowSaveNotification] = React.useState(false);
  
  const [generalSettings, setGeneralSettings] = React.useState({
    appName: 'Notion for Developers',
    defaultWorkspace: 'engineering',
    autoSaveInterval: '30',
    enableNotifications: true,
  });

  const [workflowTemplates, setWorkflowTemplates] = React.useState([
    { id: 1, name: 'Sprint Planning', stages: ['Backlog', 'In Progress', 'Review', 'Done'], isActive: true },
    { id: 2, name: 'Bug Triage', stages: ['New', 'Assigned', 'Fixed', 'Verified'], isActive: true },
    { id: 3, name: 'Feature Release', stages: ['Design', 'Development', 'QA', 'Deployed'], isActive: false },
  ]);

  const [validationRules, setValidationRules] = React.useState([
    { id: 1, field: 'Pull Request Title', rule: 'Must include ticket number', pattern: '^[A-Z]+-\\d+:', enabled: true },
    { id: 2, field: 'Commit Message', rule: 'Minimum 10 characters', pattern: '.{10,}', enabled: true },
    { id: 3, field: 'Branch Name', rule: 'Must follow format: type/ticket-description', pattern: '^(feature|bugfix|hotfix)\\/[A-Z]+-\\d+', enabled: false },
  ]);

  const [emailTemplates, setEmailTemplates] = React.useState([
    { id: 1, name: 'Welcome Email', subject: 'Welcome to {{workspace_name}}', lastEdited: '2 days ago' },
    { id: 2, name: 'PR Review Request', subject: 'Review needed: {{pr_title}}', lastEdited: '5 days ago' },
    { id: 3, name: 'Sprint Summary', subject: '{{sprint_name}} - Weekly Summary', lastEdited: '1 week ago' },
  ]);

  const sections = [
    { id: 'general', label: 'General Settings', icon: '⚙️' },
    { id: 'workflows', label: 'Workflow Templates', icon: '🔄' },
    { id: 'validation', label: 'Validation Rules', icon: '✓' },
    { id: 'email', label: 'Email Templates', icon: '📧' },
    { id: 'integrations', label: 'Integrations', icon: '🔌' },
    { id: 'security', label: 'Security & Access', icon: '🔒' },
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', route: '/dashboard' },
    { id: 'workspaces', label: 'Workspaces', icon: '📁', route: '/workspaces' },
    { id: 'code-editor', label: 'Code Editor', icon: '💻', route: '/editor' },
    { id: 'github', label: 'GitHub', icon: '🔗', route: '/github' },
    { id: 'settings', label: 'Settings', icon: '⚙️', route: '/admin/settings', active: true },
  ];

  const handleSave = () => {
    setHasUnsavedChanges(false);
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const handleSettingChange = (key, value) => {
    setGeneralSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const toggleWorkflowStatus = (id) => {
    setWorkflowTemplates(prev => prev.map(wf => 
      wf.id === id ? { ...wf, isActive: !wf.isActive } : wf
    ));
    setHasUnsavedChanges(true);
  };

  const toggleValidationRule = (id) => {
    setValidationRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
    setHasUnsavedChanges(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile menu overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">DevWorkspace</h1>
            <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
          </div>
          
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map(item => (
              <a
                key={item.id}
                href={item.route}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  item.active 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@devworkspace.io</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">System Settings</h2>
              <p className="text-xs md:text-sm text-gray-500 mt-0.5">Configure application behavior and parameters</p>
            </div>
          </div>
          
          {hasUnsavedChanges && (
            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white px-4 md:px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all duration-200 hover:shadow-md active:scale-95"
            >
              Save Changes
            </button>
          )}
        </header>

        {/* Save Notification */}
        {showSaveNotification && (
          <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg px-4 py-3 shadow-lg z-50 animate-fadeIn">
            <div className="flex items-center gap-2 text-green-800">
              <span className="text-lg">✓</span>
              <span className="text-sm font-medium">Settings saved successfully</span>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Settings Navigation */}
          <div className="bg-white border-b md:border-b-0 md:border-r border-gray-200 md:w-64 overflow-x-auto md:overflow-y-auto">
            <div className="flex md:flex-col p-2 md:p-4 gap-1">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-3 px-3 md:px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap md:whitespace-normal ${
                    activeSection === section.id
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-base md:text-lg">{section.icon}</span>
                  <span className="hidden md:inline">{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Settings Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8">
              
              {/* General Settings */}
              {activeSection === 'general' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200">
                      <div className="p-4 md:p-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Application Name
                        </label>
                        <input
                          type="text"
                          value={generalSettings.appName}
                          onChange={(e) => handleSettingChange('appName', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        />
                      </div>
                      
                      <div className="p-4 md:p-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Default Workspace
                        </label>
                        <select
                          value={generalSettings.defaultWorkspace}
                          onChange={(e) => handleSettingChange('defaultWorkspace', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        >
                          <option value="engineering">Engineering</option>
                          <option value="product">Product</option>
                          <option value="design">Design</option>
                        </select>
                      </div>

                      <div className="p-4 md:p-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Auto-save Interval (seconds)
                        </label>
                        <input
                          type="number"
                          value={generalSettings.autoSaveInterval}
                          onChange={(e) => handleSettingChange('autoSaveInterval', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        />
                      </div>

                      <div className="p-4 md:p-6">
                        <label className="flex items-center justify-between cursor-pointer group">
                          <div>
                            <span className="text-sm font-medium text-gray-700">Enable Notifications</span>
                            <p className="text-xs text-gray-500 mt-1">Send email notifications for important events</p>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={generalSettings.enableNotifications}
                              onChange={(e) => handleSettingChange('enableNotifications', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-600 transition-colors duration-200 peer-focus:ring-2 peer-focus:ring-indigo-500"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Workflow Templates */}
              {activeSection === 'workflows' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Workflow Templates</h3>
                      <p className="text-sm text-gray-500 mt-1">Define stages for different project workflows</p>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all duration-200 hover:shadow-md active:scale-95 self-start sm:self-auto">
                      + New Template
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {workflowTemplates.map(workflow => (
                      <div key={workflow.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-3">
                              <h4 className="text-base font-semibold text-gray-900">{workflow.name}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                workflow.isActive 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {workflow.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {workflow.stages.map((stage, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                                    {stage}
                                  </span>
                                  {idx < workflow.stages.length - 1 && (
                                    <span className="text-gray-400">→</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleWorkflowStatus(workflow.id)}
                              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-300 transition-colors duration-200"
                            >
                              {workflow.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg border border-indigo-200 transition-colors duration-200">
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Validation Rules */}
              {activeSection === 'validation' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Validation Rules</h3>
                      <p className="text-sm text-gray-500 mt-1">Enforce data quality standards across the platform</p>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all duration-200 hover:shadow-md active:scale-95 self-start sm:self-auto">
                      + Add Rule
                    </button>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200">
                    {validationRules.map(rule => (
                      <div key={rule.id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-sm font-semibold text-gray-900">{rule.field}</h4>
                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                rule.enabled 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {rule.enabled ? 'Enabled' : 'Disabled'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{rule.rule}</p>
                            <code className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">
                              {rule.pattern}
                            </code>
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={rule.enabled}
                                onChange={() => toggleValidationRule(rule.id)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-600 transition-colors duration-200 peer-focus:ring-2 peer-focus:ring-indigo-500"></div>
                              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
                            </label>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Email Templates */}
              {activeSection === 'email' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Email Templates</h3>
                      <p className="text-sm text-gray-500 mt-1">Customize automated email communications</p>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all duration-200 hover:shadow-md active:scale-95 self-start sm:self-auto">
                      + New Template
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {emailTemplates.map(template => (
                      <div key={template.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-semibold text-gray-900 mb-2">{template.name}</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              <span className="font-medium">Subject:</span> {template.subject}
                            </p>
                            <p className="text-xs text-gray-500">Last edited {template.lastEdited}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-300 transition-colors duration-200">
                              Preview
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg border border-indigo-200 transition-colors duration-200">
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Integrations */}
              {activeSection === 'integrations' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Integrations</h3>
                    <p className="text-sm text-gray-500 mt-1">Connect external services and tools</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'GitHub', icon: '🔗', status: 'Connected', description: 'Repository sync and PR tracking' },
                      { name: 'Slack', icon: '💬', status: 'Connected', description: 'Team notifications and updates' },
                      { name: 'Jira', icon: '📋', status: 'Not Connected', description: 'Issue tracking integration' },
                      { name: 'Linear', icon: '📐', status: 'Not Connected', description: 'Project management sync' },
                    ].map((integration, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xl">
                              {integration.icon}
                            </div>
                            <div>
                              <h4 className="text-base font-semibold text-gray-900">{integration.name}</h4>
                              <span className={`text-xs font-medium ${
                                integration.status === 'Connected' 
                                  ? 'text-green-600' 
                                  : 'text-gray-500'
                              }`}>
                                {integration.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                        <button className={`w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                          integration.status === 'Connected'
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}>
                          {integration.status === 'Connected' ? 'Configure' : 'Connect'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security */}
              {activeSection === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Security & Access</h3>
                    <p className="text-sm text-gray-500 mt-1">Manage authentication and permissions</p>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200">
                    <div className="p-4 md:p-6">
                      <label className="flex items-center justify-between cursor-pointer group">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
                          <p className="text-xs text-gray-500 mt-1">Require 2FA for all admin users</p>
                        </div>
                        <div className="relative">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-600 transition-colors duration-200"></div>
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
                        </div>
                      </label>
                    </div>

                    <div className="p-4 md:p-6">
                      <label className="flex items-center justify-between cursor-pointer group">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Session Timeout</span>
                          <p className="text-xs text-gray-500 mt-1">Auto-logout after 30 minutes of inactivity</p>
                        </div>
                        <div className="relative">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-600 transition-colors duration-200"></div>
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
                        </div>
                      </label>
                    </div>

                    <div className="p-4 md:p-6">
                      <label className="flex items-center justify-between cursor-pointer group">
                        <div>
                          <span className="text-sm font-medium text-gray-700">IP Whitelist</span>
                          <p className="text-xs text-gray-500 mt-1">Restrict access to specific IP addresses</p>
                        </div>
                        <div className="relative">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-600 transition-colors duration-200"></div>
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
                        </div>
                      </label>
                    </div>

                    <div className="p-4 md:p-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password Policy
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200">
                        <option>Strong (12+ chars, mixed case, numbers, symbols)</option>
                        <option>Medium (8+ chars, mixed case, numbers)</option>
                        <option>Basic (6+ chars)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}