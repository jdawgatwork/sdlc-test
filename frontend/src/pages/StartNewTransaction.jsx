function StartNewTransactionScreen() {
  const [selectedType, setSelectedType] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(true);

  const transactionTypes = [
    {
      id: 'api-integration',
      title: 'API Integration',
      description: 'Set up webhooks, OAuth flows, and REST API endpoints for your workspace',
      icon: '🔌',
      color: 'blue'
    },
    {
      id: 'code-review',
      title: 'Code Review Session',
      description: 'Create a collaborative code review with inline comments and approval workflow',
      icon: '👀',
      color: 'purple'
    },
    {
      id: 'sprint-planning',
      title: 'Sprint Planning',
      description: 'Initialize a new sprint with tasks, story points, and team assignments',
      icon: '📋',
      color: 'green'
    },
    {
      id: 'deployment',
      title: 'Deployment Pipeline',
      description: 'Configure CI/CD workflow with staging, testing, and production environments',
      icon: '🚀',
      color: 'orange'
    },
    {
      id: 'bug-triage',
      title: 'Bug Triage',
      description: 'Track and prioritize bugs with severity levels and assignee management',
      icon: '🐛',
      color: 'red'
    },
    {
      id: 'documentation',
      title: 'Technical Documentation',
      description: 'Build comprehensive docs with code examples, diagrams, and API references',
      icon: '📚',
      color: 'indigo'
    }
  ];

  const handleContinue = () => {
    if (selectedType) {
      console.log('Starting transaction:', selectedType);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    window.history.back();
  };

  const getColorClasses = (color, selected) => {
    const colorMap = {
      blue: selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300',
      purple: selected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300',
      green: selected ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300',
      orange: selected ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300',
      red: selected ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300',
      indigo: selected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'
    };
    return colorMap[color] || colorMap.blue;
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity duration-300"
        onClick={handleCancel}
      ></div>

      {/* Modal Container */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl transform transition-all duration-300">
          
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-5 sm:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Start New Transaction</h2>
                <p className="mt-1 text-sm text-gray-500">Select a template to begin your workflow</p>
              </div>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 sm:px-8 max-h-[calc(100vh-240px)] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {transactionTypes.map((type) => {
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`
                      text-left p-5 rounded-lg border-2 transition-all duration-200
                      ${getColorClasses(type.color, isSelected)}
                      transform hover:scale-[1.02] hover:shadow-md
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    `}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl flex-shrink-0">{type.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {type.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {type.description}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Helper Text */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    Each template includes pre-configured fields, automation rules, and integrations specific to your workflow type. You can customize any template after creation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 sm:px-8 bg-gray-50 rounded-b-xl">
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center space-y-reverse space-y-3 sm:space-y-0">
              <button
                onClick={handleCancel}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                disabled={!selectedType}
                className={`
                  w-full sm:w-auto px-5 py-2.5 text-sm font-medium rounded-lg
                  transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  ${selectedType 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md transform hover:scale-[1.02]' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                Continue with {selectedType ? transactionTypes.find(t => t.id === selectedType)?.title : 'Selection'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}