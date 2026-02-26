import Simulacao from "../components/Simulacao";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Simulação - Consiga Cred",
  description: "Simule seu crédito consignado e descubra as melhores condições para você",
};

export default function SimulacaoPage() {
  return (
    <div>
      <Navbar />
      <main>
        <Simulacao />
      </main>
      <Footer />
    </div>
  );
}