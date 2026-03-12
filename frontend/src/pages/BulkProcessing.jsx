function BulkProcessingScreen() {
  const [activeTab, setActiveTab] = React.useState('upload');
  const [file, setFile] = React.useState(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [mappings, setMappings] = React.useState({
    timestamp: '',
    eventType: '',
    userId: '',
    metadata: '',
    status: ''
  });
  const [validationResults, setValidationResults] = React.useState([]);
  const [processing, setProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [errors, setErrors] = React.useState([]);
  const [showErrorLog, setShowErrorLog] = React.useState(false);

  const csvColumns = ['Column A', 'Column B', 'Column C', 'Column D', 'Column E'];
  const requiredFields = [
    { key: 'timestamp', label: 'Timestamp', required: true },
    { key: 'eventType', label: 'Event Type', required: true },
    { key: 'userId', label: 'User ID', required: true },
    { key: 'metadata', label: 'Metadata (JSON)', required: false },
    { key: 'status', label: 'Status', required: false }
  ];

  const sampleValidation = [
    { row: 1, status: 'valid', message: 'All fields valid', timestamp: '2024-01-15 14:23:01', eventType: 'page_view', userId: 'dev_42891' },
    { row: 2, status: 'valid', message: 'All fields valid', timestamp: '2024-01-15 14:24:15', eventType: 'code_execution', userId: 'dev_38271' },
    { row: 3, status: 'warning', message: 'Missing optional metadata field', timestamp: '2024-01-15 14:25:33', eventType: 'api_call', userId: 'dev_92847' },
    { row: 4, status: 'error', message: 'Invalid timestamp format', timestamp: 'invalid-date', eventType: 'deployment', userId: '' },
    { row: 5, status: 'valid', message: 'All fields valid', timestamp: '2024-01-15 14:27:09', eventType: 'github_sync', userId: 'dev_15634' }
  ];

  const sampleErrors = [
    { row: 4, field: 'timestamp', message: 'Invalid date format. Expected: YYYY-MM-DD HH:MM:SS', severity: 'error' },
    { row: 4, field: 'userId', message: 'Required field is empty', severity: 'error' },
    { row: 7, field: 'metadata', message: 'Invalid JSON structure', severity: 'error' },
    { row: 12, field: 'eventType', message: 'Unknown event type: "custom_event"', severity: 'warning' }
  ];

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setActiveTab('mapping');
      setValidationResults(sampleValidation);
      setErrors(sampleErrors);
    }
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
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setActiveTab('mapping');
      setValidationResults(sampleValidation);
      setErrors(sampleErrors);
    }
  };

  const handleMappingChange = (field, value) => {
    setMappings({ ...mappings, [field]: value });
  };

  const handleProcessBatch = () => {
    setProcessing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Notion for Devs</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <span className="text-lg">📊</span>
            <span className="text-sm font-medium">Dashboard</span>
          </a>
          <a href="/projects" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <span className="text-lg">📁</span>
            <span className="text-sm font-medium">Projects</span>
          </a>
          <a href="/code-editor" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <span className="text-lg">💻</span>
            <span className="text-sm font-medium">Code Editor</span>
          </a>
          <a href="/bulk-processing" className="flex items-center gap-3 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg transition-colors duration-200">
            <span className="text-lg">⚡</span>
            <span className="text-sm font-medium">Bulk Processing</span>
          </a>
          <a href="/integrations" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <span className="text-lg">🔗</span>
            <span className="text-sm font-medium">Integrations</span>
          </a>
          <a href="/analytics" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <span className="text-lg">📈</span>
            <span className="text-sm font-medium">Analytics</span>
          </a>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-medium">
              DK
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Dev User</p>
              <p className="text-xs text-gray-500">Power User</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation for Mobile */}
        <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">Bulk Processing</h1>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <span className="text-xl">☰</span>
          </button>
        </header>

        {/* Page Header */}
        <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Bulk Processing</h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">Upload and process multiple transactions simultaneously</p>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 px-4 md:px-8 py-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === 'upload'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                1. Upload File
              </button>
              <button
                onClick={() => setActiveTab('mapping')}
                disabled={!file}
                className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === 'mapping'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : file
                    ? 'text-gray-600 hover:text-gray-900'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                2. Map Columns
              </button>
              <button
                onClick={() => setActiveTab('validate')}
                disabled={!file}
                className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === 'validate'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : file
                    ? 'text-gray-600 hover:text-gray-900'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                3. Validate
              </button>
              <button
                onClick={() => setActiveTab('process')}
                disabled={!file}
                className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === 'process'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : file
                    ? 'text-gray-600 hover:text-gray-900'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                4. Process
              </button>
            </div>

            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Transaction File</h2>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-all duration-200 ${
                      isDragging
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-5xl mb-4">📄</div>
                    <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                      Drop your CSV or Excel file here
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">or click to browse</p>
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 cursor-pointer transition-colors duration-200"
                    >
                      Select File
                    </label>
                  </div>

                  {file && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                      <span className="text-2xl">✓</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-900">{file.name}</p>
                        <p className="text-xs text-green-700">
                          {(file.size / 1024).toFixed(2)} KB • Ready for processing
                        </p>
                      </div>
                      <button
                        onClick={() => setFile(null)}
                        className="text-green-700 hover:text-green-900 transition-colors duration-200"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 File Requirements</h3>
                  <ul className="text-sm text-blue-800 space-y-1 ml-4 list-disc">
                    <li>Supported formats: CSV, XLSX, XLS</li>
                    <li>Maximum file size: 50 MB</li>
                    <li>First row should contain column headers</li>
                    <li>Required columns: Timestamp, Event Type, User ID</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Mapping Tab */}
            {activeTab === 'mapping' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Map Your Columns</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Match your CSV columns to the required transaction fields
                  </p>

                  <div className="space-y-4">
                    {requiredFields.map((field) => (
                      <div key={field.key} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <label className="text-sm font-medium text-gray-900 flex items-center gap-2">
                            {field.label}
                            {field.required && <span className="text-red-500">*</span>}
                          </label>
                          <p className="text-xs text-gray-500 mt-1">
                            {field.required ? 'Required field' : 'Optional field'}
                          </p>
                        </div>
                        <select
                          value={mappings[field.key]}
                          onChange={(e) => handleMappingChange(field.key, e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white"
                        >
                          <option value="">-- Select Column --</option>
                          {csvColumns.map((col) => (
                            <option key={col} value={col}>
                              {col}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      onClick={() => setActiveTab('upload')}
                      className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setActiveTab('validate')}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Continue to Validation
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Validate Tab */}
            {activeTab === 'validate' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Validation Results</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {validationResults.filter(r => r.status === 'valid').length} valid, 
                        {validationResults.filter(r => r.status === 'warning').length} warnings, 
                        {validationResults.filter(r => r.status === 'error').length} errors
                      </p>
                    </div>
                    <button
                      onClick={() => setShowErrorLog(!showErrorLog)}
                      className="px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
                    >
                      {showErrorLog ? 'Hide' : 'Show'} Error Log
                    </button>
                  </div>

                  <div className="overflow-x-auto -mx-6 md:mx-0">
                    <div className="inline-block min-w-full align-middle">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Row
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                              Timestamp
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                              Event Type
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                              User ID
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Message
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {validationResults.map((result) => (
                            <tr key={result.row} className="hover:bg-gray-50 transition-colors duration-150">
                              <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                #{result.row}
                              </td>
                              <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    result.status === 'valid'
                                      ? 'bg-green-100 text-green-800'
                                      : result.status === 'warning'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {result.status === 'valid' ? '✓' : result.status === 'warning' ? '⚠' : '✕'}{' '}
                                  {result.status}
                                </span>
                              </td>
                              <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600 hidden md:table-cell">
                                {result.timestamp}
                              </td>
                              <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600 hidden lg:table-cell">
                                <code className="px-2 py-1 bg-gray-100 rounded text-xs">{result.eventType}</code>
                              </td>
                              <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600 hidden lg:table-cell">
                                {result.userId}
                              </td>
                              <td className="px-4 md:px-6 py-4 text-sm text-gray-600">
                                {result.message}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {showErrorLog && (
                    <div className="mt-6 border-t border-gray-200 pt-6">
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">Error Log</h3>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {errors.map((error, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg border text-sm ${
                              error.severity === 'error'
                                ? 'bg-red-50 border-red-200'
                                : 'bg-yellow-50 border-yellow-200'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <span className="text-lg">{error.severity === 'error' ? '❌' : '⚠️'}</span>
                              <div className="flex-1">
                                <p className={`font-medium ${
                                  error.severity === 'error' ? 'text-red-900' : 'text-yellow-900'
                                }`}>
                                  Row {error.row}, Field: {error.field}
                                </p>
                                <p className={error.severity === 'error' ? 'text-red-700' : 'text-yellow-700'}>
                                  {error.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex flex-col md:flex-row justify-end gap-3">
                    <button
                      onClick={() => setActiveTab('mapping')}
                      className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Back to Mapping
                    </button>
                    <button
                      onClick={() => setActiveTab('process')}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Proceed to Processing
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Process Tab */}
            {activeTab === 'process' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Process Batch</h2>

                  <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Batch Summary</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Total Rows</p>
                          <p className="text-xl font-semibold text-gray-900">1,247</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Valid</p>
                          <p className="text-xl font-semibold text-green-600">1,189</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Warnings</p>
                          <p className="text-xl font-semibold text-yellow-600">45</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Errors</p>
                          <p className="text-xl font-semibold text-red-600">13</p>
                        </div>
                      </div>
                    </div>

                    {processing && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-700">Processing transactions...</span>
                          <span className="text-gray-600">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-indigo-600 h-3 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500">
                          {Math.floor((progress / 100) * 1247)} of 1,247 rows processed
                        </p>
                      </div>
                    )}

                    {!processing && progress === 100 && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">✓</span>
                          <div>
                            <p className="text-sm font-medium text-green-900">
                              Batch processing completed successfully
                            </p>
                            <p className="text-xs text-green-700 mt-1">
                              1,189 transactions processed • 45 warnings • 13 skipped due to errors
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Processing Options</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <span className="text-sm text-gray-700">
                            Skip rows with errors (process valid rows only)
                          </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <span className="text-sm text-gray-700">
                            Send notification email when complete
                          </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <span className="text-sm text-gray-700">
                            Generate detailed processing report
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col md:flex-row justify-end gap-3">
                    <button
                      onClick={() => setActiveTab('validate')}
                      disabled={processing}
                      className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Back to Validation
                    </button>
                    {progress < 100 && (
                      <button
                        onClick={handleProcessBatch}
                        disabled={processing}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processing ? 'Processing...' : 'Start Batch Processing'}
                      </button>
                    )}
                    {progress === 100 && (
                      <button
                        onClick={() => {
                          setFile(null);
                          setProgress(0);
                          setActiveTab('upload');
                        }}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                      >
                        Process Another Batch
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 grid grid-cols-5 gap-1">
        <a href="/dashboard" className="flex flex-col items-center gap-1 py-2 text-gray-600 hover:text-gray-900">
          <span className="text-lg">📊</span>
          <span className="text-xs">Dashboard</span>
        </a>
        <a href="/projects" className="flex flex-col items-center gap-1 py-2 text-gray-600 hover:text-gray-900">
          <span className="text-lg">📁</span>
          <span className="text-xs">Projects</span>
        </a>
        <a href="/bulk-processing" className="flex flex-col items-center gap-1 py-2 text-indigo-600">
          <span className="text-lg">⚡</span>
          <span className="text-xs font-medium">Bulk</span>
        </a>
        <a href="/integrations" className="flex flex-col items-center gap-1 py-2 text-gray-600 hover:text-gray-900">
          <span className="text-lg">🔗</span>
          <span className="text-xs">Connect</span>
        </a>
        <a href="/analytics" className="flex flex-col items-center gap-1 py-2 text-gray-600 hover:text-gray-900">
          <span className="text-lg">📈</span>
          <span className="text-xs">Stats</span>
        </a>
      </nav>
    </div>
  );
}