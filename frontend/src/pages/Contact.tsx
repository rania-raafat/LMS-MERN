import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <main>
        <ContactHero />
        <ContactForm />
      </main>
    </div>
  );
};

export default Contact;