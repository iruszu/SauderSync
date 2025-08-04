import { Navigate, Route, Routes } from 'react-router-dom';
import CreateOpportunity from './createOpportunity';
import Home from './home';
import Opportunities from './opportunities';
import { AuthenticationForm } from './login/AuthenticationForm';
import RoomBookings from './bookings/roomBookings';
import AppLayout from './AppLayout';

export const RootRoutes = () => {
  return (
      <Routes>
          <Route element={<AppLayout/>}>
              <Route path="/" element={<Home/>} />
              <Route path="/opportunities" element={<Opportunities/>} />
              <Route path="/authentication" element={<AuthenticationForm/>} />
              <Route path="/createOpportunity" element={<CreateOpportunity />} />
              <Route path="/roomBookings" element={<RoomBookings/>} />
          </Route>
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
