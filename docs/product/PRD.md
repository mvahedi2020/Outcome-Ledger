# PRD — Evidence before value

## Product requirements

1. **Trace contribution.** Show each output’s delivery status, accountable owner, adoption numerator/denominator, adoption period, benefit period, and forecast contribution. Selecting an initiative changes its detail. Delivered status cannot create or alter an observation.
2. **Check eligibility.** Compare only Cedar’s same 20 weekly handoffs, minutes/week unit, and complete five-day exposure. Baseline Sept 7–11 and observation Sept 21–25 are explicit distinct periods. Missing baseline or Elm’s 30-handoff baseline removes the recognized change while retaining O1’s raw 140-minute observation. Returning to the compatible scenario recovers the descriptive 60-minute change.
3. **Reconcile forecast.** Show routing 30, lookup 10, re-entry 20; initiatives A and B share lookup. Count each workflow atom once, yielding 60 instead of 70. Full-use forecast assumptions are visible alongside lower actual adoption. Do not combine observed and forecast values or incompatible populations, periods, or measures.
4. **Review investment.** Continue, investigate, and change require owner, rationale, and open questions. Preview includes evidence references, versions, overlap rule, amounts, and causal caveat. Confirm appends an immutable snapshot. Later scenario changes leave it intact. Withdrawal appends a reason, retaining original review. Export is self-contained.
5. **Protect local work.** Compatible records restore on refresh. Invalid records remain untouched until explicit reset. Confirmation compares exact raw saved bytes and readability with the preview. Changed bytes, including whitespace-only changes, reject mutation. Unreadable storage never writes unseen bytes. Write failure allows clearly announced memory-only work. Reset failure preserves work. Twelve reviews is a visible cap; export and reset recover capacity without silent eviction.
6. **Access the journey.** Semantic landmarks, labeled controls, visible focus, native modal focus scope, Escape/cancel no mutation, focus return, live status, and 320/390 pixel layout are required. The production route works at a short 1280×633 viewport.

## Acceptance story

Inspect both outputs; select missing baseline and explain why delivery does not imply value; restore compatible evidence; reconcile shared lookup; preview and cancel a decision; confirm another; change the scenario and inspect retained history; export; withdraw with a reason; preview/cancel then confirm reset. Independently expected arithmetic and adverse storage scenarios accompany the journey.

## Proposed evaluation

In future moderated sessions, ask reviewers to distinguish output versus benefit, explain baseline compatibility, detect double counting, and name an accountable owner. Observe correctness and reasoning before timing. Software tests establish behavior only; no participant sessions or comprehension results are claimed.

## Work-package traceability

| Package | Implemented contract and reviewer evidence |
|---|---|
| S087 | Primary program owner, benefit-recognition decision, milestone-checklist alternative, fictional boundary; Product Brief |
| S088 | Original Cedar fixtures, exposure rules, atom assumptions, review/recovery states; Sample Contract |
| S089 | Node 24 static foundation, real selection/navigation, security metadata, pinned CI/Pages configuration |
| S090 | Output-to-adoption-to-benefit map, initiative owners and explicit windows |
| S091 | Compatible, missing, and wrong-population baseline eligibility with raw observation retained |
| S092 | Unique workflow-atom forecast union and explicit separation from observed comparison |
| S093 | Reviewed direction, immutable evidence/estimate versions, references, questions, owner, self-contained export |
| S094 | Exact saved-byte/readability boundaries, invalid preservation, memory loss notice, reset, withdrawal, history-cap recovery |
| S095 | Keyboard/focus, narrow and short viewport checks, Case Study, proposed evaluation measures |
| S096 | Local release gates and reviewer route; external release provenance is recorded in Validation |
