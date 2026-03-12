import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartNewTransaction from './pages/StartNewTransaction';
import Dashboard from './pages/Dashboard';
import ValidationErrors from './pages/ValidationErrors';
import TransactionWorkflow from './pages/TransactionWorkflow';
import EditTransaction from './pages/EditTransaction';
import TransactionDetail from './pages/TransactionDetail';
import BulkProcessing from './pages/BulkProcessing';
import Reports&Analytics from './pages/Reports&Analytics';
import EditUser from './pages/EditUser';
import CreateUser from './pages/CreateUser';
import UserManagement from './pages/UserManagement';
import AuditLog from './pages/AuditLog';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard?modal=new-transaction" element={<StartNewTransaction />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions/:transactionId/workflow?errors=true" element={<ValidationErrors />} />
        <Route path="/transactions/:transactionId/workflow" element={<TransactionWorkflow />} />
        <Route path="/transactions/:transactionId?drawer=edit" element={<EditTransaction />} />
        <Route path="/transactions/:transactionId" element={<TransactionDetail />} />
        <Route path="/bulk-processing" element={<BulkProcessing />} />
        <Route path="/reports" element={<Reports&Analytics />} />
        <Route path="/admin/users/:userId?modal=edit" element={<EditUser />} />
        <Route path="/admin/users?modal=create" element={<CreateUser />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/audit" element={<AuditLog />} />
        <Route path="*" element={<StartNewTransaction />} />
      </Routes>
    </BrowserRouter>
  );
}
