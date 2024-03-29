import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Accounts from './component/Accounts';
import Report from './component/Report';
import ItemInsert from './component/ItemInsert';
function App() {
  return (
   <>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/accounts' element={<Accounts/>}/>
    <Route path='/report' element={<Report/>}/>
    <Route path='/itemadd' element={<ItemInsert/>}/>
   </Routes>
   </>
  );
}

export default App;
