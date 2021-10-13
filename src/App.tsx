import { Home } from './components/Home/home';
import './app.scss';
import { AuthContextProvider } from './contexts/authContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Logged } from './components/Logged';
import { Register } from './components/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/logged" component={Logged} />
            <Route path="/register" component={Register} />
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
