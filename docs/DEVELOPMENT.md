# DEVELOPMENT.md

# Chess Wrapped — Development Guidelines

## Purpose

This document defines the engineering principles for Chess Wrapped.

The goal is to keep the implementation simple, maintainable, and consistent.

Every implementation decision should preserve the design philosophy.

---

# Tech Stack

Framework

* Next.js (App Router)

Language

* TypeScript

Styling

* Tailwind CSS

Animation

* Motion for React

Image Export

* html-to-image

Icons

* Lucide React (only if necessary)

Charts

* Build simple SVG components.
* Avoid heavy chart libraries unless absolutely necessary.

---

# Project Philosophy

This project values polish over complexity.

Prefer improving an existing experience rather than adding another feature.

Every new component should answer:

"Does this improve the experience?"

If not,

don't build it.

---

# Component Philosophy

Components should be:

* small
* reusable
* predictable

Prefer composition over large components.

Example

Good

Button

StatCard

SceneContainer

PosterCard

FavoriteMode

Bad

EverythingPage.tsx

---

# Folder Structure

Example

src/

components/

scenes/

hooks/

lib/

assets/

types/

utils/

Keep responsibilities separated.

---

# Scene Architecture

Each scene should be its own component.

Example

SceneWelcome

SceneGames

SceneFavoriteMode

SceneRating

SceneWinRate

SceneSummary

ScenePoster

Scenes should never contain unrelated logic.

---

# Data Flow

Fetch Chess.com data once.

Transform data into a simple internal model.

Scenes should receive already-prepared data.

Scenes should never know about API responses.

Example

Bad

Scene reads Chess.com response directly.

Good

Scene receives

gamesPlayed

favoriteMode

currentRating

winRate

joinedYear

---

# Swappable Data Source

Chess Wrapped fetches its numbers in two possible ways.

Stage A

/player and /player/{username}/stats

Fast.

Lightweight.

Lifetime totals.

This is the current implementation.

Stage B

Monthly archives for the target year.

/player/{username}/games/{YYYY}/{MM}

Accurate yearly totals.

Heavier, but bounded to one year.

This is a future upgrade.

Design the data layer so these two stages are interchangeable.

Both must return the same internal model.

Good

A single function returns the prepared model.

Scenes never change when the source changes.

Bad

Scenes branch on where the data came from.

When Stage B arrives,

only the data layer should change.

---

# Target Year

The Wrapped is yearly.

The target year is a single value.

Today it is fixed to 2026.

Never hard-code 2026 throughout the code.

Keep it as one constant,

so switching years later is a one-line change.

---

# Styling Rules

Prefer Tailwind utilities.

Avoid custom CSS unless absolutely necessary.

Never create styles that belong to only one page.

Reusable styles belong inside reusable components.

---

# Animation Rules

Use Motion for React.

Avoid custom animation logic whenever Motion can achieve the same result.

Keep animation logic close to components.

Do not duplicate animation code.

If two animations feel similar,

extract reusable variants.

---

# SVG Rules

Prefer SVG whenever possible.

Reasons

* crisp at every resolution
* lightweight
* easy to animate
* perfect for poster export

Custom chess pieces should remain SVG assets.

---

# Poster Generation

The poster is a first-class feature.

Always verify exported images.

Poster quality should remain sharp on:

* desktop
* mobile
* social media

Export should preserve:

* gradients
* shadows
* SVG quality
* rounded corners

Export is done with html-to-image (toPng) at 2x pixel ratio.

The avatar is a plain <img> with crossOrigin set,

so it does not taint the canvas during export.

---

# Sharing

Two ways to share from the poster.

Download

Saves the PNG (see Poster Generation).

Copy link

Copies a URL of the form /?u=username.

The home page reads ?u= on load and plays that player's Wrapped.

This keeps the single-page architecture — no routing required.

Note

This client-side approach means no per-user link previews (OGP).

Rich previews would need server-rendered pages per username

and dynamic OG images. That is a future enhancement,

not a requirement today.

---

# Performance

Keep the experience lightweight.

Avoid unnecessary libraries.

Avoid unnecessary re-renders.

Avoid expensive layout calculations.

Prefer CSS transforms over layout changes.

Prefer opacity and transform animations.

---

# Accessibility

Animations should never block interaction.

Text should remain readable.

Contrast should remain comfortable.

Avoid excessive motion.

Support reduced motion where possible.

---

# Error Handling

If a Chess.com username is invalid,

display a friendly message.

Do not expose raw API errors.

Always guide the user toward the next action.

---

# Code Style

Prefer readable code over clever code.

Avoid premature optimization.

Write code that another developer can understand quickly.

Small functions are better than long functions.

---

# Naming

Use descriptive names.

Good

PosterCard

FavoriteModeCard

GamesPlayedCard

Bad

Card2

InfoBox

Thing

---

# Future Features

Design today's implementation so future features can be added easily.

Examples

Rating History

Achievements

Openings

Monthly Wrapped

Link previews (per-user OGP via server-rendered pages)

Stage B yearly archives (see SCENES.md / DATA.md)

OAuth

Do not hard-code assumptions that prevent future expansion.

---

# What We Avoid

Do NOT add:

* unnecessary dependencies
* complex state management
* over-engineered abstractions
* dashboard widgets
* excessive configuration

Chess Wrapped should remain easy to understand.

---

# Pull Request Mindset

Every change should improve at least one of:

* clarity
* consistency
* delight
* maintainability

Avoid changes that only increase complexity.

---

# Before Shipping

Ask these questions:

✓ Is the code simpler?

✓ Is the UI calmer?

✓ Is the animation smoother?

✓ Is the experience more memorable?

✓ Would I proudly share this?

If any answer is "No",

keep refining.

---

# Final Principle

Chess Wrapped is a product people experience.

Not a codebase people inspect.

Always optimize for the player,

not the implementation.
