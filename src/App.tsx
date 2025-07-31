import {Route, Routes} from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';

import Login from './features/auth/pages/Login';
import Index from './features/reservations/pages/Index'
import WashForm from './features/washes/pages/WashForm';
import DefaultLayout from './layouts/DefaultLayout';
import UserReservations from './features/reservations/pages/UserReservations';
import CurrentWashes from './features/washes/pages/CurrentWashes';

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />  
      
        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DefaultLayout/>
            </ProtectedRoute>
          }
        >
          <Route index element={<Index/>}/>
          <Route path='reservations' element={<UserReservations/>}/>
          <Route path='start/washer/:washerId/reservation/:reservationId' element={<WashForm/>}/>
          <Route path='current-wash' element={<CurrentWashes/>}/>
        </Route>
      </Routes> 
    </>
  )
}

export default App
