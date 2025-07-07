import { Navigate, Route, Routes } from 'react-router-dom';
import Debugger from './debugger';
import BrandingPage from './branding';
import Home from './home';

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/debugger" element={<Debugger />} />
      <Route path="/branding" element={<BrandingPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
