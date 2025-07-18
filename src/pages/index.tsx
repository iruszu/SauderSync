import { Navigate, Route, Routes } from 'react-router-dom';
import CreateOpportunity from './createOpportunity';
<<<<<<< HEAD
import Home from './home';
import Opportunities from './opportunities';
import { AuthenticationForm } from './login/AuthenticationForm';
import HomeNew from './homeNew';
import RoomBookings from './roomBookings';
=======
import BrandingPage from './branding';
import Opportunities from './opportunities';
import { AuthenticationForm } from './login/AuthenticationForm';
import Home from './home';

>>>>>>> ccdd2fe (added new navbar and replaced homepage)

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/opportunities" element={<Opportunities/>} />
      <Route path="/authentication" element={<AuthenticationForm/>} />
      <Route path="/createOpportunity" element={<CreateOpportunity />} />
<<<<<<< HEAD
      <Route path="/homeNew" element={<HomeNew/>} />
      <Route path="/roomBookings" element={<RoomBookings/>} />
=======
      <Route path="/branding" element={<BrandingPage />} />
>>>>>>> ccdd2fe (added new navbar and replaced homepage)
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
