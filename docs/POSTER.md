# POSTER.md

# Chess Wrapped — Poster Design Specification

## Purpose

The poster is the destination of the entire experience.

Every previous scene exists to make this final screen meaningful.

The poster is not a report.

It is not a profile card.

It is a memory.

Players should immediately want to save it and share it.

---

# Design Goal

The poster should feel like:

* a keepsake
* a postcard
* a collectible
* a memory from this moment in the player's chess journey

If someone sees the poster on social media,

they should immediately recognize it as Chess Wrapped.

---

# Information Hierarchy

The eye should naturally move in this order:

1. Chess Wrapped
2. Avatar
3. Username
4. Current Rating
5. Favorite Game Mode
6. Peak Rating
7. Games Played
8. Win Rate
9. Playing Since
10. Footer

Never compete for attention.

Every element should have a clear purpose.

---

# Layout

Keep the layout centered.

Use generous spacing.

Do not try to fill every empty area.

Whitespace makes the poster feel premium.

Cards should never touch the edges.

---

# Background

The background should create atmosphere.

Use:

* soft lavender gradient
* extremely subtle lighting
* faint chess silhouettes
* tiny stars
* tiny sparkles

Optional:

Very faint chessboard texture

Opacity:

2–3%

Decorations should never become the main focus.

---

# Title

The title should feel special.

Display

♟ Chess Wrapped

Do not make it overly large.

Use strong typography hierarchy instead of excessive size.

The title should immediately communicate:

"This is a Wrapped experience."

---

# Username

Display directly below the title.

Keep it simple.

The username should personalize the poster.

---

# Hero Statistic

Current Rating is the hero statistic.

It is the player's "right now" — the number they identify with today.

Peak Rating still appears, but as a supporting stat.

The hero should receive the most visual emphasis.

It is rendered large, in gold, with generous space above and below.

Suggestions:

* the largest number on the poster
* gold, to set it apart from the white supporting stats
* a soft glow
* generous spacing so it stands alone

Do not use dramatic effects.

The hero statistic should feel important through layout, not decoration.

---

# Supporting Statistics

Current Rating

Games Played

Favorite Game Mode

Win Rate

Playing Since

All supporting statistics should feel equal.

Do not compete with the hero statistic.

Keep them visually balanced.

---

# Favorite Game Mode

Display:

♟ Bullet

♞ Blitz

♝ Rapid

♜ Daily

Only the favorite mode should be highlighted.

Example

✨ ♝ Rapid ✨

Decoration rules:

* Lavender text
* Lavender icon
* Two or three tiny sparkles

Sparkles disappear naturally.

Do not animate continuously.

---

# Cards

Cards should feel soft.

Use:

* large radius
* soft shadows
* subtle gradient

Avoid:

* hard borders
* heavy shadows

Cards should appear light.

---

# Decorative Elements

Decorations should reward careful observation.

Examples:

* tiny stars
* blurred circles
* faint chess silhouettes
* tiny sparkles

The player should discover these details naturally.

Never overwhelm the layout.

---

# Color

The poster inverts the calm light interface into a rich, deep keepsake.

Card background

Deep lavender gradient (the same purple used for statistics)

Text

White, at varying opacity for hierarchy

Hero number & sparkles

Gold

Favorite mode label

A quiet translucent pill on the dark card

The deep purple makes the white text and gold sparkles sing.

This is the one surface that is dark rather than cream —

it is meant to feel like a finished, framed piece.

Avoid introducing colors beyond purple, white, and gold.

Consistency strengthens the brand.

---

# Poster Animation

The poster should feel earned.

Transition

Previous scene fades

↓

Poster appears

↓

Scale

0.95

↓

1

↓

Everything settles

↓

Pause

↓

Download button appears

Nothing else should animate afterwards.

Allow users to enjoy the finished poster.

---

# Actions

Two actions appear after the poster animation completes.

## Download

The primary action.

Exports the poster as a PNG using html-to-image.

The exported image must match what is on screen:

gradient, gold, sparkles, avatar, rounded corners.

Always verify the exported file (see DEVELOPMENT.md).

## Copy link

The secondary action.

Copies a shareable URL of the form

/?u=username

Opening that link plays that player's Wrapped from the start.

Show brief "Copied!" feedback, then return.

Style it quieter than Download — it must not compete with it.

## Buttons

Should feel inviting.

Hover

* slightly brighter
* subtle lift

Click

* small scale

Do not over-animate.

## Sharing — Note

Link previews (OGP cards on X, Discord, etc.) are not yet supported,

because the username is read on the client.

Rich link previews would require server-rendered pages per username

(a future enhancement). For now, the image itself is the shareable artifact.

---

# Emotional Goal

The player should pause for a few seconds.

They should look around the poster.

They should smile.

Only then should they press

Download.

---

# Screenshot Test

Imagine this poster being posted on:

* X
* LinkedIn
* Discord
* Reddit

Without reading the caption,

people should immediately think:

"What is Chess Wrapped?"

That curiosity is part of the design.

---

# Simplicity Test

Before adding anything new, ask:

Does this improve the poster?

Or does it simply add more information?

If it only adds information,

remove it.

---

# Final Test

The poster should pass all of these questions.

✓ Would I save this?

✓ Would I post this?

✓ Does this feel memorable?

✓ Does this feel calm?

✓ Does it still feel like Chess Wrapped?

If any answer is "No",

keep refining.

Never stop at "good enough."

The poster is the heart of the product.
