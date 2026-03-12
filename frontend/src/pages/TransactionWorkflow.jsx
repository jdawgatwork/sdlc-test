function TransactionWorkflowScreen() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    transactionType: '',
    repository: '',
    branch: '',
    description: '',
    assignee: '',
    priority: 'medium',
    estimatedHours: '',
    tags: []
  });
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState({});

  const steps = [
    { id: 0, name: 'Transaction Type', icon: '📋' },
    { id: 1, name: 'Project Details', icon: '🔧' },
    { id: 2, name: 'Assignment', icon: '👤' },
    { id: 3, name: 'Documentation', icon: '📎' },
    { id: 4, name: 'Review', icon: '✓' }
  ];

  const transactionTypes = [
    { value: 'feature', label: 'Feature Development', desc: 'New functionality or enhancement' },
    { value: 'bugfix', label: 'Bug Fix', desc: 'Resolve reported issues' },
    { value: 'refactor', label: 'Code Refactor', desc: 'Improve code structure' },
    { value: 'docs', label: 'Documentation', desc: 'Update or create documentation' }
  ];

  const repositories = [
    'notion-dev/core-api',
    'notion-dev/web-client',
    'notion-dev/mobile-app',
    'notion-dev/integrations'
  ];

  const teamMembers = [
    { id: 1, name: 'Sarah Chen', role: 'Senior Developer', avatar: 'SC' },
    { id: 2, name: 'Marcus Johnson', role: 'Full Stack Engineer', avatar: 'MJ' },
    { id: 3, name: 'Priya Patel', role: 'Frontend Developer', avatar: 'PP' },
    { id: 4, name: 'Alex Kim', role: 'Backend Developer', avatar: 'AK' }
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (validationErrors[field]) {
      setValidationErrors({ ...validationErrors, [field]: null });
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      type: file.type
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload({ target: { files: e.dataTransfer.files } });
  };

  const removeFile = (fileId) => {
    setUploadedFiles(uploadedFiles.filter(f => f.id !== fileId));
  };

  const validateStep = (step) => {
    const errors = {};
    
    if (step === 0 && !formData.transactionType) {
      errors.transactionType = 'Please select a transaction type';
    }
    
    if (step === 1) {
      if (!formData.repository) errors.repository = 'Repository is required';
      if (!formData.branch) errors.branch = 'Branch name is required';
      if (!formData.description) errors.description = 'Description is required';
    }
    
    if (step === 2) {
      if (!formData.assignee) errors.assignee = 'Please assign a team member';
      if (!formData.estimatedHours) errors.estimatedHours = 'Estimated hours required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep(Math.max(currentStep - 1, 0));
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log('Submitting transaction:', formData);
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Transaction Type</h3>
              <p className="text-sm text-gray-600 mb-6">Choose the type of work you're planning to track</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {transactionTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => handleInputChange('transactionType', type.value)}
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-200 hover:border-indigo-400 hover:shadow-md ${
                    formData.transactionType === type.value
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="font-semibold text-gray-900 mb-1">{type.label}</div>
                  <div className="text-sm text-gray-600">{type.desc}</div>
                </button>
              ))}
            </div>
            {validationErrors.transactionType && (
              <p className="text-sm text-red-600 mt-2">{validationErrors.transactionType}</p>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Details</h3>
              <p className="text-sm text-gray-600 mb-6">Specify the repository and work details</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Repository</label>
              <select
                value={formData.repository}
                onChange={(e) => handleInputChange('repository', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  validationErrors.repository ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select a repository</option>
                {repositories.map(repo => (
                  <option key={repo} value={repo}>{repo}</option>
                ))}
              </select>
              {validationErrors.repository && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.repository}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Branch Name</label>
              <input
                type="text"
                value={formData.branch}
                onChange={(e) => handleInputChange('branch', e.target.value)}
                placeholder="feature/new-api-endpoint"
                className={`w-full px-4 py-3 rounded-lg border bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  validationErrors.branch ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {validationErrors.branch && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.branch}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the work to be done..."
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none ${
                  validationErrors.description ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {validationErrors.description && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <div className="flex gap-3">
                {['low', 'medium', 'high', 'critical'].map(priority => (
                  <button
                    key={priority}
                    onClick={() => handleInputChange('priority', priority)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      formData.priority === priority
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Assignment & Estimation</h3>
              <p className="text-sm text-gray-600 mb-6">Assign team member and estimate effort</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Assign To</label>
              <div className="space-y-2">
                {teamMembers.map(member => (
                  <button
                    key={member.id}
                    onClick={() => handleInputChange('assignee', member.id)}
                    className={`w-full p-4 rounded-lg border-2 flex items-center gap-4 transition-all duration-200 hover:border-indigo-400 ${
                      formData.assignee === member.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                      {member.avatar}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-600">{member.role}</div>
                    </div>
                  </button>
                ))}
              </div>
              {validationErrors.assignee && (
                <p className="text-sm text-red-600 mt-2">{validationErrors.assignee}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Hours</label>
              <input
                type="number"
                value={formData.estimatedHours}
                onChange={(e) => handleInputChange('estimatedHours', e.target.value)}
                placeholder="8"
                min="0"
                step="0.5"
                className={`w-full px-4 py-3 rounded-lg border bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  validationErrors.estimatedHours ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {validationErrors.estimatedHours && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.estimatedHours}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Attach Documentation</h3>
              <p className="text-sm text-gray-600 mb-6">Upload relevant files, specs, or design assets</p>
            </div>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              }`}
            >
              <div className="text-4xl mb-3">📁</div>
              <p className="text-sm font-medium text-gray-900 mb-1">
                Drop files here or click to browse
              </p>
              <p className="text-xs text-gray-600 mb-4">
                Supports: PDF, MD, TXT, PNG, JPG (max 10MB)
              </p>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                Choose Files
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Uploaded Files ({uploadedFiles.length})</p>
                {uploadedFiles.map(file => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="text-2xl">📄</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-600">{file.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="ml-3 p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Review & Submit</h3>
              <p className="text-sm text-gray-600 mb-6">Verify all details before submission</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase mb-1">Transaction Type</p>
                <p className="text-sm text-gray-900 font-medium">
                  {transactionTypes.find(t => t.value === formData.transactionType)?.label || 'Not selected'}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-medium text-gray-500 uppercase mb-1">Repository</p>
                <p className="text-sm text-gray-900 font-mono">{formData.repository || 'Not specified'}</p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-medium text-gray-500 uppercase mb-1">Branch</p>
                <p className="text-sm text-gray-900 font-mono">{formData.branch || 'Not specified'}</p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-medium text-gray-500 uppercase mb-1">Description</p>
                <p className="text-sm text-gray-900">{formData.description || 'No description provided'}</p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-medium text-gray-500 uppercase mb-1">Assigned To</p>
                <p className="text-sm text-gray-900">
                  {teamMembers.find(m => m.id === formData.assignee)?.name || 'Not assigned'}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-medium text-gray-500 uppercase mb-1">Estimated Hours</p>
                <p className="text-sm text-gray-900">{formData.estimatedHours || '0'} hours</p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-medium text-gray-500 uppercase mb-1">Attachments</p>
                <p className="text-sm text-gray-900">{uploadedFiles.length} file(s)</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold text-indigo-600">Notion Dev</div>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <span className="hover:text-gray-900 cursor-pointer transition-colors duration-200">Workspace</span>
              <span>/</span>
              <span className="hover:text-gray-900 cursor-pointer transition-colors duration-200">Transactions</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">New Workflow</span>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <span className="text-gray-600">✕</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full">
        {/* Sidebar - Step Indicator */}
        <aside className="bg-white border-b md:border-b-0 md:border-r border-gray-200 px-4 md:px-6 py-6 md:w-64">
          <div className="space-y-1">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => index <= currentStep && setCurrentStep(index)}
                disabled={index > currentStep}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  currentStep === index
                    ? 'bg-indigo-50 text-indigo-700'
                    : index < currentStep
                    ? 'text-gray-700 hover:bg-gray-50 cursor-pointer'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep === index
                    ? 'bg-indigo-600 text-white'
                    : index < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index < currentStep ? '✓' : step.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{step.name}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-8 hidden md:block">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round((currentStep / (steps.length - 1)) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 px-4 md:px-8 py-6 md:py-8 overflow-y-auto">
            <div className="max-w-3xl">
              {getStepContent()}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white border-t border-gray-200 px-4 md:px-8 py-4">
            <div className="max-w-3xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save Draft'}
              </button>

              <div className="flex gap-3">
                {currentStep > 0 && (
                  <button
                    onClick={handleBack}
                    className="flex-1 sm:flex-none px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    Back
                  </button>
                )}
                
                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="flex-1 sm:flex-none px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-200"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex-1 sm:flex-none px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-200"
                  >
                    Submit Transaction
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}