# Outcome Ledger

[Read the formatted product documents](https://mvahedi2020.github.io/Outcome-Ledger/docs/index.html).

Check whether a finished project has evidence of a useful result. Compare the before-and-after figures and avoid counting the same possible saving twice. The example figures are fictional. All records in this demo are fictional.

**Try it:** Compare the compatible and missing-baseline examples, then review the evidence behind a continue or investigate decision. [Open the demo](https://mvahedi2020.github.io/Outcome-Ledger/) · [Follow the walkthrough](docs/product/Sample_Walkthrough.md).

[Open the interactive demo](https://mvahedi2020.github.io/Outcome-Ledger/).

Start with the [PM case study](docs/product/Case_Study.md), follow the [reviewer walkthrough](docs/product/Sample_Walkthrough.md), and inspect the [sample contract](docs/product/Sample_Contract.md). The [product brief](docs/product/Product_Brief.md), [PRD](docs/product/PRD.md), [decisions and risks](docs/product/Decisions_and_Risks.md), and [validation](docs/product/Validation.md) explain the scope and evidence.

The Cedar support sample traces a delivered routing guide and context card to fictional adoption counts. A compatible baseline supports a descriptive change from 200 to 140 minutes/week. A separate atom-based forecast reconciles 40 + 30 − 10 = 60 hypothetical minutes/week. Those equal values are coincidental and never summed or used as causal corroboration. Missing and wrong-population baseline scenarios keep the raw observation but remove the recognized change. A reviewed continue, investigate, or change decision preserves an immutable snapshot and exports a self-contained JSON report.

Mo provided product direction and scope. AI implemented the application, documents, and automated software checks. The sample is original fictional data. No employer data, certified ROI, user research, personal manual coding, or causal proof is claimed.

Product tradeoff: conditional benefit recognition demands baseline and overlap review. The next investment depends on whether that evidence changes the investment discussion enough to justify measurement and maintenance effort. See the [case study](docs/product/Case_Study.md) for the proposed comparison and investment criteria.

## Run locally

Use Node 24. `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4195/Outcome-Ledger/`. Production checks: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm audit`, and `npm run test:e2e`. The production browser suite starts and stops its own preview server. `npm run preview` serves the built app at the same route.

Local browser storage is the only persistence. Export before reset or closing an in-memory session. No authentication, network data collection, analytics, live AI, or backend is included. Compatible refresh restores reviews; invalid bytes are preserved until a reviewed reset. The 12-review boundary stops new reviews without dropping old ones.
