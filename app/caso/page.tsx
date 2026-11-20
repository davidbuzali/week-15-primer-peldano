import type { Metadata } from 'next'
import { Editorial, RehearsalLink } from '@/src/distribution/Editorial'
import { outreachCase } from '@/src/distribution/copy'

export const metadata: Metadata = {
  title: 'Caso de turno | Primer Peldaño',
  description: 'Un ejemplo ficticio de revisión de evidencia para una vacante de control de calidad textil.',
}

export default function CasePage() {
  return (
    <Editorial>
      <article className="distribution-article">
        <p className="distribution-kicker">Caso de turno <span>Ejemplo ficticio</span></p>
        <h1>{outreachCase.title}</h1>
        <p className="distribution-deck">Cómo puede llegar un ejemplo de trabajo a la jefatura de calidad antes del primer filtro de CV.</p>
        <ol className="distribution-steps">
          {outreachCase.steps.map((step) => (
            <li key={step.title}>
              <p className="distribution-role">{step.actor}</p>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="distribution-action">
          <p>Practica el acuerdo con opciones ficticias para una vacante.</p>
          <RehearsalLink />
        </div>
      </article>
    </Editorial>
  )
}
