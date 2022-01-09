import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/HeaderArea/header';
import { LoginArea } from './components/LoginArea/login';
import { UserRegister } from './components/UserRegister/register';
import { TaskList } from './components/TaskList/tasklist';


function App() {

  return (
      <>
          <Header></Header>
          <BrowserRouter>
            <Routes>
                <Route path="/" exact={true} element={<LoginArea/>} />
                <Route path="/registro" element={<UserRegister/>} />
                <Route path="/list" element={<TaskList/>} />
            </Routes>
          </ BrowserRouter>
      </>
  )
}

export default App;