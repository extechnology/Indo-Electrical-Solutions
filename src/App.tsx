import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./common/Loader";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import ScrollToTop from "./common/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const BrandPage = lazy(() => import("./pages/BrandPage"));
const DetailPage = lazy(() => import("./pages/DetailPage"));
const Brochure = lazy(() => import("./pages/Brochure"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Filter = lazy(() => import("./pages/FilterPage"));
const Exclusive = lazy(() => import("./pages/Exclusive"));
const OffersAndSchemes = lazy(() => import("./pages/OffersAndSchemes"));

function App() {
  return (
    <>
      <Router>
        <div className="pb-20 bg-black">
          <Navbar />
        </div>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brands" element={<BrandPage />} />
            <Route path="/detail" element={<DetailPage />} />
            <Route path="/brochure" element={<Brochure />} />
            <Route path="/filter/:category" element={<Filter />} />
            <Route path="/exclusive" element={<Exclusive />} />
            <Route path="/offers-and-schemes" element={<OffersAndSchemes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <ScrollToTop />
      </Router>
    </>
  );
}

export default App;
