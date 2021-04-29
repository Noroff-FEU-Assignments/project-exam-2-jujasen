import './styles/main.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Home from './pages/Home';
import Accommodation from './pages/Accommodation';
import AccDetails from './pages/linked/AccDetails';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Panel from './pages/admin/Panel';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Menu />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/accommodation' exact component={Accommodation} />
          <Route path='/accommodation/details/:id' exact component={AccDetails}/>
          <Route path='/contact' exact component={Contact} />
        <Route path='/login' exact component={Login} />
          <Route path='/panel' exact component={Panel} />
        </Switch>
        <Footer/>
      </Router>
     </AuthProvider>
  );
}

export default App;
