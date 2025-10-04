import Homepage from './components/Homepage';
import Account from './components/Account';
import { Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("auth error!");
  }

  const { isAuthenticated } = authContext;

  return (
    <div>
      <Routes>
        {isAuthenticated && <Route path='/chat' element={<Homepage />} />}
        {!isAuthenticated && <Route path='/chat' element={<Welcome />} />}
        {isAuthenticated && <Route path='/account' element={<Account />} />}
        {!isAuthenticated && <Route path='/account' element={<Welcome />} />}
        <Route path='/' element={<Welcome />} />
      </Routes>
    </div>
  );
};

export default App;