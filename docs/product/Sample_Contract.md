# Sample Contract — Cedar support handoffs

All people, program records, dates, and measurements are fictional.

| Record | Evidence and meaning |
|---|---|
| D1 | Routing guide and context card delivered September 14, 2026. Delivery only. |
| A1 | September 21–25: guide used in 16/20 handoffs; card in 12/20. Adoption only; the overlap of actual users is unknown. |
| B1 | Cedar support team, 20 handoffs across one five-day week, September 7–11: 200 minutes/week. |
| B2 | Elm support team, 30 handoffs across one five-day week, September 7–11: 300 minutes/week. Incompatible population and exposure. |
| O1 | Cedar support team, 20 handoffs across one five-day week, September 21–25: 140 minutes/week. Raw observation remains visible in all scenarios. |

Compatible B1 minus O1 is independently expected to be 60 minutes/week less. No control group, case-mix adjustment, or staffing adjustment exists. Missing B1 provides no difference. B2 cannot be used as a convenient substitute, and its 300 minus 140 must never appear as a recognized benefit.

## Hypothetical workflow atoms

| Atom | Assumption | Contribution identity |
|---|---|---|
| Route owner | 20 × assumed 1.5 minutes avoided = 30 | A only |
| Look up context | 20 × assumed 0.5 minutes avoided = 10 | A and B, same workflow; counted once |
| Re-enter context | 20 × assumed 1 minute avoided = 20 | B only |

These are full-use weekly assumptions, not adoption-adjusted empirical savings. Actual adoption is lower, and no forecast validation is claimed. A totals 40; B totals 30. Unique atoms total 30 + 10 + 20 = 60. Gross 70 minus duplicated lookup 10 = 60 hypothetical minutes/week. The hypothetical 60 and descriptive observed 60 coincide numerically; they are neither additive nor causal corroboration.

## Record and recovery contract

`cedar-evidence-1` fixes the evidence fixtures; `workflow-atoms-1` fixes the forecast and overlap rule. A review stores the scenario, complete evidence, exact versions, timestamp, direction, owner, rationale, and questions. Compatible records require canonical snapshot consistency. Invalid versions or fabricated snapshot amounts are rejected and preserved.

The browser key is `outcome-ledger-v1`. Twelve reviews and at most one withdrawal per review are supported. Withdrawal is an append-only event. Reset is destructive only after an explanatory preview and exact raw/readability match. Unreadable reset is unavailable. In-memory changes after save failure may be lost on refresh or close. Export includes both current evidence and original review snapshots, even after the scenario changes.
