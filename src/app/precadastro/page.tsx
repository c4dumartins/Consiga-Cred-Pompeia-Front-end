import PreCadastro from "../components/PreCadastro";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function PreCadastroPage() {
  return (
      <div>
        <Navbar />
  
        <main>
          <PreCadastro />
        </main>
  
        <Footer />
      </div>
    );
  }
