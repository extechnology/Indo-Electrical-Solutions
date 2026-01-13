import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./common/Loader";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
const Home = lazy(() => import("./pages/Home"));
const BrandPage = lazy(() => import("./pages/BrandPage"));
const DetailPage = lazy(() => import("./pages/DetailPage"));

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brand/:brandId" element={<BrandPage />} />
            <Route
              path="/detail/:brandId/:productId"
              element={<DetailPage />}
            />
          </Routes>
        </Suspense>
      </Router>
      <Footer />
    </>
  );
}

export default App;
