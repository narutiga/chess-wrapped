# SCENES.md

# Chess Wrapped — Scene Specification

## Overview

Chess Wrapped is designed as a short story.

It is not a collection of independent pages.

Each scene naturally flows into the next one.

Target duration:

25–30 seconds

Recommended scene duration:

3–5 seconds

The experience should feel effortless.

---

# Yearly Scope

Chess Wrapped is a yearly recap.

It celebrates a single year of the player's chess journey.

For now,

every Wrapped represents the year

2026.

The poster is titled

Chess Wrapped 2026.

This is shared by every player,

so the experience feels like a common moment,

the same way Spotify Wrapped does.

The target year is fixed today,

but the implementation should treat the year as a single value

that could change later.

Switching to another year should only mean changing a date range,

not rewriting scenes.

---

## When a Player Has No Games

Some players may have no games in the target year.

Never show an empty or broken Wrapped.

Instead,

display a gentle message.

Example

Hmm, no games yet in 2026.

We couldn't find any 2026 games for this player.

Play a few and come back!

Always offer a clear next action,

such as trying another username.

Never expose a raw API error.

---

# Story Flow

```
Welcome

↓

Games Played

↓

Favorite Game Mode

↓

Current Rating

↓

Win Rate

↓

Player Summary

↓

Final Poster
```

Each scene has only **one purpose**.

Avoid mixing multiple ideas into a single screen.

---

# Scene 1 — Welcome

## Goal

Introduce the experience.

Create curiosity.

The player should immediately understand that something special is about to begin.

---

## Display

Chess Wrapped

Username

Small pawn illustration

---

## Animation

Background fades in.

Title fades upward.

Username fades in.

Pawn performs one gentle bounce.

Wait briefly before continuing.

---

## Emotion

Curiosity.

---

# Scene 2 — Games Played

## Goal

Celebrate effort.

Not skill.

Simply recognize the amount of time the player spent playing chess.

---

## Display

You played

583

games.

---

## Animation

Number counts upward.

0

↓

583

At completion

small scale

1

↓

1.05

↓

1

Hold for one second.

---

## Emotion

Achievement.

---

# Scene 3 — Favorite Game Mode

## Goal

Help players recognize their identity.

This should become one of the most memorable scenes.

---

## Display

♟ Bullet

♞ Blitz

♝ Rapid

♜ Daily

---

## Initial State

Every row is gray.

No selection.

---

## Animation

Wait 300ms.

Highlight ONLY the favorite mode.

Example

✨ ♝ Rapid ✨

Effects

* icon becomes lavender
* text becomes lavender
* tiny scale animation
* 2–3 small gold sparkles
* sparkles disappear naturally

Sparkles are gold — the celebration accent (see BRAND.md / ANIMATION.md).

The same gold burst is used whenever a value lands

(Games Played, Current Rating, Win Rate).

Hold the completed state.

Then continue.

---

## Emotion

Recognition.

"This is how I like to play."

---

# Scene 4 — Current Rating

## Goal

Celebrate progress.

Not comparison.

---

## Display

Current Rating

1482

Best Rating

1520

---

## Animation

Current Rating counts upward.

After completion

Best Rating fades in.

No charts.

No graphs.

Keep the composition clean.

---

## Emotion

Pride.

---

# Scene 5 — Win Rate

## Goal

Provide one simple statistic.

Avoid analysis.

---

## Display

Win Rate

57%

Visual

Rounded progress bar

or

Circular progress ring.

---

## Animation

Bar fills smoothly.

Percentage counts upward.

Optional

Tiny sparkle at completion.

---

## Emotion

Reflection.

---

# Scene 6 — Player Summary

## Goal

Show the beginning of the journey.

---

## Display

Playing since

2025

Followers

28

---

## Animation

Cards appear one by one.

Small fade.

Small translateY.

Use stagger timing.

---

## Emotion

Perspective.

The journey has already begun.

---

# Scene 7 — Final Poster

## Goal

Deliver the reward.

This is the destination of the experience.

Every previous scene exists to make this moment meaningful.

---

## Display

* Avatar
* Username
* Current Rating (the hero — see POSTER.md)
* Peak Rating
* Games Played
* Favorite Game Mode
* Win Rate
* Joined Year

---

## Style

Do not create a profile card.

Create something collectible.

The poster should feel like

* a postcard
* a memory
* a yearly keepsake

Decorations

* tiny sparkles
* subtle chess silhouettes
* soft gradient
* minimal background texture

Keep everything elegant.

---

## Animation

Previous scene fades.

Poster appears.

Scale

0.95

↓

1

Everything settles.

Pause.

Download button appears.

---

## Emotion

Satisfaction.

"This is worth saving."

---

# Scene Timing

| Scene              | Duration |
| ------------------ | -------: |
| Welcome            |       3s |
| Games Played       |       4s |
| Favorite Game Mode |       4s |
| Current Rating     |       4s |
| Win Rate           |       3s |
| Player Summary     |       3s |
| Poster             |       6s |

Total

Approximately

27 seconds.

---

# Design Rules

Each scene should answer exactly one question.

Examples

Welcome

"What's happening?"

Games Played

"How much did I play?"

Favorite Mode

"What kind of player am I?"

Current Rating

"Where am I now?"

Win Rate

"How did I perform?"

Player Summary

"When did my journey begin?"

Poster

"What do I want to remember?"

Never answer multiple questions in one screen.

---

# Data Rules

Only use data available from the Chess.com Public API.

Do not require OAuth.

The experience should remain lightweight and fast.

---

## Two Data Stages

Chess Wrapped grows in two stages.

The scenes never change.

Only the source of the numbers changes.

### Stage A — Profile Stats (current)

Use only

/player/{username}

and

/player/{username}/stats

This is the fastest path.

It requires almost no data transfer.

Note

These stats are lifetime totals,

not yearly totals.

For players whose whole history is 2026,

lifetime and yearly are the same,

so the recap already feels correct.

### Stage B — Yearly Archives (future)

When accurate yearly numbers are needed,

fetch the monthly archives for the target year only

/player/{username}/games/{YYYY}/{MM}

Aggregate them into the same internal model the scenes already expect.

Fetching only the target year keeps the cost bounded,

even for very active players,

because only that year's months are requested.

When using archives

Keep only the fields the scenes need

result, time_class, rating.

Discard heavy fields such as pgn immediately.

---

## Stage Independence

Scenes must never know which stage produced the data.

Both stages must produce the same internal model.

Moving from Stage A to Stage B should change only the data layer,

never the scenes.

---

# Final Experience

After watching Chess Wrapped, the player should feel:

"I enjoyed revisiting my chess journey."

Not:

"I analyzed my chess statistics."

If a scene feels analytical rather than emotional,

simplify it until it feels like storytelling again.
