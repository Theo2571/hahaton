import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#09090b' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar />
        <main
          style={{
            flex: 1,
            overflow: 'auto',
            padding: 28,
            background: 'radial-gradient(ellipse at top right, rgba(124,58,237,0.06) 0%, transparent 60%), #09090b',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
