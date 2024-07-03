import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "NextAppoint",
  description: "Doctor Apoointment Booking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>

          <div className="md:px-20">
            <Header />
            {children}
          </div>
          <Footer />

      </body>
    </html>
  );
}
