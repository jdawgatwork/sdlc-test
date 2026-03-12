function NewTransactionScreen() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [showDuplicateWarning, setShowDuplicateWarning] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    transactionType: '',
    projectName: '',
    repositoryUrl: '',
    branchName: '',
    commitHash: '',
    description: '',
    assignedTo: '',
    priority: 'medium',
    estimatedHours: '',
    tags: []
  });
  const [errors, setErrors] = React.useState({});

  const steps = [
    { number: 1, title: 'Transaction Type', description: 'Select workflow type' },
    { number: 2, title: 'Project Details', description: 'Link repository & branch' },
    { number: 3, title: 'Assignment', description: 'Assign and prioritize' },
    { number: 4, title: 'Review', description: 'Confirm details' }
  ];

  const navigationItems = [
    { name: 'Dashboard', icon: '◧', path: '/dashboard', active: false },
    { name: 'Workflows', icon: '⚡', path: '/workflows', active: true },
    { name: 'Documents', icon: '📄', path: '/documents', active: false },
    { name: 'Code Editor', icon: '</>', path: '/editor', active: false },
    { name: 'GitHub Sync', icon: '⎇', path: '/github', active: false },
    { name: 'Planning', icon: '◫', path: '/planning', active: false },
    { name: 'Settings', icon: '⚙', path: '/settings', active: false }
  ];

  const transactionTypes = [
    { id: 'feature', name: 'Feature Development', icon: '✨', color: 'blue' },
    { id: 'bugfix', name: 'Bug Fix', icon: '🐛', color: 'red' },
    { id: 'refactor', name: 'Code Refactor', icon: '♻️', color: 'purple' },
    { id: 'documentation', name: 'Documentation', icon: '📝', color: 'green' },
    { id: 'deployment', name: 'Deployment', icon: '🚀', color: 'orange' }
  ];

  const teamMembers = [
    { id: '1', name: 'Sarah Chen', avatar: 'SC', role: 'Senior Developer' },
    { id: '2', name: 'Marcus Rivera', avatar: 'MR', role: 'Full Stack Developer' },
    { id: '3', name: 'Aisha Patel', avatar: 'AP', role: 'Frontend Specialist' },
    { id: '4', name: 'James Kim', avatar: 'JK', role: 'Backend Engineer' }
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
    
    // Simulate duplicate detection for repository URL
    if (field === 'repositoryUrl' && value.includes('github.com/acme/api')) {
      setShowDuplicateWarning(true);
    } else if (field === 'repositoryUrl') {
      setShowDuplicateWarning(false);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1 && !formData.transactionType) {
      newErrors.transactionType = 'Please select a transaction type';
    }
    
    if (step === 2) {
      if (!formData.projectName) newErrors.projectName = 'Project name is required';
      if (!formData.repositoryUrl) newErrors.repositoryUrl = 'Repository URL is required';
      if (!formData.branchName) newErrors.branchName = 'Branch name is required';
    }
    
    if (step === 3) {
      if (!formData.assignedTo) newErrors.assignedTo = 'Please assign to a team member';
      if (!formData.estimatedHours) newErrors.estimatedHours = 'Estimated hours required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSaveDraft = () => {
    // Save draft logic
  };

  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-200">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            N
          </div>
          <span className="font-semibold text-gray-900">DevNotion</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                item.active
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </a>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate">john@company.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50" onClick={() => setIsSidebarOpen(false)}></div>
          <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  N
                </div>
                <span className="font-semibold text-gray-900">DevNotion</span>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="px-3 py-4 space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    item.active
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">New Transaction</h1>
                <p className="text-sm text-gray-500 mt-0.5">Create a new workflow transaction</p>
              </div>
            </div>
            <button
              onClick={handleSaveDraft}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save Draft
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-100 h-1">
            <div
              className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Step Indicator */}
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold transition-all duration-300 ${
                        step.number < currentStep
                          ? 'bg-indigo-600 text-white'
                          : step.number === currentStep
                          ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step.number < currentStep ? '✓' : step.number}
                    </div>
                    <div className="mt-2 text-center hidden sm:block">
                      <p
                        className={`text-xs sm:text-sm font-medium ${
                          step.number <= currentStep ? 'text-gray-900' : 'text-gray-500'
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 transition-all duration-300 ${
                        step.number < currentStep ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Duplicate Warning Banner */}
          {showDuplicateWarning && (
            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 animate-[slideDown_0.3s_ease-out]">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-amber-900">Potential Duplicate Detected</h4>
                <p className="text-sm text-amber-800 mt-1">
                  A similar transaction exists for this repository. Review existing workflow:{' '}
                  <a href="#" className="font-medium underline hover:text-amber-900">
                    FEAT-1234: API Authentication
                  </a>
                </p>
              </div>
              <button
                onClick={() => setShowDuplicateWarning(false)}
                className="text-amber-600 hover:text-amber-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Form Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 sm:p-8">
              {/* Step 1: Transaction Type */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Transaction Type</h3>
                    <p className="text-sm text-gray-600">Choose the type of workflow you want to initiate</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {transactionTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleInputChange('transactionType', type.id)}
                        className={`p-6 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-md ${
                          formData.transactionType === type.id
                            ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-100'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <span className="text-3xl">{type.icon}</span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{type.name}</h4>
                            <p className="text-sm text-gray-600">
                              {type.id === 'feature' && 'Develop new features and functionality'}
                              {type.id === 'bugfix' && 'Fix bugs and resolve issues'}
                              {type.id === 'refactor' && 'Improve code structure and quality'}
                              {type.id === 'documentation' && 'Update docs and guides'}
                              {type.id === 'deployment' && 'Deploy changes to production'}
                            </p>
                          </div>
                          {formData.transactionType === type.id && (
                            <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {errors.transactionType && (
                    <p className="text-sm text-red-600 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.transactionType}
                    </p>
                  )}
                </div>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Details</h3>
                    <p className="text-sm text-gray-600">Link this transaction to a repository and branch</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.projectName}
                        onChange={(e) => handleInputChange('projectName', e.target.value)}
                        placeholder="e.g., Authentication Service"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.projectName ? 'border-red-300' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                      />
                      {errors.projectName && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.projectName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Repository URL <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.repositoryUrl}
                        onChange={(e) => handleInputChange('repositoryUrl', e.target.value)}
                        placeholder="https://github.com/your-org/your-repo"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.repositoryUrl ? 'border-red-300' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                      />
                      {errors.repositoryUrl && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.repositoryUrl}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Branch Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.branchName}
                          onChange={(e) => handleInputChange('branchName', e.target.value)}
                          placeholder="e.g., feature/oauth-integration"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.branchName ? 'border-red-300' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                        />
                        {errors.branchName && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.branchName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Commit Hash <span className="text-gray-400">(optional)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.commitHash}
                          onChange={(e) => handleInputChange('commitHash', e.target.value)}
                          placeholder="e.g., a3f2c8d"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe what this transaction involves..."
                        rows="4"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Assignment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Assignment & Priority</h3>
                    <p className="text-sm text-gray-600">Assign this transaction and set priority level</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Assign To <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {teamMembers.map((member) => (
                          <button
                            key={member.id}
                            onClick={() => handleInputChange('assignedTo', member.id)}
                            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-sm ${
                              formData.assignedTo === member.id
                                ? 'border-indigo-600 bg-indigo-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                                {member.avatar}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">{member.name}</p>
                                <p className="text-xs text-gray-500 truncate">{member.role}</p>
                              </div>
                              {formData.assignedTo === member.id && (
                                <svg className="w-5 h-5 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      {errors.assignedTo && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.assignedTo}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Priority Level
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: 'low', label: 'Low', color: 'gray' },
                          { value: 'medium', label: 'Medium', color: 'blue' },
                          { value: 'high', label: 'High', color: 'red' }
                        ].map((priority) => (
                          <button
                            key={priority.value}
                            onClick={() => handleInputChange('priority', priority.value)}
                            className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                              formData.priority === priority.value
                                ? priority.color === 'gray'
                                  ? 'border-gray-600 bg-gray-50 text-gray-900'
                                  : priority.color === 'blue'
                                  ? 'border-blue-600 bg-blue-50 text-blue-900'
                                  : 'border-red-600 bg-red-50 text-red-900'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            {priority.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estimated Hours <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={formData.estimatedHours}
                        onChange={(e) => handleInputChange('estimatedHours', e.target.value)}
                        placeholder="e.g., 8"
                        min="0"
                        step="0.5"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.estimatedHours ? 'border-red-300' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                      />
                      {errors.estimatedHours && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.estimatedHours}
                        </p>
                      )}
                      <p className="mt-2 text-xs text-gray-500">Enter the estimated time to complete this transaction</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags <span className="text-gray-400">(optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Add tags separated by commas"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      />
                      <p className="mt-2 text-xs text-gray-500">e.g., authentication, backend, security</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Review & Confirm</h3>
                    <p className="text-sm text-gray-600">Please review all details before submitting</p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Transaction Type</p>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">
                            {transactionTypes.find(t => t.id === formData.transactionType)?.icon}
                          </span>
                          <p className="text-base font-medium text-gray-900">
                            {transactionTypes.find(t => t.id === formData.transactionType)?.name}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Project Details</p>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Project Name:</span>
                            <span className="text-sm font-medium text-gray-900">{formData.projectName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Repository:</span>
                            <span className="text-sm font-medium text-gray-900 truncate max-w-xs">{formData.repositoryUrl}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Branch:</span>
                            <span className="text-sm font-medium text-gray-900">{formData.branchName}</span>
                          </div>
                          {formData.commitHash && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Commit:</span>
                              <span className="text-sm font-mono text-gray-900">{formData.commitHash}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {formData.description && (
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Description</p>
                          <p className="text-sm text-gray-700">{formData.description}</p>
                        </div>
                      )}

                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Assignment</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {teamMembers.find(m => m.id === formData.assignedTo)?.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {teamMembers.find(m => m.id === formData.assignedTo)?.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {teamMembers.find(m => m.id === formData.assignedTo)?.role}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{formData.estimatedHours}h</p>
                            <p className="text-xs text-gray-500">Estimated</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Priority:</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            formData.priority === 'high'
                              ? 'bg-red-100 text-red-700'
                              : formData.priority === 'medium'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="text-sm font-semibold text-blue-900">Ready to Submit</h4>
                        <p className="text-sm text-blue-800 mt-1">
                          Once submitted, this transaction will be created and the assigned team member will be notified.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="bg-gray-50 px-6 sm:px-8 py-4 border-t border-gray-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleSaveDraft}
                  className="flex-1 sm:hidden px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Save Draft
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:block text-sm text-gray-500">
                  Step {currentStep} of {steps.length}
                </span>
                {currentStep < steps.length ? (
                  <button
                    onClick={handleNext}
                    className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-200 hover:shadow-md"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={() => {}}
                    className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Submit Transaction</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Contextual Help */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Need Help?
            </h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                • Transactions help you track work across your development workflow
              </p>
              <p className="text-sm text-gray-600">
                • Link to GitHub repositories to automatically sync commits and PRs
              </p>
              <p className="text-sm text-gray-600">
                • Use tags to organize and filter transactions by category
              </p>
            </div>
            <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 mt-3 transition-colors">
              View full documentation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}