import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListPage from './components/pages/ProductListPage';
import ProductDetail from './components/pages/ProductDetailPage';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />

      </Routes>
    </Router>
  )
}

export default App
