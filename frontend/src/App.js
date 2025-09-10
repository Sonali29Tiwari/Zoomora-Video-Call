
import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import LandingPage from './pages/landing';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeetComponent from './pages/videoMeet';
import History from './pages/history';
import HomeComponent from './pages/home';

function App() {
  return (
    <div className='App'>
    
    <Router>

     <AuthProvider>

    <Routes>

   {/* {<Route path='/home' element= />} */}

   <Route path='/' element={<LandingPage />} />

   <Route path='/auth' element={<Authentication/>} />
   <Route path='/history' element={<History/>}/> 
   <Route path='/:url' element={<VideoMeetComponent />} />
   <Route path='/home's element={<HomeComponent />} />
    </Routes>
    </AuthProvider> 

    </Router>
    
    </div> 
  );
}

export default App;
