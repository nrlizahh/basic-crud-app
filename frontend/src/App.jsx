import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListPage from './components/pages/ProductListPage';
import ProductDetail from './components/pages/ProductDetailPage';
import Login from './components/pages/LoginPage';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:id" element={<ProductDetail />} />

      </Routes>
    </Router>
  )
}

export default App
