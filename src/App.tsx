import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Chats from './pages/Chats';
import Funnel from './pages/Funnel';
import Tours from './pages/Tours';
import Analytics from './pages/Analytics';
import Integrations from './pages/Integrations';
import AISettings from './pages/AISettings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/chats" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'chats', element: <Chats /> },
      { path: 'funnel', element: <Funnel /> },
      { path: 'tours', element: <Tours /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'integrations', element: <Integrations /> },
      { path: 'settings', element: <AISettings /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
