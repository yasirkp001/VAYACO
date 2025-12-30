import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './app/store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import Toast from './components/Toast';
import { hideToast } from './features/ui/uiSlice';

const ToastContainer = () => {
  const dispatch = useDispatch();
  const { toast } = useSelector((state) => state.ui);

  if (!toast) return null;

  return (
    <Toast
      message={toast.message}
      type={toast.type}
      onClose={() => dispatch(hideToast())}
    />
  );
};

function AppContent() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
