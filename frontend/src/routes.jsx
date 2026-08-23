import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Upload from './pages/Upload/Upload';
import MatchJD from './pages/MatchJD/MatchJD';
import Roadmap from './pages/Roadmap/Roadmap';
import History from './pages/History/History';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/match-jd" element={<MatchJD />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/history" element={<History />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
