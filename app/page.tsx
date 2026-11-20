import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Editorial } from '@/src/distribution/Editorial'
import Rehearsal from '@/src/distribution/Rehearsal'

export const metadata: Metadata = {
  title: 'Primer Peldaño | La evidencia también cuenta',
  description: 'Recursos para RR. HH. y Calidad antes de publicar una vacante de control de calidad textil.',
}

export default function Home() {
  return (
    <Editorial>
      <section className="distribution-hero">
        <div>
          <p className="distribution-kicker">Contratación por habilidades</p>
          <h1>La evidencia también cuenta</h1>
          <p className="distribution-deck">Acuerda con RR. HH. qué evidencia de trabajo puede llegar a Calidad antes del primer filtro de CV.</p>
          <Link className="distribution-button" href="/caso">Ver caso de turno <span aria-hidden="true">↗</span></Link>
        </div>
        <figure>
          <Image src="/semana-15/muestra-textil.jpg" width={1536} height={1024} sizes="(max-width: 760px) 92vw, 48vw" alt="Muestras de mezclilla con una costura y un calibrador" preload />
        </figure>
      </section>
      <section className="distribution-library" aria-labelledby="distribution-library-title">
        <h2 id="distribution-library-title">Antes de abrir la vacante</h2>
        <div className="distribution-cards">
          <article>
            <p className="distribution-kicker">Caso de turno</p>
            <h3>El reporte de una costura abierta</h3>
            <p>Sigue un caso ficticio desde el primer filtro hasta la respuesta de Calidad.</p>
            <Link href="/caso">Leer el caso <span aria-hidden="true">↗</span></Link>
          </article>
          <article>
            <p className="distribution-kicker">Antes de publicar</p>
            <h3>Lista para RR. HH.</h3>
            <p>Cuatro acuerdos para definir la revisión junto con la jefatura de calidad.</p>
            <a href="/semana-15/lista-rh.pdf">Abrir la lista en PDF <span aria-hidden="true">↗</span></a>
          </article>
          <article>
            <p className="distribution-kicker">Límites de la revisión</p>
            <h3>Qué pedir y qué dejar fuera</h3>
            <p>Pide una muestra con permiso y responde por escrito con el criterio acordado.</p>
            <Link href="/revision">Leer la guía <span aria-hidden="true">↗</span></Link>
          </article>
        </div>
      </section>
      <Rehearsal />
    </Editorial>
  )
}
