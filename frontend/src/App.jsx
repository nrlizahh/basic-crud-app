import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListPage from './components/pages/ProductListPage';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
      </Routes>
    </Router>
  )
}

export default App
