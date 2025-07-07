import { Navigate, Route, Routes } from 'react-router-dom';
import Debugger from './debugger';
import BrandingPage from './branding';

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<>hello world</>} />
      <Route path="/debugger" element={<Debugger />} />
      <Route path="/branding" element={<BrandingPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
