function MapColumnsScreen() {
  const [mappings, setMappings] = React.useState({
    date: '',
    description: '',
    amount: '',
    category: '',
    account: '',
    notes: '',
    tags: ''
  });
  
  const [sourceColumns, setSourceColumns] = React.useState([
    'Transaction Date',
    'Description',
    'Amount (USD)',
    'Merchant Name',
    'Account Number',
    'Category',
    'Payment Method',
    'Reference ID',
    'Notes'
  ]);

  const [saveAsTemplate, setSaveAsTemplate] = React.useState(false);
  const [templateName, setTemplateName] = React.useState('');
  const [showPreview, setShowPreview] = React.useState(false);

  const requiredFields = ['date', 'description', 'amount'];
  
  const systemFields = [
    { key: 'date', label: 'Transaction Date', required: true },
    { key: 'description', label: 'Description', required: true },
    { key: 'amount', label: 'Amount', required: true },
    { key: 'category', label: 'Category', required: false },
    { key: 'account', label: 'Account', required: false },
    { key: 'notes', label: 'Notes', required: false },
    { key: 'tags', label: 'Tags', required: false }
  ];

  const previewData = [
    { 'Transaction Date': '2024-01-15', 'Description': 'AWS Services', 'Amount (USD)': '-$247.83', 'Category': 'Infrastructure' },
    { 'Transaction Date': '2024-01-16', 'Description': 'GitHub Enterprise', 'Amount (USD)': '-$21.00', 'Category': 'Tools' },
    { 'Transaction Date': '2024-01-17', 'Description': 'Vercel Pro', 'Amount (USD)': '-$20.00', 'Category': 'Hosting' }
  ];

  const handleMappingChange = (fieldKey, sourceColumn) => {
    setMappings(prev => ({
      ...prev,
      [fieldKey]: sourceColumn
    }));
  };

  const isValid = () => {
    return requiredFields.every(field => mappings[field] !== '');
  };

  const handleApply = () => {
    console.log('Applying mappings:', mappings);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">Map Columns</h1>
          </div>
          <div className="flex items-center space-x-2 md:space-x-3">
            <button className="px-3 md:px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
              Cancel
            </button>
            <button 
              onClick={handleApply}
              disabled={!isValid()}
              className={`px-3 md:px-4 py-2 text-sm font-medium text-white rounded-lg transition-all duration-200 ${
                isValid() 
                  ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-md' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Apply Mapping
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-blue-900">Map your file columns</h3>
              <p className="text-sm text-blue-700 mt-1">Match each column from your uploaded file to the corresponding system field. Required fields must be mapped to proceed.</p>
            </div>
          </div>
        </div>

        {/* Mapping Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">System Field</h3>
                <p className="text-xs text-gray-500 mt-0.5">Target field in your workspace</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Source Column</h3>
                <p className="text-xs text-gray-500 mt-0.5">Column from your uploaded file</p>
              </div>
            </div>
          </div>

          {/* Mapping Rows */}
          <div className="divide-y divide-gray-100">
            {systemFields.map((field) => (
              <div key={field.key} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">{field.label}</span>
                        {field.required && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                            Required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <select
                      value={mappings[field.key]}
                      onChange={(e) => handleMappingChange(field.key, e.target.value)}
                      className={`w-full px-3 py-2 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        field.required && !mappings[field.key]
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <option value="">-- Select column --</option>
                      {sourceColumns.map((col) => (
                        <option key={col} value={col}>{col}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-6">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
          >
            <svg className={`w-4 h-4 transition-transform duration-200 ${showPreview ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span>Preview mapped data (3 rows)</span>
          </button>

          {showPreview && (
            <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(previewData[0]).map((header) => (
                        <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {previewData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors duration-150">
                        {Object.values(row).map((value, cellIdx) => (
                          <td key={cellIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Save Template Section */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="saveTemplate"
              checked={saveAsTemplate}
              onChange={(e) => setSaveAsTemplate(e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer"
            />
            <div className="flex-1">
              <label htmlFor="saveTemplate" className="text-sm font-medium text-gray-900 cursor-pointer">
                Save as mapping template
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Reuse this mapping configuration for future uploads of similar files
              </p>
              {saveAsTemplate && (
                <input
                  type="text"
                  placeholder="Enter template name (e.g., 'Bank Statement CSV')"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="mt-3 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-all duration-200"
                />
              )}
            </div>
          </div>
        </div>

        {/* Validation Message */}
        {!isValid() && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-yellow-900">Required fields missing</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Please map all required fields: {requiredFields.filter(f => !mappings[f]).map(f => systemFields.find(sf => sf.key === f)?.label).join(', ')}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}