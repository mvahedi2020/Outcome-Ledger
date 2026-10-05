import { describe, it, expect } from "vitest";
import {
  snapshot,
  observation,
  reconcile,
  fresh,
  valid,
  LIMIT,
} from "./domain";
import { read, write, reset } from "./storage";
describe("benefit rules", () => {
  it("independently expects 40+30 less duplicated ten", () =>
    expect(reconcile()).toMatchObject({ gross: 70, shared: 10, net: 60 }));
  it("requires comparable baseline despite delivered output", () => {
    expect(observation("compatible").amount).toBe(60);
    expect(observation("missing").amount).toBeNull();
    expect(observation("wrong").amount).toBeNull();
  });
  it("keeps forecast and observation separate", () => {
    const s = snapshot("compatible");
    expect(s.overlap.kind).toBe("Hypothetical forecast");
    expect(s.observation.minutes).toBe(140);
    expect(s.overlap.population).toBe(s.observation.population);
    expect(s.causalLimit).toContain("No control group");
  });
  it("rejects forged evidence and history overflow", () => {
    const r = {
      id: "r",
      at: new Date().toISOString(),
      choice: "continue",
      owner: "Nia",
      rationale: "Check",
      questions: "Case mix?",
      evidence: snapshot("compatible"),
    };
    expect(valid({ ...fresh(), reviews: [r] })).toBe(true);
    expect(
      valid({
        ...fresh(),
        reviews: [
          {
            ...r,
            evidence: {
              ...r.evidence,
              eligibility: { eligible: true, amount: 900, reason: "x" },
            },
          },
        ],
      }),
    ).toBe(false);
    expect(valid({ ...fresh(), reviews: Array(LIMIT + 1).fill(r) })).toBe(
      false,
    );
  });
});
describe("raw value and readability boundaries", () => {
  it("restores valid state and preserves malformed bytes", () => {
    expect(read({ getItem: () => JSON.stringify(fresh()) }).kind).toBe(
      "compatible",
    );
    expect(read({ getItem: () => "{broken" }).raw).toBe("{broken");
  });
  it("never writes unseen bytes even when setItem succeeds", () => {
    let writes = 0;
    const store = {
      getItem: () => {
        throw Error("blocked");
      },
      setItem: () => {
        writes++;
      },
    };
    const before = read(store);
    expect(write(store, before, fresh()).notice).toContain("memory only");
    expect(reset(store, before).ok).toBe(false);
    expect(writes).toBe(0);
  });
  it("rejects same parsed content with changed raw whitespace", () => {
    const initial = JSON.stringify(fresh());
    const store = {
      getItem: () => initial + " ",
      setItem: () => {
        throw Error("unexpected");
      },
    };
    expect(
      write(
        store,
        { kind: "compatible", raw: initial, value: fresh() },
        fresh(),
      ).ok,
    ).toBe(false);
  });
  it("rejects readability transition and conflicts", () => {
    const store = {
      getItem: () => JSON.stringify(fresh()),
      setItem: () => {
        throw Error("unexpected");
      },
    };
    expect(
      write(store, { kind: "unreadable", raw: null, value: fresh() }, fresh())
        .ok,
    ).toBe(false);
  });
  it("keeps invalid state until explicit raw-bound reset", () => {
    let value = "broken";
    const store = {
      getItem: () => value,
      setItem: (_k: string, v: string) => {
        value = v;
      },
    };
    const before = read(store);
    expect(write(store, before, fresh()).ok).toBe(false);
    expect(value).toBe("broken");
    expect(reset(store, before).ok).toBe(true);
    expect(read(store).kind).toBe("compatible");
  });
  it("announces write failure without claiming durable save", () => {
    const store = {
      getItem: () => null,
      setItem: () => {
        throw Error("quota");
      },
    };
    expect(write(store, read(store), fresh()).notice).toContain(
      "refresh or closing",
    );
  });
});


describe("saved enum types", () => {
  const review = () => ({
    id: "review-enum",
    at: "2026-10-05T07:00:00.000Z",
    choice: "continue",
    owner: "Nia",
    rationale: "Check comparable evidence.",
    questions: "Did case mix change?",
    evidence: snapshot("compatible"),
  });
  it.each(["compatible", "missing", "wrong"])(
    "rejects an array-valued ledger scenario %s",
    (scenario) => expect(valid({ ...fresh(), scenario: [scenario] })).toBe(false),
  );
  it.each(["continue", "investigate", "change"])(
    "rejects an array-valued review choice %s",
    (choice) => expect(valid({ ...fresh(), reviews: [{ ...review(), choice: [choice] }] })).toBe(false),
  );
  it("rejects an array-valued withdrawal reference", () => {
    const r = review();
    const withdrawal = { id: "withdraw-enum", reviewId: [r.id], at: r.at, reason: "Evidence needs another review." };
    expect(valid({ ...fresh(), reviews: [r], withdrawals: [withdrawal] })).toBe(false);
  });
  it("rejects an array-valued scenario inside otherwise canonical evidence", () => {
    const r = review();
    const evidence = { ...r.evidence, scenario: ["compatible"] };
    expect(valid({ ...fresh(), reviews: [{ ...r, evidence }] })).toBe(false);
  });
});
