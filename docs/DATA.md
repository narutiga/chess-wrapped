# DATA.md

# Chess Wrapped — Data Model & API Mapping

## Purpose

This document defines the single internal data model that every scene receives.

Scenes never read API responses directly.

They read this model.

The model is the contract between the data layer and the scenes.

It must stay identical no matter how the data was fetched.

See

Stage A and Stage B

in SCENES.md and DEVELOPMENT.md.

---

# The Internal Model

Every Wrapped is described by one object.

```
WrappedData

  username        string        e.g. "riku_jp"
  year            number        target year, e.g. 2026

  gamesPlayed     number        total games in the recap
  winRate         number        0–100, already rounded

  favoriteMode    GameMode      "bullet" | "blitz" | "rapid" | "daily"

  currentRating   number        rating in the favorite mode
  bestRating      number        peak rating in the favorite mode

  joinedYear      number        4-digit year, e.g. 2026
  followers       number        follower count

  avatar          string|null   avatar image URL, null if none
```

GameMode is always one of

bullet

blitz

rapid

daily

Always lowercase.

Never store icons or emoji in the model.

Icons are chosen in the scene,

not in the data.

---

# Field Definitions

These definitions are fixed.

Do not reinterpret them per scene.

## gamesPlayed

Total number of games counted in the recap.

Sum of

win + loss + draw.

In Stage A,

this is summed across all modes (lifetime).

In Stage B,

this is counted from the target year's archives.

## winRate

A whole number from 0 to 100.

Formula

```
winRate = round( wins / (wins + losses + draws) * 100 )
```

Draws are included in the denominator.

A draw is not a win.

Store the rounded number.

Do not store a fraction.

The scene displays it as

57%.

## favoriteMode

The mode with the most games played.

Compare

win + loss + draw

for each mode.

The mode with the highest total wins.

If two modes tie,

prefer the one with the higher currentRating.

## currentRating

The current rating in the favorite mode only.

Never mix modes.

Rapid 737 and Blitz 295 must never be averaged or combined.

## bestRating

The peak rating in the favorite mode only.

Same mode as currentRating.

If bestRating equals currentRating,

the poster and Scene 4 simply skip the peak highlight.

## joinedYear

The 4-digit year the player joined.

Derived from the joined timestamp.

## followers

The follower count from the profile.

This is a lifetime value.

It is the same in Stage A and Stage B.

---

# API Mapping — Stage A

Stage A uses two endpoints.

## /pub/player/{username}

```
username    ← username
followers   ← followers
joinedYear  ← year of (joined as Unix seconds)
avatar      ← avatar (null if absent)
```

joined is a Unix timestamp in seconds.

Convert to a Date, then take the year.

## /pub/player/{username}/stats

The stats object has one section per mode.

```
chess_bullet
chess_blitz
chess_rapid
chess_daily
```

Each section that exists contains

```
last.rating     current rating
best.rating     peak rating
record.win      wins
record.loss     losses
record.draw     draws
```

Mapping into the model

```
per mode total   = record.win + record.loss + record.draw
favoriteMode     = mode with the largest total
currentRating    = chess_{favoriteMode}.last.rating
bestRating       = chess_{favoriteMode}.best.rating
gamesPlayed      = sum of totals across all present modes
winRate          = round( sumWins / (sumWins + sumLosses + sumDraws) * 100 )
```

---

# Missing & Edge Cases

The API is not uniform.

Handle these explicitly.

## A mode key may be absent

If a player has never played a mode,

that key does not exist in stats.

Example

A player with no bullet games has no chess_bullet key.

Never assume a mode exists.

Skip absent modes when summing and when choosing the favorite.

## record may carry extra fields

The daily record can include

time_per_move

timeout_percent.

Ignore them.

Only win, loss, draw are used.

## A player with no games at all

If no rated modes exist,

there is no Wrapped to show.

Show the gentle empty-state message.

See SCENES.md.

## Stage B only — discard heavy fields

When archives are used,

keep only

result

time_class

rating.

Discard pgn and other large fields immediately.

See SCENES.md.

---

# Worked Example

Real data for

riku_jp.

From /stats

```
rapid   record 205 / 179 / 3   total 387   last 737   best 870
blitz   record  53 /  58 / 1   total 112   last 295   best 480
bullet  record   3 /   9 / 0   total  12   last 462   best 881
daily   record   8 /  10 / 0   total  18   last 895   best 951
```

Computed model

```
favoriteMode   = rapid      (387 is the largest total)
currentRating  = 737        (rapid last)
bestRating     = 870        (rapid best)
gamesPlayed    = 529        (387 + 112 + 12 + 18)
winRate        = 51         (269 wins / 529 total → 50.8 → 51)
```

From /player

```
joinedYear     = 2026
followers      = 25
```

Note

In Stage A these are lifetime totals.

For riku_jp,

whose whole history is 2026,

lifetime equals the year,

so the recap is already accurate.

---

# Final Principle

There is exactly one model.

Every scene trusts it completely.

If a value is hard to compute,

compute it once in the data layer,

never inside a scene.
