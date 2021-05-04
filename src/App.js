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
import Bookings from './pages/admin/bookings/Bookings';
import BookingDetails from './pages/admin/bookings/BookingDetails'

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
          <Route path='/panel/bookings' exact component={Bookings} />
          <Route path='/panel/bookings/details/:id' exact component={BookingDetails} />
        </Switch>
        <Footer/>
      </Router>
     </AuthProvider>
  );
}

export default App;
