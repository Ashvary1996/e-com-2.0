 
import { CardHoverEffectDemo } from "@/components/DisplayCard";

import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow m-auto">
        {/* <CarouselComponent /> */}
        <CardHoverEffectDemo />
      </main>
      <Footer />
    </div>
  );
}
