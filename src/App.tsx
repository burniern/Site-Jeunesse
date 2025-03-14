import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MembersPage from './pages/MembersPage';
import EventsPage from './pages/EventsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMembers from './pages/admin/members/AdminMembers';
import AdminEvents from './pages/admin/events/AdminEvents';
import AdminUsers from './pages/admin/users/AdminUsers';
import AdminCarousel from './pages/admin/carousel/AdminCarousel';
import AddCarousel from './pages/admin/carousel/AddCarousel';
import EditCarousel from './pages/admin/carousel/EditCarousel';
import AddMember from './pages/admin/members/AddMember';
import EditMember from './pages/admin/members/EditMember';
import AddEvent from './pages/admin/events/AddEvent';
import EditEvent from './pages/admin/events/EditEvent';
import AddUser from './pages/admin/users/AddUser';
import EditUser from './pages/admin/users/EditUser';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="membres" element={<MembersPage />} />
        <Route path="evenements" element={<EventsPage />} />
        <Route path="a-propos" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        
        <Route path="membres">
          <Route index element={<AdminMembers />} />
          <Route path="ajouter" element={<AddMember />} />
          <Route path=":id" element={<EditMember />} />
        </Route>
        
        <Route path="evenements">
          <Route index element={<AdminEvents />} />
          <Route path="ajouter" element={<AddEvent />} />
          <Route path=":id" element={<EditEvent />} />
        </Route>
        
        <Route path="carousel">
          <Route index element={<AdminCarousel />} />
          <Route path="ajouter" element={<AddCarousel />} />
          <Route path=":id" element={<EditCarousel />} />
        </Route>
        
        <Route path="utilisateurs">
          <Route index element={<AdminUsers />} />
          <Route path="ajouter" element={<AddUser />} />
          <Route path=":id" element={<EditUser />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;