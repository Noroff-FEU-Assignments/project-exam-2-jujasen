import './styles/main.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Home from './pages/Home';
import Accommodation from './pages/Accommodation';
import AccDetails from './pages/linked/AccDetails';

function App() {
  return (
    // <AuthProvider>
      <Router>
        <Menu />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/accommodation' exact component={Accommodation} />
        <Route path='/accommodation/details/:id' exact component={AccDetails}/>
        </Switch>
        <Footer/>
      </Router>
    // </AuthProvider>
  );
}

export default App;
