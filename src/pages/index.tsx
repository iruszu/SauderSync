import { Navigate, Route, Routes } from 'react-router-dom';
import CreateOpportunity from './createOpportunity';
import BrandingPage from './branding';
import Home from './home';
import Opportunities from './opportunities';
import { AuthenticationForm } from './login/AuthenticationForm';

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/opportunities" element={<Opportunities/>} />
      <Route path="/authentication" element={<AuthenticationForm/>} />
      <Route path="/createOpportunity" element={<CreateOpportunity />} />
      <Route path="/branding" element={<BrandingPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
