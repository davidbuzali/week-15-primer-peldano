import type { Metadata } from 'next'
import Link from 'next/link'
import { Editorial } from '@/src/distribution/Editorial'
import { rehearsalLink } from '@/src/distribution/copy'

export const metadata: Metadata = {
  title: 'Defensa del proyecto | Primer Peldaño',
  description: 'La necesidad, el producto, sus usuarios, el precio del piloto y el siguiente paso.',
}

export default function About() {
  return (
    <Editorial>
      <article className="distribution-article">
        <p className="distribution-kicker">Defensa del proyecto</p>
        <h1>Primer Peldaño</h1>
        <ol className="distribution-defense" role="list">
          <li>
            <p className="distribution-kicker">Necesidad</p>
            <h2>Que la experiencia llegue a revisión</h2>
            <p>El primer filtro de CV puede dejar fuera a quien aprendió en el trabajo. En una vacante de calidad textil, una descripción de cómo detectó y comprobó un defecto puede aportar evidencia pertinente.</p>
          </li>
          <li>
            <p className="distribution-kicker">Producto</p>
            <h2>Un acuerdo antes de publicar</h2>
            <p>RR. HH. y Calidad ensayan cómo elegir un criterio, una evidencia permitida, una persona revisora y un plazo. La práctica usa un caso ficticio y genera un archivo en el navegador.</p>
            <a href={rehearsalLink}>Abrir el ensayo</a>
          </li>
          <li>
            <p className="distribution-kicker">Usuarios</p>
            <h2>RR. HH. canaliza. Calidad responde.</h2>
            <p>El primer usuario es quien prepara una vacante mexicana de control de calidad textil en segundo turno. La persona candidata decide qué evidencia autorizada compartir para esa vacante.</p>
          </li>
          <li>
            <p className="distribution-kicker">Precio</p>
            <h2>MX$12,000 por piloto propuesto</h2>
            <p>Hipótesis por validar con la empresa para una vacante y hasta cinco revisiones. La persona candidata paga MX$0. Aún falta verificar disposición de pago.</p>
            <Link href="/tarifa">Ver la calculadora del piloto</Link>
          </li>
          <li>
            <p className="distribution-kicker">Siguiente paso</p>
            <h2>Comprobar el traspaso con una empresa</h2>
            <p>Con acuerdo de la empresa, seguir dos casos ficticios igualmente elegibles por el canal real de RR. HH. hasta una respuesta de Calidad. Verificar si ambos llegan antes del filtro de CV y reciben una razón escrita dentro del plazo, sin recordatorios del fundador.</p>
            <Link href="/revision">Ver los límites de la revisión</Link>
          </li>
        </ol>
      </article>
    </Editorial>
  )
}
