import Hero from "../components/home/Hero";
import WhyLearn from "../components/home/WhyLearn";
import FeaturedCourses from "../components/home/FeaturedCourses";
import LearningPaths from "../components/home/LearningPaths";
import Projects from "./../components/home/ProjectsSection";
import Instructors from "../components/home/Instructors";
import CTA from "../components/home/CTA";
import Navbar from "../shared-components/Navbar";
import Footer from "../shared-components/Footer";
const Home = () => {
  return (
    <>
      <Navbar />
      <main className="bg-[#F7F5F2]">
        <Hero />
        <WhyLearn />
        <FeaturedCourses />
        <LearningPaths />
        <Projects />
        <Instructors />
        <CTA />
      </main>
      <Footer />
    </>
  );
};

export default Home;
