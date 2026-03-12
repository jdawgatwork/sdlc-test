function ValidationRuleBuilderScreen() {
  const [rules, setRules] = React.useState([
    {
      id: 1,
      name: 'Email Format Validation',
      field: 'user.email',
      type: 'regex',
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      errorMessage: 'Please enter a valid email address',
      enabled: true,
      lastModified: '2024-01-15'
    },
    {
      id: 2,
      name: 'API Key Length Check',
      field: 'integration.apiKey',
      type: 'length',
      minLength: 32,
      maxLength: 64,
      errorMessage: 'API key must be between 32 and 64 characters',
      enabled: true,
      lastModified: '2024-01-14'
    },
    {
      id: 3,
      name: 'Duplicate Project Name',
      field: 'project.name',
      type: 'duplicate',
      scope: 'workspace',
      errorMessage: 'A project with this name already exists',
      enabled: true,
      lastModified: '2024-01-12'
    },
    {
      id: 4,
      name: 'Commit Message Required',
      field: 'commit.message',
      type: 'required',
      errorMessage: 'Commit message cannot be empty',
      enabled: false,
      lastModified: '2024-01-10'
    }
  ]);

  const [selectedRule, setSelectedRule] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [testValue, setTestValue] = React.useState('');
  const [testResult, setTestResult] = React.useState(null);
  
  const [formData, setFormData] = React.useState({
    name: '',
    field: '',
    type: 'regex',
    pattern: '',
    errorMessage: '',
    enabled: true
  });

  const validationTypes = [
    { value: 'regex', label: 'Regular Expression' },
    { value: 'length', label: 'Length Check' },
    { value: 'required', label: 'Required Field' },
    { value: 'duplicate', label: 'Duplicate Detection' },
    { value: 'custom', label: 'Custom Function' },
    { value: 'dependency', label: 'Cross-field Dependency' }
  ];

  const fieldOptions = [
    'user.email',
    'user.username',
    'project.name',
    'project.description',
    'integration.apiKey',
    'commit.message',
    'document.title',
    'workspace.slug'
  ];

  const handleEditRule = (rule) => {
    setSelectedRule(rule);
    setFormData({
      name: rule.name,
      field: rule.field,
      type: rule.type,
      pattern: rule.pattern || '',
      errorMessage: rule.errorMessage,
      enabled: rule.enabled
    });
    setIsEditing(true);
    setTestResult(null);
  };

  const handleCreateNew = () => {
    setSelectedRule(null);
    setFormData({
      name: '',
      field: '',
      type: 'regex',
      pattern: '',
      errorMessage: '',
      enabled: true
    });
    setIsEditing(true);
    setTestResult(null);
  };

  const handleSaveRule = () => {
    if (selectedRule) {
      setRules(rules.map(r => r.id === selectedRule.id ? { ...selectedRule, ...formData, lastModified: new Date().toISOString().split('T')[0] } : r));
    } else {
      const newRule = {
        id: rules.length + 1,
        ...formData,
        lastModified: new Date().toISOString().split('T')[0]
      };
      setRules([...rules, newRule]);
    }
    setIsEditing(false);
    setSelectedRule(null);
  };

  const handleTestValidation = () => {
    if (formData.type === 'regex' && formData.pattern) {
      try {
        const regex = new RegExp(formData.pattern);
        const isValid = regex.test(testValue);
        setTestResult({
          success: isValid,
          message: isValid ? 'Validation passed!' : formData.errorMessage || 'Validation failed'
        });
      } catch (e) {
        setTestResult({
          success: false,
          message: 'Invalid regex pattern'
        });
      }
    } else {
      setTestResult({
        success: true,
        message: 'Test simulation passed'
      });
    }
  };

  const handleToggleRule = (ruleId) => {
    setRules(rules.map(r => r.id === ruleId ? { ...r, enabled: !r.enabled } : r));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">DevWorkspace</h1>
            <p className="text-sm text-gray-500 mt-1">Admin Settings</p>
          </div>
          
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <a href="/admin/dashboard" className="block px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Dashboard
            </a>
            <a href="/admin/users" className="block px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Users & Teams
            </a>
            <a href="/admin/workspaces" className="block px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Workspaces
            </a>
            
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Settings</p>
            </div>
            
            <a href="/admin/settings/general" className="block px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              General
            </a>
            <a href="/admin/settings/integrations" className="block px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Integrations
            </a>
            <a href="/admin/settings/validation" className="block px-4 py-2.5 text-sm text-white bg-indigo-600 rounded-lg transition-colors duration-200">
              Validation Rules
            </a>
            <a href="/admin/settings/security" className="block px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Security
            </a>
            <a href="/admin/settings/api" className="block px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              API Keys
            </a>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 px-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-sm font-semibold text-indigo-600">AD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@devworkspace.io</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Validation Rules</h2>
                <p className="text-sm text-gray-500 mt-0.5 hidden sm:block">Configure data validation and integrity checks</p>
              </div>
            </div>
            
            <button
              onClick={handleCreateNew}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 hover:shadow-md transition-all duration-200 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">New Rule</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Rules List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-4 md:p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Active Rules</h3>
                    <p className="text-sm text-gray-500 mt-1">{rules.filter(r => r.enabled).length} of {rules.length} enabled</p>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {rules.map(rule => (
                      <div
                        key={rule.id}
                        className={`p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${selectedRule?.id === rule.id ? 'bg-indigo-50 border-l-4 border-indigo-600' : ''}`}
                        onClick={() => handleEditRule(rule)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <h4 className="text-sm font-medium text-gray-900 truncate">{rule.name}</h4>
                              {rule.enabled ? (
                                <span className="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">Active</span>
                              ) : (
                                <span className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">Disabled</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1 font-mono truncate">{rule.field}</p>
                            <div className="flex items-center space-x-3 mt-2">
                              <span className="px-2 py-0.5 text-xs font-medium text-indigo-700 bg-indigo-100 rounded">{rule.type}</span>
                              <span className="text-xs text-gray-400">Modified {rule.lastModified}</span>
                            </div>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleRule(rule.id);
                            }}
                            className={`ml-3 relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${rule.enabled ? 'bg-indigo-600' : 'bg-gray-200'}`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${rule.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rule Editor */}
              <div className="lg:col-span-2">
                {isEditing ? (
                  <div className="space-y-6">
                    {/* Rule Configuration Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                      <div className="p-4 md:p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {selectedRule ? 'Edit Rule' : 'Create New Rule'}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Define validation logic and error messages</p>
                      </div>
                      
                      <div className="p-4 md:p-6 space-y-5">
                        {/* Rule Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rule Name
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g., Email Format Validation"
                            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>

                        {/* Field Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Target Field
                          </label>
                          <select
                            value={formData.field}
                            onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 font-mono"
                          >
                            <option value="">Select a field...</option>
                            {fieldOptions.map(field => (
                              <option key={field} value={field}>{field}</option>
                            ))}
                          </select>
                        </div>

                        {/* Validation Type */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Validation Type
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {validationTypes.map(type => (
                              <button
                                key={type.value}
                                onClick={() => setFormData({ ...formData, type: type.value })}
                                className={`px-4 py-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                                  formData.type === type.value
                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                {type.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Condition Builder */}
                        {formData.type === 'regex' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Regular Expression Pattern
                            </label>
                            <input
                              type="text"
                              value={formData.pattern}
                              onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
                              placeholder="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono transition-all duration-200"
                            />
                            <p className="text-xs text-gray-500 mt-2">Enter a JavaScript-compatible regex pattern</p>
                          </div>
                        )}

                        {formData.type === 'length' && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Min Length
                              </label>
                              <input
                                type="number"
                                placeholder="0"
                                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Max Length
                              </label>
                              <input
                                type="number"
                                placeholder="100"
                                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                              />
                            </div>
                          </div>
                        )}

                        {formData.type === 'dependency' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Depends On Field
                            </label>
                            <select className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 font-mono">
                              <option value="">Select dependency...</option>
                              {fieldOptions.map(field => (
                                <option key={field} value={field}>{field}</option>
                              ))}
                            </select>
                          </div>
                        )}

                        {/* Error Message */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Error Message
                          </label>
                          <textarea
                            value={formData.errorMessage}
                            onChange={(e) => setFormData({ ...formData, errorMessage: e.target.value })}
                            placeholder="Enter the error message shown to users when validation fails"
                            rows={3}
                            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                          />
                        </div>

                        {/* Enable Toggle */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Enable Rule</p>
                            <p className="text-xs text-gray-500 mt-0.5">Activate this validation rule immediately</p>
                          </div>
                          <button
                            onClick={() => setFormData({ ...formData, enabled: !formData.enabled })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${formData.enabled ? 'bg-indigo-600' : 'bg-gray-200'}`}
                          >
                            <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ${formData.enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Test Validation Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                      <div className="p-4 md:p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Test Validation</h3>
                        <p className="text-sm text-gray-500 mt-1">Verify your rule works as expected</p>
                      </div>
                      
                      <div className="p-4 md:p-6 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Test Input
                          </label>
                          <input
                            type="text"
                            value={testValue}
                            onChange={(e) => setTestValue(e.target.value)}
                            placeholder="Enter a value to test against this rule"
                            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>

                        <button
                          onClick={handleTestValidation}
                          className="w-full px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                          <span>Run Test</span>
                        </button>

                        {testResult && (
                          <div className={`p-4 rounded-lg border-2 ${testResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                            <div className="flex items-start space-x-3">
                              {testResult.success ? (
                                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              )}
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${testResult.success ? 'text-green-900' : 'text-red-900'}`}>
                                  {testResult.success ? 'Validation Passed' : 'Validation Failed'}
                                </p>
                                <p className={`text-sm mt-1 ${testResult.success ? 'text-green-700' : 'text-red-700'}`}>
                                  {testResult.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setSelectedRule(null);
                          setTestResult(null);
                        }}
                        className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveRule}
                        className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Save Rule</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <div className="max-w-sm mx-auto">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Rule Selected</h3>
                      <p className="text-sm text-gray-500 mb-6">
                        Select an existing rule from the list to edit, or create a new validation rule to get started.
                      </p>
                      <button
                        onClick={handleCreateNew}
                        className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 hover:shadow-md transition-all duration-200 inline-flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Create New Rule</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}