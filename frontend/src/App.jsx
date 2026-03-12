import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TransactionDetail from './pages/TransactionDetail';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import AddNote from './pages/AddNote';
import AdvancedFilters from './pages/AdvancedFilters';
import PotentialDuplicatesFound from './pages/PotentialDuplicatesFound';
import FieldHelp from './pages/FieldHelp';
import NewTransaction from './pages/NewTransaction';
import BulkUpload from './pages/BulkUpload';
import MapColumns from './pages/MapColumns';
import BatchJobStatus from './pages/BatchJobStatus';
import AuditEntryDetail from './pages/AuditEntryDetail';
import AuditTrail from './pages/AuditTrail';
import AddNewUser from './pages/AddNewUser';
import UserDetails from './pages/UserDetails';
import UserManagement from './pages/UserManagement';
import SignIn from './pages/SignIn';
import ChangePassword from './pages/ChangePassword';
import SessionTimeoutWarning from './pages/SessionTimeoutWarning';
import MyProfile from './pages/MyProfile';
import Reports&Analytics from './pages/Reports&Analytics';
import CustomReportBuilder from './pages/CustomReportBuilder';
import ScheduleReport from './pages/ScheduleReport';
import Notifications from './pages/Notifications';
import SystemSettings from './pages/SystemSettings';
import WorkflowTemplateEditor from './pages/WorkflowTemplateEditor';
import ValidationRuleBuilder from './pages/ValidationRuleBuilder';
import IntegrationLogs from './pages/IntegrationLogs';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/transactions/:transactionId" element={<TransactionDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/:transactionId/notes" element={<AddNote />} />
        <Route path="/transactions/filters" element={<AdvancedFilters />} />
        <Route path="/workflows/new/duplicates" element={<PotentialDuplicatesFound />} />
        <Route path="/workflows/new/help" element={<FieldHelp />} />
        <Route path="/workflows/new" element={<NewTransaction />} />
        <Route path="/transactions/bulk-upload" element={<BulkUpload />} />
        <Route path="/transactions/bulk-upload/map-columns" element={<MapColumns />} />
        <Route path="/transactions/bulk-upload/:jobId/status" element={<BatchJobStatus />} />
        <Route path="/audit/:entryId" element={<AuditEntryDetail />} />
        <Route path="/audit" element={<AuditTrail />} />
        <Route path="/admin/users/new" element={<AddNewUser />} />
        <Route path="/admin/users/:userId" element={<UserDetails />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/auth" element={<SignIn />} />
        <Route path="/profile/change-password" element={<ChangePassword />} />
        <Route path="/auth/session-timeout" element={<SessionTimeoutWarning />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/reports" element={<Reports&Analytics />} />
        <Route path="/reports/builder" element={<CustomReportBuilder />} />
        <Route path="/reports/schedule" element={<ScheduleReport />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/admin/settings" element={<SystemSettings />} />
        <Route path="/admin/settings/workflows/:templateId" element={<WorkflowTemplateEditor />} />
        <Route path="/admin/settings/validation" element={<ValidationRuleBuilder />} />
        <Route path="/admin/integrations/:integrationId/logs" element={<IntegrationLogs />} />
        <Route path="*" element={<TransactionDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
