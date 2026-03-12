function FieldHelpScreen() {
  const [selectedField, setSelectedField] = React.useState('trigger');
  const [isOpen, setIsOpen] = React.useState(true);

  const helpContent = {
    trigger: {
      title: 'Workflow Trigger',
      description: 'Defines the event that initiates this workflow. Triggers can be webhook-based, scheduled, or manual.',
      examples: [
        {
          label: 'Webhook Trigger',
          code: '{\n  "type": "webhook",\n  "path": "/api/deploy",\n  "method": "POST"\n}'
        },
        {
          label: 'Schedule Trigger',
          code: '{\n  "type": "schedule",\n  "cron": "0 2 * * *",\n  "timezone": "UTC"\n}'
        },
        {
          label: 'Manual Trigger',
          code: '{\n  "type": "manual",\n  "confirmation": true\n}'
        }
      ],
      validation: [
        { rule: 'Type field is required', severity: 'error' },
        { rule: 'Webhook path must start with /api/', severity: 'error' },
        { rule: 'Cron expression must be valid', severity: 'error' },
        { rule: 'Schedule triggers should specify timezone', severity: 'warning' }
      ],
      related: [
        { title: 'Webhook Authentication', url: '/docs/webhooks' },
        { title: 'Cron Expression Guide', url: '/docs/scheduling' },
        { title: 'Trigger Best Practices', url: '/docs/triggers' }
      ]
    },
    action: {
      title: 'Workflow Action',
      description: 'Specifies the operation to perform when the workflow executes. Actions can include API calls, database operations, notifications, or custom scripts.',
      examples: [
        {
          label: 'GitHub Action',
          code: '{\n  "type": "github.createIssue",\n  "repo": "owner/repo",\n  "title": "{{trigger.data.title}}",\n  "labels": ["bug"]\n}'
        },
        {
          label: 'Slack Notification',
          code: '{\n  "type": "slack.postMessage",\n  "channel": "#deployments",\n  "text": "Deploy completed"\n}'
        },
        {
          label: 'Database Query',
          code: '{\n  "type": "db.query",\n  "sql": "INSERT INTO logs VALUES (?)",\n  "params": ["{{trigger.timestamp}}"]\n}'
        }
      ],
      validation: [
        { rule: 'Action type must be registered', severity: 'error' },
        { rule: 'Required parameters must be provided', severity: 'error' },
        { rule: 'Template variables must exist in context', severity: 'error' },
        { rule: 'Consider adding error handling', severity: 'warning' }
      ],
      related: [
        { title: 'Available Actions', url: '/docs/actions' },
        { title: 'Template Variables', url: '/docs/templates' },
        { title: 'Error Handling', url: '/docs/errors' }
      ]
    },
    condition: {
      title: 'Conditional Logic',
      description: 'Define rules to control workflow execution. Conditions evaluate data from triggers and previous actions to determine if the workflow should continue.',
      examples: [
        {
          label: 'Simple Comparison',
          code: '{\n  "field": "trigger.data.status",\n  "operator": "equals",\n  "value": "success"\n}'
        },
        {
          label: 'Complex Expression',
          code: '{\n  "and": [\n    {"field": "env", "equals": "prod"},\n    {"field": "severity", "greaterThan": 3}\n  ]\n}'
        },
        {
          label: 'Pattern Matching',
          code: '{\n  "field": "trigger.data.branch",\n  "matches": "^release/.*$"\n}'
        }
      ],
      validation: [
        { rule: 'Operator must be valid', severity: 'error' },
        { rule: 'Field paths must be accessible', severity: 'error' },
        { rule: 'Type mismatch between field and value', severity: 'warning' },
        { rule: 'Avoid overly complex nested conditions', severity: 'info' }
      ],
      related: [
        { title: 'Expression Syntax', url: '/docs/expressions' },
        { title: 'Operators Reference', url: '/docs/operators' },
        { title: 'Data Context', url: '/docs/context' }
      ]
    },
    environment: {
      title: 'Environment Variables',
      description: 'Secure storage for API keys, tokens, and configuration values. Environment variables are encrypted and can be referenced in workflow actions.',
      examples: [
        {
          label: 'API Key Reference',
          code: '{\n  "authorization": "Bearer {{env.GITHUB_TOKEN}}",\n  "accept": "application/json"\n}'
        },
        {
          label: 'Configuration',
          code: '{\n  "apiUrl": "{{env.API_BASE_URL}}",\n  "timeout": "{{env.REQUEST_TIMEOUT}}"\n}'
        },
        {
          label: 'Multi-Environment',
          code: '{\n  "database": "{{env.DB_HOST}}:{{env.DB_PORT}}",\n  "ssl": "{{env.USE_SSL}}"\n}'
        }
      ],
      validation: [
        { rule: 'Variable names must be uppercase', severity: 'warning' },
        { rule: 'Secrets should not be logged', severity: 'error' },
        { rule: 'All referenced variables must be defined', severity: 'error' },
        { rule: 'Consider using separate envs for staging/prod', severity: 'info' }
      ],
      related: [
        { title: 'Managing Secrets', url: '/docs/secrets' },
        { title: 'Environment Setup', url: '/docs/environments' },
        { title: 'Security Best Practices', url: '/docs/security' }
      ]
    }
  };

  const fieldButtons = [
    { id: 'trigger', label: 'Trigger', icon: '⚡' },
    { id: 'action', label: 'Action', icon: '▶' },
    { id: 'condition', label: 'Condition', icon: '◆' },
    { id: 'environment', label: 'Environment', icon: '🔐' }
  ];

  const currentContent = helpContent[selectedField];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">N</span>
            </div>
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">Notion for Developers</h1>
          </div>
          <button 
            onClick={() => window.history.back()}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
            <a href="/workflows" className="hover:text-gray-700 transition-colors duration-200">Workflows</a>
            <span>/</span>
            <a href="/workflows/new" className="hover:text-gray-700 transition-colors duration-200">New Workflow</a>
            <span>/</span>
            <span className="text-gray-900">Field Help</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Field Reference & Examples</h2>
          <p className="text-gray-600 mt-2">Detailed documentation for workflow configuration fields</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Field Selector - Sidebar on desktop, horizontal on mobile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Field Types</h3>
              <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1 overflow-x-auto lg:overflow-x-visible">
                {fieldButtons.map(field => (
                  <button
                    key={field.id}
                    onClick={() => setSelectedField(field.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                      selectedField === field.id
                        ? 'bg-indigo-50 text-indigo-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{field.icon}</span>
                    <span className="text-sm">{field.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Field Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{currentContent.title}</h3>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                  Required Field
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed">{currentContent.description}</p>
            </div>

            {/* Examples */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Examples</h4>
              <div className="space-y-4">
                {currentContent.examples.map((example, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                      <span className="text-sm font-medium text-gray-700">{example.label}</span>
                    </div>
                    <pre className="p-4 bg-gray-900 text-gray-100 text-sm overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>

            {/* Validation Rules */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Validation Rules</h4>
              <div className="space-y-3">
                {currentContent.validation.map((rule, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                      rule.severity === 'error' ? 'bg-red-100' :
                      rule.severity === 'warning' ? 'bg-amber-100' :
                      'bg-blue-100'
                    }`}>
                      {rule.severity === 'error' && (
                        <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                      {rule.severity === 'warning' && (
                        <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      )}
                      {rule.severity === 'info' && (
                        <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{rule.rule}</p>
                      <span className={`text-xs font-medium ${
                        rule.severity === 'error' ? 'text-red-600' :
                        rule.severity === 'warning' ? 'text-amber-600' :
                        'text-blue-600'
                      }`}>
                        {rule.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Documentation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Related Documentation</h4>
              <div className="space-y-2">
                {currentContent.related.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm text-gray-700 group-hover:text-indigo-700 transition-colors duration-200">{link.title}</span>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
              >
                Back to Form
              </button>
              <div className="flex space-x-3">
                <button className="flex-1 sm:flex-none px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium">
                  View All Docs
                </button>
                <button className="flex-1 sm:flex-none px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium shadow-sm hover:shadow">
                  Got It
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}