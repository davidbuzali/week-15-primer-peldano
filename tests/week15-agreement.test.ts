import assert from 'node:assert/strict'
import test from 'node:test'
import { agreementFields, rehearseAgreement } from '../src/distribution/agreement.ts'

function formWithSelectedOptions() {
  const form = new FormData()
  for (const { name } of agreementFields) form.set(name, '1')
  return form
}

test('a complete rehearsal includes the selected options and the fictional status', () => {
  const result = rehearseAgreement(formWithSelectedOptions())
  assert.ok(result)
  assert.deepEqual(result.details.map(({ value }) => value), agreementFields.map(({ options }) => options[1]))
  assert.match(result.text, /ENSAYO FICTICIO/)
  assert.match(result.text, /qué hace elegible un caso/)
  assert.match(result.text, /Usa el canal interno de tu empresa/)
})

test('a missing value, noncanonical index, or arbitrary text is rejected', () => {
  const form = formWithSelectedOptions()
  form.delete('reviewer')
  assert.equal(rehearseAgreement(form), null)
  form.set('reviewer', '01')
  assert.equal(rehearseAgreement(form), null)
  form.set('reviewer', 'Un nombre que no se debe incluir')
  assert.equal(rehearseAgreement(form), null)
})
