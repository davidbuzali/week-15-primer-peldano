# Week 16 test evidence

Chrome with fresh contexts, 25 November 2026. The 390 × 844 viewport emulates a phone. The baseline used the existing anonymous Vercel release. The first retest ran against the local production build.

| Check | Expected | Actual |
| --- | --- | --- |
| Phone core task | Open the fictional case, follow its link, select four options, generate and save a labeled UTF-8 agreement that matches the screen. | Passed at 390 × 844 with no horizontal overflow. Download completed as `acuerdo-primer-peldano.txt`. Text matched the defect-action-check criterion, permitted de-identified shift log, quality lead and five working days. The fictional label and internal-route instruction were present. Limpiar cleared all four values and removed the result. |
| Safe failure | Generating from an empty rehearsal leaves all four fields invalid and produces no agreement, request or applicant record. A non-allowlisted selection is rejected by validation. | Passed. Four controls remained invalid. No result appeared or form data went over the network. The existing logic tests also rejected missing, noncanonical and arbitrary option values. |
| Keyboard before fix | Enter on the case CTA moves focus to the named rehearsal region. Next Tab reaches Criterio de revisión. | Scrolled to the rehearsal, but active focus stayed on the page body. The next Tab did reach the first select. Mar's simulated confusion concerned the moment before pressing Tab. |
| Keyboard after fix | Repeat the same path, then test the home-page CTA, a fresh deep link and result focus. | Enter put focus on the rehearsal section with a visible outline, and Tab reached Criterio de revisión. The home CTA behaved the same way. A fresh direct visit to /#ensayo put the first Tab on Criterio de revisión. Generating an agreement moved focus to Acuerdo de práctica. |
| Route and release | Five defense panels and the existing case, guidance, calculator, evidence and printable checklist remain accessible. | The production build served /about with five ordered panels. Existing routes and the PDF returned HTTP 200. All 33 automated checks passed, as did lint, the production build and type checking. |

[Keyboard arrival before](assets/week16-focus-before.png) · [Keyboard arrival after](assets/week16-focus-after.png) · [Mobile result](assets/week16-mobile-result.png)

## Week 15 claim review rerun

Used the existing path from source research through copy, then evidence review, style and approval. The private synthetic challenge was a quantified screening-time reduction attributed to Primer Peldaño. The public record identifies its type only.

| Step | Expected | Actual |
| --- | --- | --- |
| Unsupported outcome challenge | Reject the claim because the source establishes a posting step and there are no measured pilot results for the claim. Hold the draft before approval. | Rejected during evidence review. OCC describes posting fields. The practice agreement and hypothetical price supply no timing measurements. The invented claim stopped there, before style, approval or publication. |
| Sourced control | Accept the limited statement that OCC asks recruiters to specify experience, minimum schooling and schedule during vacancy setup. | Accepted as supported by OCC. The statement concerns the posted workflow and preserves the boundary around employer outcomes. |

The check behaved as expected. The approval gate stays in place. [OCC employer publication guide](https://supportcenter.occ.com.mx/hc/es/articles/41245639854737-Publica-tu-primera-vacante-en-OCC)

## Security and open risk

- The rehearsal uses generated choices and a local data download. It has no applicant input fields, upload, submission endpoint, storage or tracker. The run observed zero non-read requests from entering the case through making and downloading the agreement.
- The public case and demo examples are fictional. The existing evidence and calculator tools use bounded browser-local data. The optional Supabase migration enables owner-scoped RLS for authenticated users. The public routes use no database writes. No keys or environment files were introduced.
- Next.js moved from 16.4.3 to 16.4.6 and React from 19.2.0 to 19.2.9. The patched production-dependency audit returned zero advisories at test time.
- The largest outstanding risk is a silently dropped eligible case in the employer's actual route. A diagnosed risk in the pre-session team blueprint guides the field test. There is no observed employer routing result.

---

# Week 15 test evidence

| Check | Result |
| --- | --- |
| Automated tests | 33 passing, including validation of selectable values and the generated synthetic agreement. |
| Anonymous production | Home, case, review guidance, rehearsal, pricing and earlier evidence opened without sign-in on the production alias. |
| Rehearsal | Empty submission showed four required inputs and no result. Four permitted selections produced the expected criterion, evidence, reviewer and deadline. Reset cleared the fields and result. |
| Export | Browser exposed the intended .txt filename and UTF-8 fictional agreement in its download link. The in-app browser did not report a completed file-download event. |
| Responsive | At 390 × 844, document width was 390 pixels. The form measured 286 pixels and fit without horizontal overflow. |
| Checklist | Letter-size PDF rendered cleanly. Its rehearsal and OCC links were checked in the document annotations. |
| Persona | Same-chat synthetic walkthrough identified ambiguity about the next step for a real vacancy. The result and export now state the eligible case, owner, date and internal route. See PERSONA.md. |
| Audience | Distribution has no documented sends or results. Synthetic examples demonstrate logging only. |

The revised production result and UTF-8 export both contained the exact internal-channel instruction. The final release also disables the submit button until React attaches the client handler, so a quick click after navigation cannot trigger default browser form submission.
