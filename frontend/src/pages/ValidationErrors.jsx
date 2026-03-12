function ValidationErrorsScreen() {
  const [errors, setErrors] = React.useState([
    {
      id: 1,
      field: 'api_endpoint',
      fieldLabel: 'API Endpoint',
      message: 'Must be a valid HTTPS URL',
      value: 'http://api.example.com',
      suggestion: 'Use https:// protocol for secure connections'
    },
    {
      id: 2,
      field: 'auth_token',
      fieldLabel: 'Authentication Token',
      message: 'Token format is invalid',
      value: 'Bearer xyz123',
      suggestion: 'Expected format: 64-character hexadecimal string'
    },
    {
      id: 3,
      field: 'webhook_url',
      fieldLabel: 'Webhook URL',
      message: 'URL is unreachable',
      value: 'https://localhost:3000/webhook',
      suggestion: 'Ensure the endpoint is publicly accessible'
    },
    {
      id: 4,
      field: 'rate_limit',
      fieldLabel: 'Rate Limit',
      message: 'Value must be between 1 and 1000',
      value: '5000',
      suggestion: 'Reduce to maximum allowed value of 1000 requests/minute'
    },
    {
      id: 5,
      field: 'database_id',
      fieldLabel: 'Notion Database ID',
      message: 'Database not found or access denied',
      value: 'a1b2c3d4e5f6',
      suggestion: 'Verify database exists and integration has access permissions'
    }
  ]);

  const [activeError, setActiveError] = React.useState(null);

  const handleClose = () => {
    window.history.back();
  };

  const handleJumpToField = (fieldId) => {
    setActiveError(fieldId);
    // Simulate scrolling to field
    setTimeout(() => setActiveError(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Error modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-red-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Validation Failed</h2>
              <p className="text-sm text-gray-600">{errors.length} error{errors.length !== 1 ? 's' : ''} found in your submission</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Error list */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-3">
            {errors.map((error) => (
              <div
                key={error.id}
                className={`group border rounded-lg p-4 transition-all duration-200 ${
                  activeError === error.field
                    ? 'border-red-300 bg-red-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-red-200 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Field label */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 font-mono">
                        {error.field}
                      </span>
                      <span className="text-sm font-medium text-gray-900">{error.fieldLabel}</span>
                    </div>

                    {/* Error message */}
                    <p className="text-sm text-red-600 font-medium mb-2">
                      {error.message}
                    </p>

                    {/* Current value */}
                    {error.value && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Current value:</p>
                        <code className="block text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 text-gray-700 font-mono break-all">
                          {error.value}
                        </code>
                      </div>
                    )}

                    {/* Suggestion */}
                    {error.suggestion && (
                      <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg p-3">
                        <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs text-blue-800">{error.suggestion}</p>
                      </div>
                    )}
                  </div>

                  {/* Jump to field button */}
                  <button
                    onClick={() => handleJumpToField(error.field)}
                    className="flex-shrink-0 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 opacity-0 group-hover:opacity-100"
                  >
                    Jump to field
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            Fix these errors to continue with your workflow
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              Go back
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded-lg cursor-not-allowed"
              disabled
            >
              Submit anyway
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}