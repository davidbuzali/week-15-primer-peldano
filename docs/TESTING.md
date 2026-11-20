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
