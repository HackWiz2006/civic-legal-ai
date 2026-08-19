"use client";

import { FormEvent, useState } from "react";

type Answer = {
  answer: string;
  disclaimer: string;
  sources: Array<{ title: string; url: string }>;
};

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setAnswer(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
      const response = await fetch(apiUrl + "/api/v1/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, jurisdiction: "unspecified" })
      });

      if (!response.ok) throw new Error("The service could not answer right now.");
      setAnswer(await response.json());
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Civic Legal AI</p>
        <h1>Understand your options. Find the right next step.</h1>
        <p className="lede">
          Ask a civic or legal-information question in plain language. Always verify important
          decisions with an official source or qualified professional.
        </p>
      </section>

      <section className="card">
        <form onSubmit={submit}>
          <label htmlFor="question">What would you like to understand?</label>
          <textarea
            id="question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Example: How do I file a public information request?"
            minLength={10}
            required
          />
          <button disabled={loading}>{loading ? "Checking…" : "Ask a question"}</button>
        </form>

        {error && <p className="error">{error}</p>}
        {answer && (
          <article className="answer">
            <h2>General information</h2>
            <p>{answer.answer}</p>
            <p className="notice">{answer.disclaimer}</p>
            {answer.sources.length > 0 && (
              <>
                <h3>Sources</h3>
                <ul>
                  {answer.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </article>
        )}
      </section>
    </main>
  );
}
