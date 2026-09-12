import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";
import Navbar from "../shared-components/Navbar";
import Footer from "../shared-components/Footer";
const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <main>
          <ContactHero />
          <ContactForm />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
