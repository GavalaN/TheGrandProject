import React from 'react'
import './LoginReg.css'

export default function VehicleTitleTransfer() {
  return (
    <div className="etc text-start">
        <h2 className="text-center">Átírás</h2>
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Költség tétel</th><th>Díj</th><th>Megjegyzés</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr><td>Vagyonszerzési illeték</td><td>Fizetendő (a jármű életkora és teljesítménye alapján)</td><td>Jármű életkora és teljesítménye alapján kalkulált díj</td></tr>
                <tr><td>Eredetiségvizsgálat</td><td>17.000 - 22.000 Ft</td><td>A jármű típusától függően változik</td></tr>
                <tr><td>Új forgalmi engedély</td><td>6.000 Ft</td><td>A forgalmi engedély kiállításának díja</td></tr>
                <tr><td>Új törzskönyv</td><td>6.000 Ft</td><td>A törzskönyv kiállításának díja</td></tr>
                <tr><td>Kötelező gépjármű-felelősségbiztosítás</td><td>Változó (a biztosítótól és jármű típusától függ)</td><td>A biztosító és a jármű paramétereitől függ</td></tr>
                <tr><td>Új rendszám (opcionális)</td><td>Változó</td><td>A választott rendszám típusától függ</td></tr>
            </tbody>
        </table>
    </div>
  )
}
