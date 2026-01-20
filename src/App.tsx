import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./common/Loader";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";

const Home = lazy(() => import("./pages/Home"));
const BrandPage = lazy(() => import("./pages/BrandPage"));
const DetailPage = lazy(() => import("./pages/DetailPage"));
const Brochure = lazy(() => import("./pages/Brochure"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Filter = lazy(() => import("./pages/FilterPage"));
const Exclusive = lazy(() => import("./pages/Exclusive"));

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brand/:brandId" element={<BrandPage />} />
            <Route path="/detail" element={<DetailPage />} />
            <Route path="/brochure" element={<Brochure />} />
            <Route path="/filter/:category" element={<Filter />} />
            <Route path="/exclusive" element={<Exclusive />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </>
  );
}

export default App;
