import Homepage from './components/Homepage';
import Account from './components/Account';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/account' element={<Account />} />
      </Routes>
    </div>
  );
};

export default App;