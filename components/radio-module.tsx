"use client"

/**
 * RADIO TRANSMISSION MODULE
 * ─────────────────────────
 * A self-contained audio player. It reads the `stations` list from
 * lib/archive-data.ts and streams them through a hidden <audio> element.
 *
 * TO CONNECT YOUR RADIO FROM THE OTHER PROJECT:
 *   1. Open lib/archive-data.ts
 *   2. Find the `stations` array
 *   3. Paste your stream URL(s) into each station's `src` field
 *      (a direct Icecast/Shoutcast .mp3/.aac endpoint or an .mp3 file).
 * That's it — the player, station list, and chassis all work from that data.
 */

import { useState, useEffect, useRef } from "react"
import { stations } from "@/lib/archive-data"

export function RadioModule() {
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const station = stations[current]
  const hasStream = Boolean(station?.src)

  // Apply volume to the audio element.
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  // When the station changes, reload and resume if we were playing.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    setError(null)
    audio.load()
    if (playing && station?.src) {
      audio.play().catch(() => {
        setPlaying(false)
        setError("SIGNAL LOST — could not lock channel.")
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (!station?.src) {
      setError("NO STREAM URL — add one in lib/archive-data.ts")
      return
    }
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        await audio.play()
        setPlaying(true)
        setError(null)
      } catch {
        setError("SIGNAL LOST — could not lock channel.")
      }
    }
  }

  const selectStation = (i: number) => {
    setCurrent(i)
    setPlaying(true)
  }

  return (
    <div className="border border-border bg-card">
      {/* chassis header */}
      <div className="flex items-center justify-between border-b border-border bg-secondary px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground">
        <span>FREE RADIO UNIT // ANALOG</span>
        <span className={playing ? "text-primary text-glow" : "text-muted-foreground"}>
          {playing ? "● ON AIR" : "○ STANDBY"}
        </span>
      </div>

      <div className="grid gap-6 p-5 md:grid-cols-[1fr_220px]">
        {/* ── PLAYER + STATION LIST ── */}
        <div className="flex flex-col gap-4">
          {/* now playing */}
          <div className="border border-border bg-background/60 p-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Now tuned
            </div>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="font-[family-name:var(--font-display)] text-3xl text-primary text-glow">
                {station?.frequency}
                <span className="ml-1 text-base">MHz</span>
              </span>
              <span className="text-sm font-bold text-foreground">{station?.name}</span>
            </div>
            <p className="mt-1 text-pretty text-xs leading-relaxed text-muted-foreground">
              {station?.description}
            </p>

            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={togglePlay}
                aria-label={playing ? "Pause transmission" : "Play transmission"}
                className="flex h-10 w-10 flex-none items-center justify-center border border-primary text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {playing ? (
                  <span className="flex gap-1" aria-hidden>
                    <span className="block h-4 w-1 bg-current" />
                    <span className="block h-4 w-1 bg-current" />
                  </span>
                ) : (
                  <span
                    aria-hidden
                    className="ml-0.5 block h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-current"
                  />
                )}
              </button>

              {/* volume */}
              <div className="flex flex-1 items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Vol
                </span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
                  aria-label="Volume"
                  className="w-full accent-[var(--primary)]"
                />
              </div>
            </div>

            {error && (
              <p className="mt-2 text-[10px] uppercase tracking-widest text-destructive">
                {">"} {error}
              </p>
            )}
          </div>

          {/* station list */}
          <div className="border border-border">
            <div className="border-b border-border bg-secondary px-3 py-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
              Channel List
            </div>
            <ul>
              {stations.map((s, i) => (
                <li key={s.id}>
                  <button
                    onClick={() => selectStation(i)}
                    aria-current={i === current ? "true" : undefined}
                    className={`flex w-full items-center gap-3 border-b border-border px-3 py-2 text-left text-xs transition-colors last:border-b-0 ${
                      i === current
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <span className="font-[family-name:var(--font-display)] text-base tabular-nums">
                      {s.frequency}
                    </span>
                    <span className="flex-1 font-bold uppercase tracking-wide">
                      {s.name}
                    </span>
                    {i === current && playing && (
                      <span aria-hidden className="blink">
                        ►
                      </span>
                    )}
                    {!s.src && (
                      <span className="text-[9px] uppercase tracking-widest opacity-70">
                        no src
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* hidden audio engine */}
          <audio
            ref={audioRef}
            preload="none"
            onEnded={() => setPlaying(false)}
            onError={() => {
              if (hasStream) {
                setPlaying(false)
                setError("SIGNAL LOST — stream unreachable.")
              }
            }}
          >
            {hasStream && <source src={station.src} />}
          </audio>
        </div>

        {/* analog readout sidebar (cosmetic chassis) */}
        <div className="flex flex-col gap-4 border-l border-border pl-5">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Tuner
            </div>
            <div className="mt-2 flex h-24 items-end gap-px" aria-hidden>
              {Array.from({ length: 28 }).map((_, i) => {
                const isMark = i % 4 === 0
                return (
                  <span
                    key={i}
                    className={`flex-1 ${isMark ? "bg-primary" : "bg-border"}`}
                    style={{ height: `${isMark ? 100 : 40 + (i % 3) * 18}%` }}
                  />
                )
              })}
            </div>
            <div className="mt-1 flex justify-between text-[9px] tabular-nums text-muted-foreground">
              <span>88</span>
              <span>98</span>
              <span>108</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Status
            </div>
            <div
              className="mt-1 flex h-3 w-full gap-px"
              role="meter"
              aria-valuenow={playing ? 100 : 0}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Signal strength"
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    playing && i < 16 ? "flex-1 bg-primary" : "flex-1 bg-border"
                  }
                />
              ))}
            </div>
            <div className="mt-1 text-[10px] tabular-nums text-muted-foreground">
              {playing ? "LOCKED" : "IDLE"}
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
