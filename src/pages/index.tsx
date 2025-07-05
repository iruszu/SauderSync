import { Navigate, Route, Routes } from 'react-router-dom';
import Debugger from './debugger';
import BrandingPage from './branding';
import { SummaryPage } from './summary';
import { Login } from './login';

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<SummaryPage/>}/>
      <Route path="/debugger" element={<Debugger />} />
      <Route path="/branding" element={<BrandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path='/*' element={<Navigate to='/'/>}/>
    </Routes>
  );
};
