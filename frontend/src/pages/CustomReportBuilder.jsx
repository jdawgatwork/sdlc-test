function CustomReportBuilderScreen() {
  const [selectedDataSource, setSelectedDataSource] = React.useState(null);
  const [selectedFields, setSelectedFields] = React.useState([]);
  const [groupBy, setGroupBy] = React.useState([]);
  const [aggregations, setAggregations] = React.useState([]);
  const [visualizationType, setVisualizationType] = React.useState('table');
  const [showSaveModal, setShowSaveModal] = React.useState(false);
  const [reportName, setReportName] = React.useState('');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const dataSources = [
    { id: 'pages', name: 'Pages & Documents', count: 1247, icon: '📄' },
    { id: 'code-blocks', name: 'Code Blocks', count: 3891, icon: '💻' },
    { id: 'tasks', name: 'Tasks & Issues', count: 542, icon: '✓' },
    { id: 'commits', name: 'Git Commits', count: 2104, icon: '🔀' },
    { id: 'pull-requests', name: 'Pull Requests', count: 318, icon: '🔄' },
    { id: 'team-activity', name: 'Team Activity', count: 8765, icon: '👥' }
  ];

  const availableFields = {
    pages: ['Title', 'Created Date', 'Modified Date', 'Author', 'Word Count', 'Tags', 'Status'],
    'code-blocks': ['Language', 'Lines of Code', 'Created Date', 'Author', 'Execution Count', 'Parent Page'],
    tasks: ['Title', 'Status', 'Priority', 'Assignee', 'Created Date', 'Due Date', 'Labels'],
    commits: ['Message', 'Author', 'Date', 'Files Changed', 'Additions', 'Deletions', 'Branch'],
    'pull-requests': ['Title', 'Author', 'Status', 'Created Date', 'Merged Date', 'Reviewers', 'Comments'],
    'team-activity': ['User', 'Action Type', 'Timestamp', 'Resource', 'Duration']
  };

  const aggregationOptions = ['Count', 'Sum', 'Average', 'Min', 'Max', 'Distinct Count'];
  const visualizations = [
    { id: 'table', name: 'Table', icon: '📊' },
    { id: 'bar', name: 'Bar Chart', icon: '📊' },
    { id: 'line', name: 'Line Chart', icon: '📈' },
    { id: 'pie', name: 'Pie Chart', icon: '🥧' },
    { id: 'timeline', name: 'Timeline', icon: '📅' }
  ];

  const toggleField = (field) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter(f => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const toggleGroupBy = (field) => {
    if (groupBy.includes(field)) {
      setGroupBy(groupBy.filter(f => f !== field));
    } else {
      setGroupBy([...groupBy, field]);
    }
  };

  const addAggregation = () => {
    setAggregations([...aggregations, { field: '', function: 'Count' }]);
  };

  const previewData = [
    { author: 'sarah.chen', pages: 42, avgWords: 1250, lastActive: '2 hours ago' },
    { author: 'mike.torres', pages: 38, avgWords: 980, lastActive: '5 hours ago' },
    { author: 'alex.kim', pages: 31, avgWords: 1420, lastActive: '1 day ago' },
    { author: 'priya.patel', pages: 29, avgWords: 1100, lastActive: '3 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="font-semibold text-gray-900">DevNotion</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="p-4 space-y-1">
          <a href="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200">
            <span>📊</span>
            <span className="text-sm font-medium">Dashboard</span>
          </a>
          <a href="/pages" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200">
            <span>📝</span>
            <span className="text-sm font-medium">Pages</span>
          </a>
          <a href="/code" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200">
            <span>💻</span>
            <span className="text-sm font-medium">Code Blocks</span>
          </a>
          <a href="/tasks" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200">
            <span>✓</span>
            <span className="text-sm font-medium">Tasks</span>
          </a>
          <a href="/reports/builder" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 transition-colors duration-200">
            <span>📈</span>
            <span className="text-sm font-medium">Reports</span>
          </a>
          <a href="/settings" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200">
            <span>⚙️</span>
            <span className="text-sm font-medium">Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Custom Report Builder</h1>
                <p className="text-sm text-gray-500 mt-1">Create custom reports from your workspace data</p>
              </div>
            </div>
            <button 
              onClick={() => setShowSaveModal(true)}
              disabled={!selectedDataSource || selectedFields.length === 0}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md"
            >
              Save Template
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Configuration Panel */}
              <div className="lg:col-span-2 space-y-6">
                {/* Data Source Selector */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Select Data Source</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {dataSources.map(source => (
                      <button
                        key={source.id}
                        onClick={() => setSelectedDataSource(source.id)}
                        className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${
                          selectedDataSource === source.id
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{source.icon}</span>
                          <div className="text-left">
                            <p className="font-medium text-gray-900 text-sm">{source.name}</p>
                            <p className="text-xs text-gray-500">{source.count.toLocaleString()} records</p>
                          </div>
                        </div>
                        {selectedDataSource === source.id && (
                          <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Field Picker */}
                {selectedDataSource && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">2. Select Fields</h2>
                    <div className="flex flex-wrap gap-2">
                      {availableFields[selectedDataSource].map(field => (
                        <button
                          key={field}
                          onClick={() => toggleField(field)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            selectedFields.includes(field)
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {field}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      {selectedFields.length} field{selectedFields.length !== 1 ? 's' : ''} selected
                    </p>
                  </div>
                )}

                {/* Grouping Configuration */}
                {selectedFields.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">3. Group By (Optional)</h2>
                    <div className="flex flex-wrap gap-2">
                      {selectedFields.map(field => (
                        <button
                          key={field}
                          onClick={() => toggleGroupBy(field)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            groupBy.includes(field)
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {field}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Aggregation Options */}
                {selectedFields.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">4. Aggregations</h2>
                      <button
                        onClick={addAggregation}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        + Add
                      </button>
                    </div>
                    {aggregations.length === 0 ? (
                      <p className="text-sm text-gray-500">No aggregations added yet</p>
                    ) : (
                      <div className="space-y-3">
                        {aggregations.map((agg, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row gap-2">
                            <select className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                              <option value="">Select field...</option>
                              {selectedFields.map(field => (
                                <option key={field} value={field}>{field}</option>
                              ))}
                            </select>
                            <select className="sm:w-40 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                              {aggregationOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Visualization Selector */}
                {selectedFields.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">5. Choose Visualization</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {visualizations.map(viz => (
                        <button
                          key={viz.id}
                          onClick={() => setVisualizationType(viz.id)}
                          className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                            visualizationType === viz.id
                              ? 'border-indigo-600 bg-indigo-50'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-2xl mb-2">{viz.icon}</span>
                          <span className="text-xs font-medium text-gray-900">{viz.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Preview Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 sticky top-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
                  {!selectedDataSource ? (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-3">📊</div>
                      <p className="text-sm text-gray-500">Select a data source to begin</p>
                    </div>
                  ) : selectedFields.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-3">🎯</div>
                      <p className="text-sm text-gray-500">Choose fields to preview data</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-2 font-semibold text-gray-700">Author</th>
                              <th className="text-left py-2 font-semibold text-gray-700">Pages</th>
                              <th className="text-left py-2 font-semibold text-gray-700">Avg Words</th>
                            </tr>
                          </thead>
                          <tbody>
                            {previewData.map((row, idx) => (
                              <tr key={idx} className="border-b border-gray-100">
                                <td className="py-2 text-gray-900">{row.author}</td>
                                <td className="py-2 text-gray-600">{row.pages}</td>
                                <td className="py-2 text-gray-600">{row.avgWords}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500">Showing preview of 4 rows</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Save Report Template</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                <input
                  type="text"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="e.g., Team Activity Summary"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                <textarea
                  rows="3"
                  placeholder="Brief description of this report..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="share" className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500" />
                <label htmlFor="share" className="text-sm text-gray-700">Share with team</label>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Save Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}