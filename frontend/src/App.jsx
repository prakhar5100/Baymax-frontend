import Hero from "./sections/Hero"
import Nav from "./components/Nav"
import Working from "./sections/Working"
import FAQ from "./sections/FAQ"
import About from "./sections/About"
import HospitalsNearby from "./sections/HospitalNearby"
import Contact from "./sections/Contact"
import MadeWithLove from "./sections/MadeWithLove"
import Chatbot from "./components/chatbot"
import NeWNav from "./components/NeWNav"

const App = () => {
  return (
    <main className="font-poppins">
      <section className="w-screen">
        <NeWNav />
      </section>
      <section>
        <Hero />
      </section>
      <section>
        <About />
      </section>
      <section>
        <Working />
      </section>
      <section>
        <HospitalsNearby />
      </section>
      <section>
        <Contact />
      </section>
      <section>
        <FAQ />
      </section>
      <section>
        <MadeWithLove />
      </section>
      <section>
        <Chatbot />
      </section>

      
    </main>
  )
}

export default App 