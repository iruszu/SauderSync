import { Navigate, Route, Routes } from 'react-router-dom';
import Debugger from './debugger';
import BrandingPage from './branding';
import Home from './home';
import Opportunities from './opportunities';

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/opportunities" element={<Opportunities/>} />
      <Route path="/debugger" element={<Debugger />} />
      <Route path="/branding" element={<BrandingPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
