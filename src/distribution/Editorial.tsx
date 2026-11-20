import Link from 'next/link'
import type { ReactNode } from 'react'
import { rehearsalLink } from './copy'

export function Editorial({ children }: { children: ReactNode }) {
  return (
    <div className="distribution">
      <header className="distribution-header">
        <div>
          <Link className="distribution-brand" href="/">Primer Peldaño<span aria-hidden="true">.</span></Link>
          <nav aria-label="Primer Peldaño">
            <Link href="/caso">Caso de turno</Link>
            <Link href={rehearsalLink}>Ensayar el acuerdo</Link>
          </nav>
        </div>
      </header>
      <main className="distribution-main">{children}</main>
      <footer className="distribution-footer">
        <span>Primer Peldaño · Contratación por habilidades</span>
        <nav aria-label="Herramientas anteriores">
          <Link href="/tarifa">Calculadora del piloto</Link>
          <Link href="/evidence">Demo de evidencia</Link>
        </nav>
      </footer>
    </div>
  )
}

export function RehearsalLink() {
  return <Link className="distribution-button" href={rehearsalLink}>Ensayar el acuerdo <span aria-hidden="true">↗</span></Link>
}
