"use client"

import { useState, useEffect, useRef } from "react"
import {
  categories,
  artForms,
  timeline,
  techTactics,
  library,
  tools,
} from "@/lib/archive-data"
import { RadioModule } from "@/components/radio-module"

const MANIFESTO = `THE UNDERGROUND ARCHIVE
========================================
INSTRUCTIONS FOR SHARING & REDISTRIBUTION
========================================

WHAT THIS IS
------------
A digital archive of creative protest methods used around the
world. Art as protest, creative interventions, alternative uses
of technology, documentation, transmission, and tools. It was
built to be read, copied, and passed on.

THE ETHOS
---------
Information wants to be free. Knowledge of how people resist,
organize, and speak should belong to everyone — not locked behind
paywalls, borders, or permission. This archive exists because the
right to free expression is meaningless without the right to
share what we know.

We believe in:
  - The open and free sharing of information.
  - The right to free speech and free assembly.
  - Knowledge as a commons, not a commodity.
  - Solidarity over secrecy of ideas.

YOU ARE ENCOURAGED TO
---------------------
  1. COPY this archive freely. Mirror it, fork it, print it.
  2. REDISTRIBUTE it in any form — digital, paper, spoken.
  3. TRANSLATE it into other languages.
  4. EXPAND it. Every entry is a seed. Add your own.
  5. TEACH from it. Share it with anyone who needs it.

NO PERMISSION REQUIRED
----------------------
You do not need to ask. You do not need to credit. You do not
need to pay. If it helps someone resist injustice or speak more
freely, it has done its job.

A FEW PRINCIPLES FOR SAFE SHARING
---------------------------------
  - Protect people, not just information. Strip identifying
    details when a source could be put at risk.
  - Verify before you amplify. Misinformation harms movements.
  - Share tools AND the knowledge to use them safely.
  - Remember that in some places, this knowledge is dangerous to
    hold. Share with care and consent.

----------------------------------------
Read it. Copy it. Pass it on.
Solidarity is the only secure protocol.
----------------------------------------`

function SectionHeader({
  code,
  title,
  blurb,
}: {
  code: string
  title: string
  blurb: string
}) {
  return (
    <header className="mb-6 border-b border-border pb-4">
      <div className="flex items-baseline gap-3">
        <span className="text-xs uppercase tracking-widest text-primary text-glow">
          {code}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl leading-none text-foreground md:text-5xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
        {blurb}
      </p>
    </header>
  )
}

export function Archive() {
  const [active, setActive] = useState("art")
  const [bootDone, setBootDone] = useState(false)
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const t = setTimeout(() => setBootDone(true), 1600)
    return () => clearTimeout(t)
  }, [])

  // Track which section is in view to highlight the sidebar.
  // Wait for bootDone so the section refs exist before observing them.
  useEffect(() => {
    if (!bootDone) return
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is visible.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    )
    Object.values(sectionsRef.current).forEach((el) => {
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [bootDone])

  const scrollTo = (id: string) => {
    setActive(id)
    sectionsRef.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionsRef.current[id] = el
  }

  const downloadInstructions = () => {
    const blob = new Blob([MANIFESTO], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "underground-archive-instructions.txt"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (!bootDone) {
    return (
      <div className="crt-screen flex min-h-screen flex-col justify-center px-6 font-mono text-sm text-primary text-glow">
        <pre className="whitespace-pre-wrap leading-relaxed">
{`> establishing secure connection ............ OK
> decrypting node manifest .................. OK
> verifying clearance ....................... GRANTED
> mounting /dev/archive ..................... OK
> loading creative resistance index ......... `}
          <span className="blink">█</span>
        </pre>
      </div>
    )
  }

  return (
    <div className="crt-screen min-h-screen">
      {/* top status bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/95 px-4 py-2 text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
        <span>
          <span className="text-primary text-glow">●</span> NODE ACTIVE
        </span>
        <span className="hidden sm:inline">
          ENCRYPTED CHANNEL // DO NOT FORWARD
        </span>
        <span className="tabular-nums">SIG {new Date().getFullYear()}</span>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 lg:flex-row lg:gap-12">
        {/* command sidebar */}
        <aside className="lg:sticky lg:top-14 lg:h-fit lg:w-64 lg:flex-none">
          <div className="border border-border bg-card p-4">
            <div className="font-[family-name:var(--font-display)] text-3xl leading-none text-primary text-glow">
              THE
              <br />
              UNDERGROUND
              <br />
              ARCHIVE
            </div>
            <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
              Creative protest methods // worldwide. Compiled by the collective.
              Read, copy, redistribute.
            </p>
          </div>

          <nav className="mt-4 border border-border bg-card" aria-label="Archive sections">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => scrollTo(c.id)}
                aria-current={active === c.id ? "true" : undefined}
                className={`flex w-full items-center gap-2 border-b border-border px-3 py-2.5 text-left text-xs uppercase tracking-wide transition-colors last:border-b-0 ${
                  active === c.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <span className="tabular-nums opacity-70">{c.code}</span>
                <span className="flex-1 leading-tight">{c.title}</span>
                {active === c.id && <span aria-hidden>►</span>}
              </button>
            ))}
          </nav>

          <button
            onClick={downloadInstructions}
            className="mt-4 flex w-full items-center gap-2 border border-primary bg-card px-3 py-2.5 text-left text-xs uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <span aria-hidden>▼</span>
            <span className="flex-1 leading-tight">Download instructions</span>
            <span className="text-[10px] opacity-70">.txt</span>
          </button>

          <p className="mt-3 px-1 text-[10px] leading-relaxed text-muted-foreground">
            {">"} sharing & redistribution protocol. read it. pass it on.
          </p>
        </aside>

        {/* content */}
        <main className="min-w-0 flex-1 space-y-20">
          {/* SEC-01 — Art Forms */}
          <section id="art" ref={setRef("art")} className="scroll-mt-20">
            <SectionHeader {...categories[0]} />
            <div className="grid gap-px bg-border sm:grid-cols-2">
              {artForms.map((a) => (
                <article
                  key={a.name}
                  className="bg-card p-4 transition-colors hover:bg-secondary"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-foreground">{a.name}</h3>
                    <span className="whitespace-nowrap text-[10px] uppercase tracking-wide text-primary">
                      {a.origin}
                    </span>
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                    {a.medium}
                  </div>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {a.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* SEC-02 — Timeline */}
          <section id="interventions" ref={setRef("interventions")} className="scroll-mt-20">
            <SectionHeader {...categories[1]} />
            <ol className="relative border-l border-border pl-6">
              {timeline.map((t) => (
                <li key={t.year + t.title} className="relative mb-7 last:mb-0">
                  <span
                    aria-hidden
                    className="absolute -left-[1.65rem] top-1 h-3 w-3 border-2 border-primary bg-background"
                  />
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-[family-name:var(--font-display)] text-2xl text-primary text-glow">
                      {t.year}
                    </span>
                    <h3 className="text-base font-bold text-foreground">{t.title}</h3>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {t.place}
                    </span>
                  </div>
                  <p className="mt-1 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
                    {t.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* SEC-03 — Tech */}
          <section id="tech" ref={setRef("tech")} className="scroll-mt-20">
            <SectionHeader {...categories[2]} />
            <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {techTactics.map((t) => (
                <article key={t.name} className="flex flex-col bg-card p-4">
                  <span className="text-[10px] uppercase tracking-widest text-primary">
                    {t.category}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-foreground">{t.name}</h3>
                  <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {t.description}
                  </p>
                  {t.link && (
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 text-xs uppercase tracking-wide text-primary underline underline-offset-4 hover:text-foreground"
                    >
                      {">"} access node
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* SEC-04 — Library */}
          <section id="library" ref={setRef("library")} className="scroll-mt-20">
            <SectionHeader {...categories[3]} />
            <ul className="divide-y divide-border border border-border">
              {library.map((r) => (
                <li
                  key={r.title}
                  className="flex flex-col gap-1 bg-card p-4 transition-colors hover:bg-secondary sm:flex-row sm:items-baseline sm:gap-4"
                >
                  <span className="font-[family-name:var(--font-display)] text-xl text-primary text-glow sm:w-16 sm:flex-none">
                    {r.year}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-foreground">
                      {r.title}
                    </h3>
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {r.author}
                    </div>
                    <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {r.note}
                    </p>
                    {r.link && (
                      <a
                        href={r.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-block text-xs uppercase tracking-wide text-primary underline underline-offset-4 hover:text-foreground"
                      >
                        {">"} retrieve document
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* SEC-05 — Radio */}
          <section id="radio" ref={setRef("radio")} className="scroll-mt-20">
            <SectionHeader {...categories[4]} />
            <RadioModule />
          </section>

          {/* SEC-06 — Tools */}
          <section id="tools" ref={setRef("tools")} className="scroll-mt-20">
            <SectionHeader {...categories[5]} />
            <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((t) => (
                <article key={t.name} className="flex flex-col bg-card p-4">
                  <span className="text-[10px] uppercase tracking-widest text-primary">
                    {t.use}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-foreground">{t.name}</h3>
                  <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {t.description}
                  </p>
                  {t.link && (
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 text-xs uppercase tracking-wide text-primary underline underline-offset-4 hover:text-foreground"
                    >
                      {">"} open resource
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>

          <footer className="border-t border-border pt-6 text-[10px] uppercase tracking-widest text-muted-foreground">
            <p>End of transmission. Burn after reading is metaphorical. The archive persists.</p>
            <p className="mt-1">
              {">"} solidarity is the only secure protocol_
              <span className="blink">█</span>
            </p>
          </footer>
        </main>
      </div>
    </div>
  )
}
