export const vacancy = 'Control de calidad textil · Segundo turno'

export const agreementFields = [
  {
    name: 'criterion',
    label: 'Criterio de revisión',
    options: [
      'Describe el defecto, la acción y cómo comprobaste el resultado.',
      'Explica cómo aislaste una pieza y a quién avisaste.',
    ],
  },
  {
    name: 'evidence',
    label: 'Evidencia que aceptará RR. HH.',
    options: [
      'Descripción propia de un caso de trabajo.',
      'Bitácora de turno con permiso y sin datos identificables.',
    ],
  },
  {
    name: 'reviewer',
    label: 'Quién revisará y responderá',
    options: ['Jefatura de calidad', 'Supervisión de calidad del segundo turno'],
  },
  {
    name: 'deadline',
    label: 'Plazo desde que RR. HH. envía el caso',
    options: ['Dos días hábiles', 'Cinco días hábiles'],
  },
] as const

export function rehearseAgreement(form: FormData) {
  const selected = agreementFields.map(({ name, label, options }) => {
    const value = options.find((option, index) => String(index) === form.get(name))
    return { label, value }
  })

  const details = selected.flatMap(({ label, value }) => value ? [{ label, value }] : [])
  if (details.length !== agreementFields.length) return null

  return {
    details,
    text: [
      'Primer Peldaño · Acuerdo de revisión',
      'ENSAYO FICTICIO · Sin datos de postulantes',
      '',
      vacancy,
      ...details.map(({ label, value }) => `${label}: ${value}`),
      '',
      'RR. HH. canaliza un caso elegible antes del filtro habitual de CV.',
      'La persona revisora responde por escrito dentro del plazo y explica el resultado con el criterio acordado.',
      'Para usar el formato en una vacante real, confirma el responsable y una fecha concreta con RR. HH. y Calidad.',
    ].join('\n'),
  }
}
