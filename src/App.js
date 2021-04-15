import './styles/main.scss';
import 'bulma';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
import Menu from './components/Menu';
import Home from './pages/Home';

function App() {
  return (
    // <AuthProvider>
      <Router>
        <Menu />
        <Switch>
          <Route path='/' exact component={Home} />
        </Switch>
      </Router>
    // </AuthProvider>
  );
}

export default App;
