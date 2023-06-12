import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import style from './App.module.css';
import Protected from './components/Protected/Protected';
import Error from './pages/Error/Error';

function App() {
  const isAuth = false;
  return (
    <div className={style.container}>
      <BrowserRouter>
      <div className={style.layout}>
        <Navbar/>
        <Routes>
          <Route 
            path='/' 
            exact 
            element={<div className={style.main}>
              <Home/>
              </div>
            }
          />

          <Route
            path='crypto'
            exact
            element={<div className={style.main}>Crypto page</div>} 
          />

          <Route
            path='blogs'
            exact
            element={
              <Protected isAuth={isAuth}>
                <div className={style.main}>Blogs page</div>
              </Protected>
            } 
          />

          <Route
            path='create'
            exact
            element={
              <Protected isAuth={isAuth}>
                <div className={style.main}>Create blog page</div>
              </Protected>
            }
          />

          <Route
            path='login'
            exact
            element={<div className={style.main}>Login page</div>} 
          />

          <Route
            path='signup'
            exact
            element={<div className={style.main}>Signup page</div>} 
          />

          <Route
            path='*'
            element={<Error />} 
          />
        </Routes>
        <Footer/>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;