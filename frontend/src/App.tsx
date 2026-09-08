import Navbar from "./shared-components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./shared-components/Footer";
function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;