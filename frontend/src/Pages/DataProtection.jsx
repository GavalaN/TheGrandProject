import React, { useEffect, useState } from 'react'
import './LoginReg.css'
import WarningModal from '../Components/WarningModal'
import { useLocation } from 'react-router-dom';

export default function DataProtection() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Scroll to top on page load
  useEffect(() => {
    if (!isModalOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location, isModalOpen]);

  const handleModalClose = () => setIsModalOpen(false);
  const handleModalOpen = () => setIsModalOpen(true);

  return (
    <div className="content">
      {isModalOpen && <WarningModal onClose={handleModalClose} />}

      <div className="etc">

        <h2 className="text-center">ASSETTOAUTO ADATVÉDELMI TÁJÉKOZTATÓ</h2>

        <h4>1. Bevezető</h4>

        <p>Az AssettoAuto Kft. (a továbbiakban: "Szolgáltató") elkötelezett a felhasználók személyes adatainak védelme iránt. Jelen Adatvédelmi Tájékoztató célja, hogy tájékoztassa a weboldal (a továbbiakban: "Weboldal") látogatóit az adatkezelés módjáról, céljáról és jogalapjáról.</p>

        <h4>2. Adatkezelő adatai</h4>

        <ul>
          <li>Cégnév: AssettoAuto Kft.</li>
          <li>Székhely: 3525 Miskolc, Palóczy László utca 3.</li>
          <li>Cégjegyzékszám: 12-34-567890</li>
          <li>E-mail: teszt.elek0000000000@gmail.com</li>
          <li>Telefon: +3620-1234567</li>
        </ul>

        <h4>3. Kezelt adatok köre és célja</h4>
        
        <p>Az AssettoAuto a következő személyes adatokat kezelheti:</p>

        <ul>
          <li><b>Regisztráció során megadott adatok</b> (név, e-mail cím, telefonszám, jelszó): A felhasználói fiók létrehozása és azonosítása.</li>
          <li><b>Hirdetésfeladás során megadott adatok</b> (jármű adatai, képek, elérhetőség): A hirdetések megjelenítése és kapcsolattartás.</li>
          <li><b>Kapcsolatfelvételi adatok</b> (név, e-mail cím, üzenet tartalma): Felhasználói kérdések megválaszolása.</li>
          <li><b>Technikai adatok</b> (IP-cím, böngésző típusa, látogatási adatok): A weboldal működésének biztosítása és statisztikai célok.</li>
        </ul>

        <h4>4. Sütik (Cookie-k) kezelése</h4>
        
        <p>A Weboldal sütiket használ a felhasználói élmény javítása érdekében. A sütik típusai:</p>

        <ul>
          <li><b>Alapvető sütik:</b> A weboldal megfelelő működéséhez szükségesek.</li>
          {/* <li><b>Analitikai sütik:</b> A látogatói statisztikák elemzésére szolgálnak.</li>
          <li><b>Marketing sütik:</b> Célzott hirdetések megjelenítését teszik lehetővé.</li> */}
          <li>A felhasználók böngészőjük beállításain keresztül kezelhetik a sütikkel kapcsolatos preferenciáikat.</li>
        </ul>

        <h4>5. Az adatkezelés jogalapja</h4>
        
        <p>Az adatkezelés az alábbi jogalapokon történik:</p>

        <ul>
          <li>A felhasználó hozzájárulása (GDPR 6. cikk (1) bek. a) pont).</li>
          <li>Szerződés teljesítése (GDPR 6. cikk (1) bek. b) pont).</li>
          <li>Jogi kötelezettség teljesítése (GDPR 6. cikk (1) bek. c) pont).</li>
          <li>Jogos érdek (GDPR 6. cikk (1) bek. f) pont).</li>
        </ul>

        <h4>6. Adatkezelés időtartama</h4>

        <p>A személyes adatok kezelése az alábbi időtartamok szerint történik:</p>

        <ul>
          <li><b>Regisztrációs adatok:</b> A felhasználói fiók fennállásáig.</li>
          <li><b>Hirdetés adatai:</b> A hirdetés érvényességi idejéig.</li>
          <li><b>Kapcsolatfelvételi adatok:</b> 1 évig a kérdés megválaszolását követően.</li>
          <li><b>Technikai adatok:</b> 1 évig statisztikai célból.</li>
        </ul>

        <h4>7. Az adatok továbbítása</h4>

        <p>A Szolgáltató az adatokat kizárólag az alábbi esetekben továbbítja:</p>

        <ul>
          <li>Törvényi kötelezettség alapján hatóságoknak.</li>
          <li>Szolgáltatás biztosítása érdekében alvállalkozóknak (pl. tárhelyszolgáltató, analitikai szolgáltatók).</li>
          <li>Banki vagy fizetési szolgáltatóknak a tranzakciók lebonyolításához.</li>
        </ul>

        <h4>8. Felhasználói jogok</h4>

        <p>A felhasználóknak joguk van:</p>

        <ul>
          <li>Tájékoztatást kérni a kezelt adataikról.</li>
          <li>Helyesbíteni a pontatlan adatokat.</li>
          <li>Töröltetni az adataikat („elfeledtetés joga”).</li>
          <li>Tiltakozni az adatkezelés ellen.</li>
          <li>Adathordozhatóságot kérni.</li>
        </ul>

        <h4>9. Panasz benyújtásának lehetősége</h4>
        
        <p>Amennyiben a felhasználó úgy érzi, hogy jogai sérültek, panaszt nyújthat be a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH).</p>
        <p>NAIH elérhetőségei: www.naih.hu</p>

        <h4>10. Adatvédelmi Tájékoztató módosítása</h4>
        
        <p>A Szolgáltató fenntartja a jogot a tájékoztató módosítására, amelyről a felhasználók értesítést kapnak.</p>

        <p>Utolsó frissítés: 2025.03.12.</p>

      </div>

    </div>
  )
}
