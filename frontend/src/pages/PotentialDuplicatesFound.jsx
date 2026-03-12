function PotentialDuplicatesFoundScreen() {
  const [selectedDuplicate, setSelectedDuplicate] = React.useState(null);
  const [showComparison, setShowComparison] = React.useState(false);

  const newTransaction = {
    title: "Implement OAuth 2.0 Authentication",
    type: "Feature Request",
    priority: "High",
    assignee: "Sarah Chen",
    estimate: "8 story points",
    tags: ["authentication", "security", "backend"],
    description: "Add OAuth 2.0 support for GitHub and Google authentication providers"
  };

  const duplicates = [
    {
      id: 1,
      similarity: 94,
      title: "Add OAuth Authentication Flow",
      type: "Feature Request",
      priority: "High",
      assignee: "Sarah Chen",
      estimate: "8 story points",
      tags: ["authentication", "oauth", "backend"],
      status: "In Progress",
      createdBy: "Mike Johnson",
      createdDate: "2024-01-15",
      lastUpdated: "2 days ago"
    },
    {
      id: 2,
      similarity: 87,
      title: "GitHub OAuth Integration",
      type: "Feature Request",
      priority: "Medium",
      assignee: "Alex Rodriguez",
      estimate: "5 story points",
      tags: ["github", "authentication", "integration"],
      status: "Review",
      createdBy: "Emily Watson",
      createdDate: "2024-01-10",
      lastUpdated: "5 days ago"
    },
    {
      id: 3,
      similarity: 79,
      title: "User Authentication System Upgrade",
      type: "Technical Task",
      priority: "High",
      assignee: "Sarah Chen",
      estimate: "13 story points",
      tags: ["authentication", "security", "infrastructure"],
      status: "Planning",
      createdBy: "David Kim",
      createdDate: "2024-01-08",
      lastUpdated: "1 week ago"
    }
  ];

  const getSimilarityColor = (score) => {
    if (score >= 90) return "text-red-600 bg-red-50 border-red-200";
    if (score >= 80) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-yellow-600 bg-yellow-50 border-yellow-200";
  };

  const getSimilarityBadgeColor = (score) => {
    if (score >= 90) return "bg-red-100 text-red-700 border-red-200";
    if (score >= 80) return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-yellow-100 text-yellow-700 border-yellow-200";
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Potential Duplicates Found</h2>
                <p className="text-sm text-gray-500 mt-1">We found {duplicates.length} similar transactions that may be duplicates</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            
            {/* New Transaction Summary */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Your New Transaction</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{newTransaction.title}</h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
                    {newTransaction.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{newTransaction.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                    {newTransaction.priority}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs text-gray-600 bg-white border border-gray-200">
                    {newTransaction.assignee}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs text-gray-600 bg-white border border-gray-200">
                    {newTransaction.estimate}
                  </span>
                  {newTransaction.tags.map((tag, idx) => (
                    <span key={idx} className="inline-flex items-center px-2 py-1 rounded-md text-xs text-gray-600 bg-gray-100 border border-gray-200">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Similar Transactions */}
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Similar Existing Transactions</h3>
              <div className="space-y-3">
                {duplicates.map((duplicate) => (
                  <div
                    key={duplicate.id}
                    className={`rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md cursor-pointer ${
                      selectedDuplicate === duplicate.id
                        ? getSimilarityColor(duplicate.similarity)
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedDuplicate(duplicate.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{duplicate.title}</h4>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${getSimilarityBadgeColor(duplicate.similarity)}`}>
                            {duplicate.similarity}% match
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Created by {duplicate.createdBy} on {duplicate.createdDate} • Updated {duplicate.lastUpdated}
                        </p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                        duplicate.status === 'In Progress' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                        duplicate.status === 'Review' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                        'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        {duplicate.status}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                        {duplicate.type}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${
                        duplicate.priority === 'High' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }`}>
                        {duplicate.priority}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs text-gray-600 bg-white border border-gray-200">
                        {duplicate.assignee}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs text-gray-600 bg-white border border-gray-200">
                        {duplicate.estimate}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {duplicate.tags.map((tag, idx) => (
                        <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs text-gray-600 bg-gray-100 border border-gray-200">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Comparison Button */}
                    <button
                      className="mt-3 w-full sm:w-auto inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowComparison(duplicate.id);
                      }}
                    >
                      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      View Full Details
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Table (shown when selected) */}
            {showComparison && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Field Comparison</h3>
                  <button
                    onClick={() => setShowComparison(null)}
                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Hide comparison
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Your Transaction</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Existing Transaction</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-xs font-medium text-gray-900">Title</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{newTransaction.title}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{duplicates.find(d => d.id === showComparison)?.title}</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 text-xs font-medium text-gray-900">Type</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{newTransaction.type}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{duplicates.find(d => d.id === showComparison)?.type}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-xs font-medium text-gray-900">Priority</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{newTransaction.priority}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{duplicates.find(d => d.id === showComparison)?.priority}</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 text-xs font-medium text-gray-900">Assignee</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{newTransaction.assignee}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{duplicates.find(d => d.id === showComparison)?.assignee}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-xs font-medium text-gray-900">Estimate</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{newTransaction.estimate}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{duplicates.find(d => d.id === showComparison)?.estimate}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between space-y-3 sm:space-y-0 sm:space-x-3">
            <p className="text-xs text-gray-500">
              Review the similar transactions above before proceeding
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:shadow-sm">
                Cancel & Review
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all duration-200 hover:shadow-md">
                Proceed Anyway
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}