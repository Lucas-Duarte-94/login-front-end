import { Login } from './components/Login';
import './app.scss';
import { AuthContextProvider } from './contexts/authContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { UserInfo } from './components/UserInfo';
import { Register } from './components/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Posts } from './components/Posts';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/posts" component={Posts} />
            <Route path="/login" component={Login} />
            <Route path="/user-info" component={UserInfo} />
            <Route path="/register" component={Register} />
          </Switch>
          <ToastContainer theme="colored" />
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
