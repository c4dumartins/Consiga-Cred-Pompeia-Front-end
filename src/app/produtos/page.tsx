import Produtos from "../components/Produtos";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Produtos - Consiga Cred",
  description: "Conheça os produtos financeiros da Consiga Cred",
};

export default function ProdutosPage() {
  return (
    <div>
      <Navbar />

      <main>
        <Produtos />
      </main>

      <Footer />
    </div>
  );
}
