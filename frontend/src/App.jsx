import './App.css';
import AuthProvider from './context/AuthProviders';
import AppHeader from './components/app-header/index';
import AppFooter from './components/app-footer/index';
import AppRoutes from './router';
import "./style/main.scss"


function App() {

  return (
    <div className='App'>
      <AuthProvider>
        <AppHeader />
        <div className='page'>
          <AppRoutes />
        </div>
        <AppFooter />
      </AuthProvider>
    </div>


  );
}

export default App;
