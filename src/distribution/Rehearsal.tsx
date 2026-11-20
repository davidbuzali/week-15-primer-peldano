'use client'

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from 'react'
import { agreementFields, rehearseAgreement, vacancy } from './agreement'

const subscribeToHydration = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export default function Rehearsal() {
  const ready = useSyncExternalStore(subscribeToHydration, getClientSnapshot, getServerSnapshot)
  const [agreement, setAgreement] = useState<ReturnType<typeof rehearseAgreement>>(null)
  const [error, setError] = useState(false)
  const result = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (agreement) result.current?.focus()
  }, [agreement])

  function prepareAgreement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const prepared = rehearseAgreement(new FormData(event.currentTarget))
    setAgreement(prepared)
    setError(prepared === null)
  }

  function clearAgreement() {
    setAgreement(null)
    setError(false)
  }

  return (
    <section className="distribution-rehearsal" id="ensayo" aria-labelledby="rehearsal-title">
      <div>
        <p className="distribution-kicker">Ejemplo ficticio</p>
        <h2 id="rehearsal-title">Ensaya el acuerdo de revisión</h2>
        <p>Elige cuatro opciones para una vacante de control de calidad. El acuerdo de práctica se genera y descarga en tu navegador.</p>
      </div>
      <div className="distribution-rehearsal-panel">
        <form onSubmit={prepareAgreement} onReset={clearAgreement} onChange={clearAgreement}>
          <p className="distribution-vacancy">{vacancy}</p>
          {agreementFields.map(({ name, label, options }) => (
            <label key={name}>
              <span>{label}</span>
              <select name={name} defaultValue="" required>
                <option value="">Selecciona una opción</option>
                {options.map((option, index) => <option key={option} value={String(index)}>{option}</option>)}
              </select>
            </label>
          ))}
          {error && <p role="alert">Selecciona una opción válida en cada campo.</p>}
          <div className="distribution-form-actions">
            <button className="distribution-button" type="submit" disabled={!ready}>Generar acuerdo</button>
            <button className="distribution-text-button" type="reset">Limpiar</button>
          </div>
        </form>
        {agreement && (
          <div className="distribution-result">
            <h3 ref={result} tabIndex={-1}>Acuerdo de práctica</h3>
            <dl>
              {agreement.details.map(({ label, value }) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
            <p>RR. HH. canaliza un caso elegible antes del filtro de CV. La persona revisora responde por escrito con el criterio y dentro del plazo.</p>
            <p><strong>Para una vacante real:</strong> antes de publicar, confirma con RR. HH. y Calidad qué hace elegible un caso, quién lo recibe y en qué fecha responderá. Usa el canal interno de tu empresa.</p>
            <a className="distribution-button" href={`data:text/plain;charset=UTF-8,${encodeURIComponent(agreement.text)}`} download="acuerdo-primer-peldano.txt">
              Descargar acuerdo de práctica
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
