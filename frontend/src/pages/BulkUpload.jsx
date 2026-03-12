function BulkUploadScreen() {
  const [uploadedFile, setUploadedFile] = React.useState(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(1);
  const [columnMapping, setColumnMapping] = React.useState({
    title: '',
    description: '',
    status: '',
    assignee: '',
    priority: '',
    dueDate: ''
  });
  const [validationResults, setValidationResults] = React.useState([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [errors, setErrors] = React.useState([]);
  const [showValidation, setShowValidation] = React.useState(false);

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
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.csv') || file.name.endsWith('.xlsx'))) {
      setUploadedFile(file);
      setCurrentStep(2);
      simulateValidation();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setCurrentStep(2);
      simulateValidation();
    }
  };

  const simulateValidation = () => {
    setShowValidation(true);
    setValidationResults([
      { row: 1, title: 'Implement OAuth2 authentication', status: 'todo', assignee: 'sarah@dev.io', priority: 'high', valid: true },
      { row: 2, title: 'Add markdown preview', status: 'in-progress', assignee: 'mike@dev.io', priority: 'medium', valid: true },
      { row: 3, title: 'Fix memory leak in editor', status: 'review', assignee: '', priority: 'critical', valid: false },
      { row: 4, title: 'Update API documentation', status: 'todo', assignee: 'alex@dev.io', priority: 'low', valid: true },
      { row: 5, title: 'Refactor webhook handlers', status: 'invalid_status', assignee: 'jordan@dev.io', priority: 'medium', valid: false }
    ]);
    setErrors([
      { row: 3, field: 'assignee', message: 'Assignee email is required' },
      { row: 5, field: 'status', message: 'Invalid status value: "invalid_status"' }
    ]);
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    setCurrentStep(3);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessing(false);
        }, 500);
      }
    }, 200);
  };

  const availableColumns = ['Title', 'Description', 'Status', 'Assignee', 'Priority', 'Due Date', 'Tags', 'Estimate'];
  const requiredFields = ['title', 'status'];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">DevWorkspace</h1>
        </div>
        <nav className="flex-1 p-4">
          <a href="#" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <span>📊 Dashboard</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <span>📝 Projects</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <span>🔗 Integrations</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg">
            <span>📤 Bulk Upload</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <span>⚙️ Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Bulk Upload</h2>
              <p className="text-sm text-gray-500 mt-1">Import tasks and issues from CSV or Excel</p>
            </div>
            <button className="lg:hidden p-2 text-gray-500 hover:text-gray-700">
              <span className="text-2xl">☰</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            {/* Progress Steps */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors duration-200 ${currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    1
                  </div>
                  <div className="hidden sm:block ml-3">
                    <p className="text-sm font-medium text-gray-900">Upload File</p>
                    <p className="text-xs text-gray-500">CSV or Excel</p>
                  </div>
                  <div className={`flex-1 h-1 mx-4 transition-colors duration-200 ${currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                </div>
                
                <div className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors duration-200 ${currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    2
                  </div>
                  <div className="hidden sm:block ml-3">
                    <p className="text-sm font-medium text-gray-900">Map & Validate</p>
                    <p className="text-xs text-gray-500">Review data</p>
                  </div>
                  <div className={`flex-1 h-1 mx-4 transition-colors duration-200 ${currentStep >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                </div>
                
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors duration-200 ${currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    3
                  </div>
                  <div className="hidden sm:block ml-3">
                    <p className="text-sm font-medium text-gray-900">Process</p>
                    <p className="text-xs text-gray-500">Import tasks</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 1: Upload */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Download Template</h3>
                    <p className="text-sm text-gray-600 mb-4">Use our template to ensure your data is formatted correctly</p>
                    <div className="flex flex-wrap gap-3">
                      <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-200">
                        <span className="mr-2">📄</span>
                        Download CSV Template
                      </button>
                      <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
                        <span className="mr-2">📊</span>
                        Download Excel Template
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Your File</h3>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-all duration-200 ${
                        isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-5xl mb-4">📁</div>
                      <p className="text-base font-medium text-gray-900 mb-2">
                        Drag and drop your file here
                      </p>
                      <p className="text-sm text-gray-500 mb-4">or</p>
                      <label className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 hover:shadow-md transition-all duration-200 cursor-pointer">
                        <span>Browse Files</span>
                        <input
                          type="file"
                          accept=".csv,.xlsx,.xls"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-4">Supports CSV and Excel files (max 10MB)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 Best Practices</h4>
                  <ul className="text-sm text-blue-800 space-y-1.5">
                    <li>• Ensure column headers match the template exactly</li>
                    <li>• Use valid status values: todo, in-progress, review, done</li>
                    <li>• Email addresses must be valid and registered users</li>
                    <li>• Priority values: low, medium, high, critical</li>
                    <li>• Dates should be in YYYY-MM-DD format</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 2: Mapping & Validation */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">File Uploaded</h3>
                      <p className="text-sm text-gray-500 mt-1">{uploadedFile?.name} ({(uploadedFile?.size / 1024).toFixed(1)} KB)</p>
                    </div>
                    <button
                      onClick={() => {
                        setUploadedFile(null);
                        setCurrentStep(1);
                        setShowValidation(false);
                      }}
                      className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Column Mapping</h3>
                    <p className="text-sm text-gray-600 mb-6">Map your CSV columns to task fields</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {Object.keys(columnMapping).map((field) => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                            {requiredFields.includes(field) && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          <select
                            value={columnMapping[field]}
                            onChange={(e) => setColumnMapping({ ...columnMapping, [field]: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200"
                          >
                            <option value="">Select column...</option>
                            {availableColumns.map((col) => (
                              <option key={col} value={col.toLowerCase()}>
                                {col}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Validation Results */}
                {showValidation && (
                  <>
                    {errors.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 md:p-6">
                        <h4 className="text-sm font-semibold text-red-900 mb-3">⚠️ Validation Errors ({errors.length})</h4>
                        <div className="space-y-2">
                          {errors.map((error, idx) => (
                            <div key={idx} className="text-sm text-red-800 bg-white rounded-lg p-3">
                              <span className="font-medium">Row {error.row}:</span> {error.message}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="p-6 md:p-8 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Preview & Validation</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {validationResults.filter(r => r.valid).length} of {validationResults.length} rows valid
                        </p>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Row</th>
                              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {validationResults.map((result) => (
                              <tr key={result.row} className={result.valid ? '' : 'bg-red-50'}>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.row}</td>
                                <td className="px-4 md:px-6 py-4 text-sm text-gray-900">{result.title}</td>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                                    result.status === 'todo' ? 'bg-gray-100 text-gray-700' :
                                    result.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                    result.status === 'review' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                  }`}>
                                    {result.status}
                                  </span>
                                </td>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.assignee || '—'}</td>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                                    result.priority === 'critical' ? 'bg-red-100 text-red-700' :
                                    result.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                                    result.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {result.priority}
                                  </span>
                                </td>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                  {result.valid ? (
                                    <span className="text-green-600 text-xl">✓</span>
                                  ) : (
                                    <span className="text-red-600 text-xl">✗</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                      <button
                        onClick={() => {
                          setCurrentStep(1);
                          setUploadedFile(null);
                          setShowValidation(false);
                        }}
                        className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={errors.length > 0}
                        className={`px-6 py-3 text-sm font-medium text-white rounded-lg transition-all duration-200 ${
                          errors.length > 0
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-md'
                        }`}
                      >
                        {errors.length > 0 ? 'Fix Errors to Continue' : 'Import Tasks'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 3: Processing */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">{isProcessing ? '⚙️' : '✅'}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {isProcessing ? 'Processing Import...' : 'Import Complete!'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {isProcessing 
                        ? 'Please wait while we import your tasks'
                        : `Successfully imported ${validationResults.filter(r => r.valid).length} tasks`
                      }
                    </p>
                  </div>

                  <div className="max-w-2xl mx-auto">
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">Progress</span>
                        <span className="font-semibold text-indigo-600">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-3 rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {!isProcessing && (
                      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                          onClick={() => {
                            setCurrentStep(1);
                            setUploadedFile(null);
                            setProgress(0);
                            setShowValidation(false);
                          }}
                          className="px-6 py-3 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
                        >
                          Import Another File
                        </button>
                        <button className="px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 hover:shadow-md transition-all duration-200">
                          View Imported Tasks
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {!isProcessing && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h4 className="text-sm font-semibold text-green-900 mb-3">✓ Import Summary</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-green-600 font-semibold text-2xl">{validationResults.filter(r => r.valid).length}</p>
                        <p className="text-gray-600 mt-1">Tasks Created</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-red-600 font-semibold text-2xl">{errors.length}</p>
                        <p className="text-gray-600 mt-1">Rows Skipped</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-gray-900 font-semibold text-2xl">{validationResults.length}</p>
                        <p className="text-gray-600 mt-1">Total Rows</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 px-4 py-2 flex justify-around">
        <a href="#" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-gray-900 transition-colors duration-200">
          <span className="text-xl mb-1">📊</span>
          <span className="text-xs">Dashboard</span>
        </a>
        <a href="#" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-gray-900 transition-colors duration-200">
          <span className="text-xl mb-1">📝</span>
          <span className="text-xs">Projects</span>
        </a>
        <a href="#" className="flex flex-col items-center py-2 px-3 text-indigo-600">
          <span className="text-xl mb-1">📤</span>
          <span className="text-xs font-medium">Upload</span>
        </a>
        <a href="#" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-gray-900 transition-colors duration-200">
          <span className="text-xl mb-1">⚙️</span>
          <span className="text-xs">Settings</span>
        </a>
      </nav>
    </div>
  );
}