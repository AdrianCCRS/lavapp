import {Route, Routes} from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';

import Login from './features/auth/pages/Login';
import Index from './features/dashboard/pages/Index'

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />  
      
        {/* Protected routes */}
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Index/>
          </ProtectedRoute> 
        }/>
      </Routes> 
    </>
  )
}

export default App
