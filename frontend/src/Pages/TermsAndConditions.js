import React from 'react'
import './LoginReg.css'
import WarningModal from '../Components/WarningModal'

export default function TermsAndConditions() {
  return (
    <div className="content">
      <WarningModal/>

      <div id="tac">

        <h2 className="text-center">ASSETTOAUTO ÁLTALÁNOS SZERZŐDÉSI FELTÉTELEK (ÁSZF)</h2>

        <h4>1. Bevezető</h4>

        <p>Jelen Általános Szerződési Feltételek (a továbbiakban: "ÁSZF") az AssettoAuto weboldal (a továbbiakban: "Szolgáltató") által nyújtott szolgáltatások igénybevételének feltételeit szabályozza. A weboldal használatával a felhasználó elfogadja az alábbi feltételeket.</p>
        
        <h4>Szolgáltató adatai:</h4>
        
        <ul>
          <li>Cégnév: AssettoAuto Kft.</li>
          <li>Székhely: 3525 Miskolc, Palóczy László utca 3.</li>
          <li>Cégjegyzékszám: 12-34-567890</li>
          <li>E-mail: teszt.elek0000000000@gmail.com</li>
          <li>Telefon: +3620-1234567</li>
        </ul>
        
        <h4>2. Szolgáltatás leírása</h4>
        
        <p>Az AssettoAuto egy használt autók hirdetési platformja, ahol magánszemélyek és cégek egyaránt hirdethetik járműveiket. A weboldal célja a járművek közvetítésének elősegítése, azonban a Szolgáltató nem vesz részt a vásárlásban vagy adásvételben.</p>
        
        <h4>3. Felhasználók jogai és kötelezettségei</h4>
        
        <ul>
          <li>A felhasználók kötelesek valós adatokat megadni a hirdetésekben.</li>
          <li>Tilos hamis vagy megtévesztő információkat közölni.</li>
          <li>A felhasználók felelősek a saját tartalmaikért és az általuk megadott információkért.</li>
        </ul>
        
        <h4>4. Hirdetés feladásának feltételei</h4>
        
        <ul>
          <li>A hirdetés csak valós, eladásra kínált járműre vonatkozhat.</li>
          <li>A hirdetésben szereplő adatoknak pontosnak és hitelesnek kell lenniük.</li>
          <li>Tilos jogsértő, illegális vagy sértő tartalmakat közzétenni.</li>
        </ul>
        
        <h4>5. Felelősségkorlátozás</h4>
        
        <ul>
          <li>A Szolgáltató nem vállal felelősséget a felhasználók által közzétett tartalmakért.</li>
          <li>A Szolgáltató nem garantálja a sikeres adásvételt, és nem felelős az abból eredő károkért.</li>
        </ul>
        
        <h4>6. Díjak és fizetési feltételek</h4>
        
        <ul>
          <li>Az alapvető hirdetésfeladás ingyenes lehet, de prémium szolgáltatások esetén külön díjazás léphet életbe.</li>
          <li>A díjak és fizetési módok a weboldalon kerülnek feltüntetésre.</li>
        </ul>
        
        <h4>7. Elállási jog és visszatérítési szabályok</h4>
        
        <ul>
          <li>Ha a felhasználó fizetős szolgáltatást vesz igénybe, 14 napon belül elállhat a vásárlástól, amennyiben a szolgáltatás még nem került teljesítésre.</li>
          <li>A visszatérítés menete és feltételei a weboldalon részletesen megtalálhatók.</li>
        </ul>
        
        <h4>8. Adatkezelés és adatvédelem</h4>
        
        <ul>
          <li>Az adatkezelési szabályokat az Adatvédelmi Tájékoztató tartalmazza.</li>
          <li>A Szolgáltató GDPR-kompatibilisen kezeli a felhasználói adatokat.</li>
          <li>A weboldal sütiket (cookie-kat) használ a felhasználói élmény javítása érdekében. A sütikkel kapcsolatos részletek az Adatvédelmi Tájékoztatóban találhatók.</li>
        </ul>
        
        <h4>9. Panaszkezelés és vitarendezés</h4>
        
        <ul>
          <li>Panaszt e-mailben vagy telefonon lehet benyújtani a megadott elérhetőségeken.</li>
          <li>Jogvita esetén a felek elsődlegesen békés úton próbálnak megegyezni, sikertelenség esetén a hatáskörrel rendelkező bíróság jár el.</li>
        </ul>
        
        <h4>10. Az ÁSZF módosítása</h4>

        <p>A Szolgáltató fenntartja a jogot az ÁSZF módosítására, amelyről a felhasználókat a weboldalon értesíti. A módosítás a közzétételt követően lép hatályba.</p>
        
        <p>Utolsó frissítés: 2025.03.12.</p>

      </div>

    </div>
  )
}
