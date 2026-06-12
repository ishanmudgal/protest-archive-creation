"use client"

/**
 * RADIO TRANSMISSION MODULE
 * ─────────────────────────
 * PASTE YOUR RADIO CODE HERE.
 *
 * Replace the contents of the <div data-radio-slot> below with the radio
 * component from your previous project. The surrounding terminal chassis
 * (dials, frame, signal readout) will frame whatever you drop in.
 *
 * If your radio is a separate component, import it and render it inside
 * the slot, e.g.:
 *
 *   import { RadioPlayer } from "@/components/radio-player"
 *   ...
 *   <div data-radio-slot> <RadioPlayer /> </div>
 */

import { useState, useEffect } from "react"

export function RadioModule() {
  const [freq, setFreq] = useState(101.4)
  const [signal, setSignal] = useState(72)

  // Idle animation for the analog signal meter — purely cosmetic chassis.
  useEffect(() => {
    const id = setInterval(() => {
      setSignal(() => 55 + Math.floor(Math.random() * 40))
    }, 1400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="border border-border bg-card">
      {/* chassis header */}
      <div className="flex items-center justify-between border-b border-border bg-secondary px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground">
        <span>FREE RADIO UNIT // ANALOG</span>
        <span className="text-primary text-glow">● ON AIR</span>
      </div>

      <div className="grid gap-6 p-5 md:grid-cols-[1fr_220px]">
        {/* ── RADIO SLOT: paste your radio component here ── */}
        <div
          data-radio-slot
          className="flex min-h-[220px] flex-col items-center justify-center border border-dashed border-border bg-background/60 p-6 text-center"
        >
          <p className="font-[family-name:var(--font-display)] text-2xl text-primary text-glow">
            [ RADIO SLOT ]
          </p>
          <p className="mt-2 max-w-sm text-pretty text-xs leading-relaxed text-muted-foreground">
            Paste your radio component from the previous project here. Open{" "}
            <span className="text-foreground">components/radio-module.tsx</span>{" "}
            and replace this slot with your player. The chassis around it stays.
          </p>
        </div>

        {/* analog readout sidebar (cosmetic chassis) */}
        <div className="flex flex-col gap-4 border-l border-border pl-5">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Frequency
            </div>
            <div className="font-[family-name:var(--font-display)] text-3xl text-primary text-glow">
              {freq.toFixed(1)} <span className="text-base">MHz</span>
            </div>
            <input
              type="range"
              min={88}
              max={108}
              step={0.1}
              value={freq}
              onChange={(e) => setFreq(Number.parseFloat(e.target.value))}
              aria-label="Tune frequency"
              className="mt-2 w-full accent-[var(--primary)]"
            />
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Signal
            </div>
            <div
              className="mt-1 flex h-3 w-full gap-px"
              role="meter"
              aria-valuenow={signal}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Signal strength"
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < Math.round(signal / 5)
                      ? "flex-1 bg-primary"
                      : "flex-1 bg-border"
                  }
                />
              ))}
            </div>
            <div className="mt-1 text-[10px] tabular-nums text-muted-foreground">
              {signal}% LOCKED
            </div>
          </div>

          <p className="mt-auto text-[10px] leading-relaxed text-muted-foreground">
            EST. transmission unsanctioned. Coordinates withheld. Listen, do not
            log.
          </p>
        </div>
      </div>
    </div>
  )
}
