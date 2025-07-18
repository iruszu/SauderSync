import { Navigate, Route, Routes } from 'react-router-dom';
import CreateOpportunity from './createOpportunity';
<<<<<<< HEAD
<<<<<<< HEAD
import Home from './home';
import Opportunities from './opportunities';
import { AuthenticationForm } from './login/AuthenticationForm';
<<<<<<< HEAD
import HomeNew from './homeNew';
import RoomBookings from './roomBookings';
=======
import BrandingPage from './branding';
=======
import Home from './home';
>>>>>>> 48d9bbd (fixed index page)
import Opportunities from './opportunities';
import { AuthenticationForm } from './login/AuthenticationForm';

>>>>>>> ccdd2fe (added new navbar and replaced homepage)
=======
<<<<<<< HEAD

=======
import HomeNew from './homeNew';
import RoomBookings from './roomBookings';
>>>>>>> 63f39d9 (added room bookings page)
>>>>>>> 1d45e74 (added room bookings page)

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/opportunities" element={<Opportunities/>} />
      <Route path="/authentication" element={<AuthenticationForm/>} />
      <Route path="/createOpportunity" element={<CreateOpportunity />} />
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      <Route path="/homeNew" element={<HomeNew/>} />
      <Route path="/roomBookings" element={<RoomBookings/>} />
=======
      <Route path="/branding" element={<BrandingPage />} />
>>>>>>> ccdd2fe (added new navbar and replaced homepage)
=======
>>>>>>> 48d9bbd (fixed index page)
=======
=======
      <Route path="/homeNew" element={<HomeNew/>} />
      <Route path="/roomBookings" element={<RoomBookings/>} />
>>>>>>> 63f39d9 (added room bookings page)
>>>>>>> 1d45e74 (added room bookings page)
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
