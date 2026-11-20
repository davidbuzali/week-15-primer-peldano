import type { Metadata } from 'next'
import { Editorial, RehearsalLink } from '@/src/distribution/Editorial'
import { reviewBoundaries } from '@/src/distribution/copy'

export const metadata: Metadata = {
  title: 'Límites de la revisión | Primer Peldaño',
  description: 'Criterios para pedir evidencia con permiso y responder con una revisión humana.',
}

export default function ReviewPage() {
  return (
    <Editorial>
      <article className="distribution-article">
        <p className="distribution-kicker">Límites de la revisión</p>
        <h1>Qué pedir y qué dejar fuera</h1>
        <p className="distribution-deck">Una guía para RR. HH. y la jefatura de calidad al acordar cómo se revisará una muestra de trabajo.</p>
        <ol className="distribution-steps">
          {reviewBoundaries.map((section) => (
            <li key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </li>
          ))}
        </ol>
        <div className="distribution-action">
          <p>Elige un criterio y una vía permitida de evidencia en la demostración.</p>
          <RehearsalLink />
        </div>
      </article>
    </Editorial>
  )
}
