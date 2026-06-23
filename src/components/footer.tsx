import { site } from "#/features/header/constant";
import { Facebook, Instagram, Youtube, MapPin, Accessibility } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-black">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

          {/* Magazin online */}
     


          {/* Help */}
          <div>
            <h3 className="mb-8 text-lg font-semibold">
              Ai nevoie de ajutor?
            </h3>

            <ul className="space-y-5 text-sm">
              <li>Serviciul Clienți</li>
              <li>Formular de contact</li>

              <li className="pt-4 text-base font-bold">
                +40 316301973
              </li>

              <li className="text-xs">
                luni - vineri 9:00 - 16:00
              </li>

              <li className="font-semibold">
                info.ro@gate.shop
              </li>
            </ul>
          </div>


          {/* Conditions */}
          <div>
            <h3 className="mb-8 text-lg font-semibold">
              Condiții
            </h3>

            <ul className="space-y-4 text-sm">
              <li>Politica de confidențialitate</li>
              <li>Cookies</li>
              <li>Termeni și condiții</li>
            </ul>
          </div>


          {/* Social */}
          <div>
            <h3 className="mb-8 text-lg font-semibold">
              Social media
            </h3>

            <ul className="space-y-5 text-sm">

              <li className="flex gap-3 items-center">
                <Facebook size={15}/>
                Facebook
              </li>

              <li className="flex gap-3 items-center">
                <Instagram size={15}/>
                Instagram
              </li>

              <li className="flex gap-3 items-center">
                <Youtube size={15}/>
                YouTube
              </li>

            </ul>
          </div>

        </div>
      </div>


      {/* Bottom */}
      <div className="border-t border-gray-300">

        <div className="py-10 flex flex-col items-center gap-10">

          <div className="text-2xl tracking-[0.35em]">
            {site.name}
          </div>


          
        </div>

      </div>


      {/* Accessibility floating button */}
    

    </footer>
  );
}