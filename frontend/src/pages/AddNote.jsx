function AddNoteScreen() {
  const [noteText, setNoteText] = React.useState('');
  const [isImportant, setIsImportant] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [charCount, setCharCount] = React.useState(0);
  
  const handleNoteChange = (e) => {
    setNoteText(e.target.value);
    setCharCount(e.target.value.length);
  };
  
  const handleSave = () => {
    setIsSaving(true);
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      // Would normally close modal or redirect
    }, 800);
  };
  
  const handleCancel = () => {
    setNoteText('');
    setIsImportant(false);
    setCharCount(0);
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-opacity-50 flex items-start md:items-center justify-center p-4 pt-20 md:pt-4">
      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all">
        
        {/* Modal Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Add Note</h2>
              <p className="text-sm text-gray-500">Transaction #TXN-2024-0847</p>
            </div>
          </div>
          <button 
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-6">
          
          {/* Transaction Context */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-800">
                    Deployed
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">Production deployment: API Gateway v2.4.1</p>
                <p className="text-xs text-gray-600">Deployed by @sarah.chen to us-east-1 production cluster</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">$127.45</p>
                <p className="text-xs text-gray-500">Est. cost</p>
              </div>
            </div>
          </div>

          {/* Note Input */}
          <div className="mb-4">
            <label htmlFor="note-text" className="block text-sm font-medium text-gray-700 mb-2">
              Note
            </label>
            <textarea
              id="note-text"
              value={noteText}
              onChange={handleNoteChange}
              placeholder="Add context, observations, or follow-up actions..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none text-sm text-gray-900 placeholder-gray-400"
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-500">
                {charCount > 0 && `${charCount} character${charCount !== 1 ? 's' : ''}`}
              </p>
              <p className="text-xs text-gray-400">Supports markdown formatting</p>
            </div>
          </div>

          {/* Important Flag */}
          <div className="mb-6">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isImportant}
                  onChange={(e) => setIsImportant(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center ${
                  isImportant 
                    ? 'bg-amber-500 border-amber-500' 
                    : 'border-gray-300 group-hover:border-gray-400'
                }`}>
                  {isImportant && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <svg className={`w-4 h-4 transition-colors duration-200 ${isImportant ? 'text-amber-500' : 'text-gray-400 group-hover:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                  Mark as important
                </span>
              </div>
            </label>
            <p className="text-xs text-gray-500 ml-8 mt-1">
              Important notes are highlighted and pinned to the top of the transaction timeline
            </p>
          </div>

          {/* Timestamp Preview */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 mb-6">
            <div className="flex items-start space-x-2">
              <svg className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-xs font-medium text-indigo-900">Note will be timestamped</p>
                <p className="text-xs text-indigo-700 mt-0.5">
                  {new Date().toLocaleString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true 
                  })}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              disabled={!noteText.trim() || isSaving}
              className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center space-x-2"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Save Note</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}