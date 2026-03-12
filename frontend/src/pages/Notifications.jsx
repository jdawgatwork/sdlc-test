function NotificationsScreen() {
  const [filter, setFilter] = React.useState('all');
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      type: 'mention',
      title: 'Sarah Chen mentioned you in "API Documentation"',
      description: '@alex can you review the WebSocket implementation section?',
      time: '5 min ago',
      unread: true,
      icon: '💬',
      color: 'blue'
    },
    {
      id: 2,
      type: 'workflow',
      title: 'Assigned to Sprint Planning Review',
      description: 'You have been assigned to review the Q1 sprint planning document',
      time: '1 hour ago',
      unread: true,
      icon: '📋',
      color: 'purple'
    },
    {
      id: 3,
      type: 'github',
      title: 'PR #247 merged to main',
      description: 'Feature: Add code syntax highlighting component',
      time: '2 hours ago',
      unread: true,
      icon: '🔀',
      color: 'green'
    },
    {
      id: 4,
      type: 'system',
      title: 'Scheduled maintenance tonight',
      description: 'System will be down for 30 minutes starting at 2:00 AM UTC',
      time: '3 hours ago',
      unread: false,
      icon: '🔧',
      color: 'orange'
    },
    {
      id: 5,
      type: 'mention',
      title: 'Marcus Lee mentioned you in "Database Schema"',
      description: 'Thoughts on indexing strategy for @alex?',
      time: '5 hours ago',
      unread: false,
      icon: '💬',
      color: 'blue'
    },
    {
      id: 6,
      type: 'github',
      title: 'New issue assigned: Bug in code editor',
      description: 'Issue #342: Syntax highlighting breaks with nested JSX',
      time: '1 day ago',
      unread: false,
      icon: '🐛',
      color: 'red'
    },
    {
      id: 7,
      type: 'workflow',
      title: 'Document "Architecture Decisions" updated',
      description: 'Emma Rodriguez made 12 changes',
      time: '1 day ago',
      unread: false,
      icon: '📝',
      color: 'purple'
    },
    {
      id: 8,
      type: 'system',
      title: 'Storage limit at 80%',
      description: 'Consider upgrading your plan or archiving old documents',
      time: '2 days ago',
      unread: false,
      icon: '💾',
      color: 'orange'
    }
  ]);

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  const filteredNotifications = React.useMemo(() => {
    if (filter === 'all') return notifications;
    if (filter === 'unread') return notifications.filter(n => n.unread);
    return notifications.filter(n => n.type === filter);
  }, [filter, notifications]);

  const filterOptions = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: unreadCount },
    { id: 'mention', label: 'Mentions', count: notifications.filter(n => n.type === 'mention').length },
    { id: 'workflow', label: 'Workflow', count: notifications.filter(n => n.type === 'workflow').length },
    { id: 'github', label: 'GitHub', count: notifications.filter(n => n.type === 'github').length },
    { id: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length }
  ];

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ));
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      purple: 'bg-purple-50 text-purple-600',
      green: 'bg-green-50 text-green-600',
      orange: 'bg-orange-50 text-orange-600',
      red: 'bg-red-50 text-red-600'
    };
    return colors[color] || 'bg-gray-50 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:block fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              N
            </div>
            <span className="text-lg font-semibold text-gray-900">Notion Dev</span>
          </div>

          <nav className="space-y-1">
            <a href="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              <span className="text-lg">📊</span>
              <span className="text-sm font-medium">Dashboard</span>
            </a>
            <a href="/documents" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              <span className="text-lg">📄</span>
              <span className="text-sm font-medium">Documents</span>
            </a>
            <a href="/projects" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              <span className="text-lg">🚀</span>
              <span className="text-sm font-medium">Projects</span>
            </a>
            <a href="/code" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              <span className="text-lg">💻</span>
              <span className="text-sm font-medium">Code Editor</span>
            </a>
            <a href="/notifications" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 transition-colors duration-200">
              <span className="text-lg">🔔</span>
              <span className="text-sm font-medium">Notifications</span>
              {unreadCount > 0 && (
                <span className="ml-auto bg-indigo-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </a>
            <a href="/settings" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              <span className="text-lg">⚙️</span>
              <span className="text-sm font-medium">Settings</span>
            </a>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Alex Thompson</p>
              <p className="text-xs text-gray-500 truncate">alex@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              N
            </div>
            <span className="text-lg font-semibold text-gray-900">Notifications</span>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white">
            <nav className="px-4 py-2 space-y-1">
              <a href="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <span className="text-lg">📊</span>
                <span className="text-sm font-medium">Dashboard</span>
              </a>
              <a href="/documents" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <span className="text-lg">📄</span>
                <span className="text-sm font-medium">Documents</span>
              </a>
              <a href="/projects" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <span className="text-lg">🚀</span>
                <span className="text-sm font-medium">Projects</span>
              </a>
              <a href="/code" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <span className="text-lg">💻</span>
                <span className="text-sm font-medium">Code Editor</span>
              </a>
              <a href="/settings" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <span className="text-lg">⚙️</span>
                <span className="text-sm font-medium">Settings</span>
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="md:ml-64 pt-16 md:pt-0 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Notifications</h1>
                <p className="mt-1 text-sm text-gray-500">
                  {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <a 
                  href="/settings/notifications"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </a>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Mark all read
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-6 overflow-x-auto">
            <div className="flex space-x-2 border-b border-gray-200 min-w-max">
              {filterOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => setFilter(option.id)}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                    filter === option.id
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {option.label}
                  {option.count > 0 && (
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                      filter === option.id
                        ? 'bg-indigo-100 text-indigo-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {option.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <div className="text-5xl mb-4">📭</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
                <p className="text-sm text-gray-500">
                  {filter === 'unread' ? "You're all caught up!" : `No ${filter} notifications to show`}
                </p>
              </div>
            ) : (
              filteredNotifications.map(notification => (
                <div
                  key={notification.id}
                  onClick={() => notification.unread && markAsRead(notification.id)}
                  className={`bg-white rounded-xl border border-gray-200 p-4 md:p-5 transition-all duration-200 hover:shadow-md cursor-pointer ${
                    notification.unread ? 'border-l-4 border-l-indigo-600' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xl ${getColorClasses(notification.color)}`}>
                      {notification.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-sm md:text-base font-semibold ${
                            notification.unread ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                            {notification.description}
                          </p>
                          <p className="mt-2 text-xs text-gray-500">{notification.time}</p>
                        </div>
                        
                        {notification.unread && (
                          <div className="flex-shrink-0">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Load More */}
          {filteredNotifications.length > 0 && (
            <div className="mt-6 text-center">
              <button className="inline-flex items-center px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                Load older notifications
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex items-center justify-around px-2 py-2">
          <a href="/dashboard" className="flex flex-col items-center p-2 text-gray-600 hover:text-gray-900">
            <span className="text-xl">📊</span>
            <span className="text-xs mt-1">Dashboard</span>
          </a>
          <a href="/documents" className="flex flex-col items-center p-2 text-gray-600 hover:text-gray-900">
            <span className="text-xl">📄</span>
            <span className="text-xs mt-1">Docs</span>
          </a>
          <a href="/projects" className="flex flex-col items-center p-2 text-gray-600 hover:text-gray-900">
            <span className="text-xl">🚀</span>
            <span className="text-xs mt-1">Projects</span>
          </a>
          <a href="/notifications" className="flex flex-col items-center p-2 text-indigo-600 relative">
            <span className="text-xl">🔔</span>
            <span className="text-xs mt-1 font-medium">Alerts</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-indigo-600 text-white text-xs flex items-center justify-center rounded-full font-semibold">
                {unreadCount}
              </span>
            )}
          </a>
          <a href="/settings" className="flex flex-col items-center p-2 text-gray-600 hover:text-gray-900">
            <span className="text-xl">⚙️</span>
            <span className="text-xs mt-1">Settings</span>
          </a>
        </div>
      </nav>
    </div>
  );
}