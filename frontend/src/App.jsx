import './App.css';
import AuthProvider from './context/AuthProviders';
import AppHeader from './components/app-header';
import AppFooter from './components/app-footer/footer';

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
