import {Route, Routes} from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';

import Login from './features/auth/pages/Login';
import Index from './features/reservations/pages/Index'
import DefaultLayout from './layouts/DefaultLayout';
import UserReservations from './features/reservations/pages/UserReservations';

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
        </Route>
      </Routes> 
    </>
  )
}

export default App
