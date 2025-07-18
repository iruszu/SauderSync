import { Navigate, Route, Routes } from 'react-router-dom';
import CreateOpportunity from './createOpportunity';
<<<<<<< HEAD
import BrandingPage from './branding';
=======
import Home from './home';
>>>>>>> d9db4fc5fecd7afa8bdf682fe2c7e632e2c9306b
import Opportunities from './opportunities';
import { AuthenticationForm } from './login/AuthenticationForm';
import Home from './home';


export const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/opportunities" element={<Opportunities/>} />
      <Route path="/authentication" element={<AuthenticationForm/>} />
      <Route path="/createOpportunity" element={<CreateOpportunity />} />
<<<<<<< HEAD
      <Route path="/branding" element={<BrandingPage />} />
=======
      <Route path="/homeNew" element={<HomeNew/>} />
>>>>>>> d9db4fc5fecd7afa8bdf682fe2c7e632e2c9306b
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
