function WorkflowTemplateEditorScreen() {
  const [selectedStep, setSelectedStep] = React.useState(null);
  const [workflowName, setWorkflowName] = React.useState('API Development Workflow');
  const [isSaving, setIsSaving] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);
  const [activePanel, setActivePanel] = React.useState('steps');
  
  const [steps, setSteps] = React.useState([
    { 
      id: 'step-1', 
      name: 'Initial Planning', 
      type: 'start',
      x: 100, 
      y: 100,
      requiredFields: ['API Specification', 'Requirements Document'],
      assignee: 'Product Manager',
      validations: ['Specification completeness check']
    },
    { 
      id: 'step-2', 
      name: 'Technical Design', 
      type: 'approval',
      x: 350, 
      y: 100,
      requiredFields: ['Architecture Diagram', 'Database Schema', 'API Endpoints'],
      assignee: 'Tech Lead',
      validations: ['Schema validation', 'Endpoint naming convention']
    },
    { 
      id: 'step-3', 
      name: 'Development', 
      type: 'task',
      x: 600, 
      y: 100,
      requiredFields: ['Code Repository', 'Unit Tests', 'Documentation'],
      assignee: 'Developer',
      validations: ['Test coverage >= 80%', 'Code review required']
    },
    { 
      id: 'step-4', 
      name: 'QA Review', 
      type: 'approval',
      x: 350, 
      y: 280,
      requiredFields: ['Test Cases', 'Test Results', 'Bug Reports'],
      assignee: 'QA Engineer',
      validations: ['All critical bugs resolved', 'Regression tests passed']
    },
    { 
      id: 'step-5', 
      name: 'Deployment', 
      type: 'end',
      x: 600, 
      y: 280,
      requiredFields: ['Deployment Checklist', 'Rollback Plan', 'Monitoring Setup'],
      assignee: 'DevOps Engineer',
      validations: ['Pre-deployment checklist complete']
    }
  ]);

  const [transitions, setTransitions] = React.useState([
    { from: 'step-1', to: 'step-2', condition: 'auto' },
    { from: 'step-2', to: 'step-3', condition: 'approved' },
    { from: 'step-3', to: 'step-4', condition: 'auto' },
    { from: 'step-4', to: 'step-3', condition: 'rejected' },
    { from: 'step-4', to: 'step-5', condition: 'approved' }
  ]);

  const [newFieldName, setNewFieldName] = React.useState('');
  const [newValidationRule, setNewValidationRule] = React.useState('');

  const handleStepClick = (step) => {
    setSelectedStep(step);
    setActivePanel('steps');
  };

  const handleAddField = () => {
    if (newFieldName && selectedStep) {
      const updatedSteps = steps.map(s => 
        s.id === selectedStep.id 
          ? { ...s, requiredFields: [...s.requiredFields, newFieldName] }
          : s
      );
      setSteps(updatedSteps);
      setSelectedStep({ ...selectedStep, requiredFields: [...selectedStep.requiredFields, newFieldName] });
      setNewFieldName('');
    }
  };

  const handleRemoveField = (fieldName) => {
    if (selectedStep) {
      const updatedSteps = steps.map(s => 
        s.id === selectedStep.id 
          ? { ...s, requiredFields: s.requiredFields.filter(f => f !== fieldName) }
          : s
      );
      setSteps(updatedSteps);
      setSelectedStep({ ...selectedStep, requiredFields: selectedStep.requiredFields.filter(f => f !== fieldName) });
    }
  };

  const handleAddValidation = () => {
    if (newValidationRule && selectedStep) {
      const updatedSteps = steps.map(s => 
        s.id === selectedStep.id 
          ? { ...s, validations: [...s.validations, newValidationRule] }
          : s
      );
      setSteps(updatedSteps);
      setSelectedStep({ ...selectedStep, validations: [...selectedStep.validations, newValidationRule] });
      setNewValidationRule('');
    }
  };

  const handleRemoveValidation = (validation) => {
    if (selectedStep) {
      const updatedSteps = steps.map(s => 
        s.id === selectedStep.id 
          ? { ...s, validations: s.validations.filter(v => v !== validation) }
          : s
      );
      setSteps(updatedSteps);
      setSelectedStep({ ...selectedStep, validations: selectedStep.validations.filter(v => v !== validation) });
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  const getStepColor = (type) => {
    switch(type) {
      case 'start': return 'bg-green-100 border-green-300 text-green-800';
      case 'approval': return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'task': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'end': return 'bg-gray-100 border-gray-300 text-gray-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Notion for Devs</h1>
        </div>
        <nav className="p-4 space-y-1">
          <a href="/dashboard" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <span className="mr-3">📊</span>
            Dashboard
          </a>
          <a href="/projects" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <span className="mr-3">📁</span>
            Projects
          </a>
          <a href="/code-editor" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <span className="mr-3">💻</span>
            Code Editor
          </a>
          <a href="/github" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <span className="mr-3">🔗</span>
            GitHub Integration
          </a>
          
          <div className="pt-4 mt-4 border-t border-gray-200">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Admin</p>
            <a href="/admin/settings" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="mr-3">⚙️</span>
              Settings
            </a>
            <a href="/admin/settings/workflows" className="flex items-center px-3 py-2 text-sm text-blue-700 bg-blue-50 rounded-lg font-medium">
              <span className="mr-3">🔄</span>
              Workflows
            </a>
            <a href="/admin/users" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="mr-3">👥</span>
              Users
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 min-w-0">
              <button className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center space-x-2 text-sm text-gray-500 min-w-0">
                <a href="/admin/settings" className="hover:text-gray-700 transition-colors">Settings</a>
                <span>/</span>
                <a href="/admin/settings/workflows" className="hover:text-gray-700 transition-colors">Workflows</a>
                <span>/</span>
                <span className="text-gray-900 font-medium truncate">Template Editor</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowPreview(!showPreview)}
                className="hidden sm:flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-md active:bg-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Template
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Workflow Canvas */}
          <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Workflow Name</label>
              <input 
                type="text"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter workflow name"
              />
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 sm:p-8 relative" style={{ minHeight: '500px' }}>
              <div className="absolute top-4 right-4 flex items-center space-x-2 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                  <span>Start</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-purple-100 border border-purple-300 rounded"></div>
                  <span>Approval</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
                  <span>Task</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
                  <span>End</span>
                </div>
              </div>

              {/* Workflow Steps */}
              <div className="relative">
                {steps.map((step) => (
                  <div 
                    key={step.id}
                    onClick={() => handleStepClick(step)}
                    className={`absolute w-48 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg ${getStepColor(step.type)} ${selectedStep?.id === step.id ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}
                    style={{ 
                      left: `${step.x}px`, 
                      top: `${step.y}px`,
                      transform: selectedStep?.id === step.id ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wide opacity-75">{step.type}</span>
                      <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{step.name}</h3>
                    <p className="text-xs opacity-75">{step.assignee}</p>
                    <div className="mt-2 pt-2 border-t border-current border-opacity-20">
                      <p className="text-xs opacity-75">{step.requiredFields.length} fields</p>
                    </div>
                  </div>
                ))}

                {/* Transition Arrows */}
                <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                  {transitions.map((trans, idx) => {
                    const fromStep = steps.find(s => s.id === trans.from);
                    const toStep = steps.find(s => s.id === trans.to);
                    if (!fromStep || !toStep) return null;
                    
                    const x1 = fromStep.x + 192;
                    const y1 = fromStep.y + 50;
                    const x2 = toStep.x;
                    const y2 = toStep.y + 50;
                    
                    return (
                      <g key={idx}>
                        <line 
                          x1={x1} 
                          y1={y1} 
                          x2={x2} 
                          y2={y2} 
                          stroke="#9CA3AF" 
                          strokeWidth="2"
                          markerEnd="url(#arrowhead)"
                        />
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                            <polygon points="0 0, 10 3, 0 6" fill="#9CA3AF" />
                          </marker>
                        </defs>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <button className="mt-8 flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Step
              </button>
            </div>
          </main>

          {/* Right Panel - Configuration */}
          <aside className="w-full lg:w-96 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 overflow-auto">
            <div className="p-6">
              {selectedStep ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Step Configuration</h2>
                    <button 
                      onClick={() => setSelectedStep(null)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <div className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStepColor(selectedStep.type)}`}>
                      {selectedStep.type.toUpperCase()}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2">{selectedStep.name}</h3>
                    <p className="text-sm text-gray-600">Assigned to: <span className="font-medium">{selectedStep.assignee}</span></p>
                  </div>

                  {/* Tabs */}
                  <div className="flex space-x-1 mb-6 border-b border-gray-200">
                    <button 
                      onClick={() => setActivePanel('steps')}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${activePanel === 'steps' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      Fields
                    </button>
                    <button 
                      onClick={() => setActivePanel('validations')}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${activePanel === 'validations' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      Validations
                    </button>
                    <button 
                      onClick={() => setActivePanel('transitions')}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${activePanel === 'transitions' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      Transitions
                    </button>
                  </div>

                  {/* Required Fields Panel */}
                  {activePanel === 'steps' && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Required Fields</h4>
                      <div className="space-y-2 mb-4">
                        {selectedStep.requiredFields.map((field, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors">
                            <span className="text-sm text-gray-700">{field}</span>
                            <button 
                              onClick={() => handleRemoveField(field)}
                              className="opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-700 transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <input 
                          type="text"
                          value={newFieldName}
                          onChange={(e) => setNewFieldName(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddField()}
                          placeholder="Field name"
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                        <button 
                          onClick={handleAddField}
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Validations Panel */}
                  {activePanel === 'validations' && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Validation Rules</h4>
                      <div className="space-y-2 mb-4">
                        {selectedStep.validations.map((validation, idx) => (
                          <div key={idx} className="flex items-start justify-between p-3 bg-amber-50 rounded-lg group hover:bg-amber-100 transition-colors">
                            <div className="flex items-start space-x-2 flex-1">
                              <svg className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm text-gray-700">{validation}</span>
                            </div>
                            <button 
                              onClick={() => handleRemoveValidation(validation)}
                              className="opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-700 transition-all ml-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <input 
                          type="text"
                          value={newValidationRule}
                          onChange={(e) => setNewValidationRule(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddValidation()}
                          placeholder="Add validation rule"
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                        <button 
                          onClick={handleAddValidation}
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Transitions Panel */}
                  {activePanel === 'transitions' && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Step Transitions</h4>
                      <div className="space-y-3">
                        {transitions.filter(t => t.from === selectedStep.id || t.to === selectedStep.id).map((trans, idx) => {
                          const isOutgoing = trans.from === selectedStep.id;
                          const otherStep = steps.find(s => s.id === (isOutgoing ? trans.to : trans.from));
                          
                          return (
                            <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-2 text-sm">
                                {isOutgoing ? (
                                  <>
                                    <span className="text-gray-500">To</span>
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                    <span className="font-medium text-gray-900">{otherStep?.name}</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-gray-500">From</span>
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                                    </svg>
                                    <span className="font-medium text-gray-900">{otherStep?.name}</span>
                                  </>
                                )}
                              </div>
                              <div className="mt-2 flex items-center space-x-2">
                                <span className="text-xs text-gray-500">Condition:</span>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${trans.condition === 'auto' ? 'bg-green-100 text-green-700' : trans.condition === 'approved' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                                  {trans.condition}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <button className="mt-4 w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Transition
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Step Selected</h3>
                  <p className="text-sm text-gray-500">Click on a step in the workflow canvas to configure its fields, validations, and transitions.</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center">
        <a href="/dashboard" className="flex flex-col items-center p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1">Home</span>
        </a>
        <a href="/projects" className="flex flex-col items-center p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <span className="text-xs mt-1">Projects</span>
        </a>
        <a href="/code-editor" className="flex flex-col items-center p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span className="text-xs mt-1">Code</span>
        </a>
        <a href="/admin/settings" className="flex flex-col items-center p-2 text-blue-600 hover:text-blue-700 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs mt-1">Settings</span>
        </a>
      </nav>
    </div>
  );
}