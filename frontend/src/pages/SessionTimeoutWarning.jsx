function SessionTimeoutWarningScreen() {
  const [timeRemaining, setTimeRemaining] = React.useState(120);
  const [isExtending, setIsExtending] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleExtendSession = () => {
    setIsExtending(true);
    setTimeout(() => {
      setIsExtending(false);
      setTimeRemaining(120);
    }, 800);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getUrgencyColor = () => {
    if (timeRemaining <= 30) return 'text-red-600';
    if (timeRemaining <= 60) return 'text-amber-600';
    return 'text-gray-900';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">Notion for Developers</h1>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="/workspace" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Workspace</a>
            <a href="/code-editor" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Code Editor</a>
            <a href="/github" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">GitHub</a>
            <a href="/profile" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Profile</a>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
        {/* Modal */}
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative animate-scale-in">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Session Expiring Soon
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-center mb-6">
            Your session will expire due to inactivity. Any unsaved changes in your code editor or workspace will be lost.
          </p>

          {/* Countdown Timer */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-2">Time remaining</p>
            <div className={`text-5xl md:text-6xl font-bold text-center transition-colors ${getUrgencyColor()}`}>
              {formatTime(timeRemaining)}
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${
                  timeRemaining <= 30 ? 'bg-red-500' : 
                  timeRemaining <= 60 ? 'bg-amber-500' : 
                  'bg-indigo-500'
                }`}
                style={{ width: `${(timeRemaining / 120) * 100}%` }}
              />
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-medium text-amber-900 mb-1">Unsaved work detected</p>
              <p className="text-sm text-amber-700">
                You have unsaved changes in <span className="font-semibold">api-service.ts</span> and <span className="font-semibold">2 workspace pages</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleExtendSession}
              disabled={isExtending}
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 active:bg-indigo-800 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              {isExtending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Extending...
                </span>
              ) : (
                'Extend Session'
              )}
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all duration-200"
            >
              Logout Now
            </button>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-gray-500 text-center mt-6">
            Sessions automatically expire after 30 minutes of inactivity for security purposes
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}