# COMPONENTS.md

# Chess Wrapped — Component Design System

## Purpose

This document defines reusable UI components.

Every screen should feel like it belongs to the same product.

Do not invent new visual styles for individual screens.

Consistency is more important than variety.

---

# General Rules

Every component should feel:

* Soft
* Calm
* Friendly
* Premium

Avoid making individual components visually dominant.

The experience should feel unified.

---

# Border Radius

Cards

32px

Buttons

16px

Inputs

16px

Badges

999px

Keep the radius consistent throughout the application.

---

# Spacing

Use generous spacing.

Preferred spacing scale:

8

16

24

32

48

64

Avoid arbitrary values.

Whitespace is part of the design.

---

# Shadows

Use only soft shadows.

Example philosophy

Large blur

Low opacity

Avoid:

* dark shadows
* hard edges
* multiple layered shadows

Shadows should create depth, not contrast.

---

# Cards

Cards are the foundation of the UI.

Every card should include:

* rounded corners
* soft shadow
* generous padding

Cards should never feel crowded.

Avoid borders whenever possible.

---

# Buttons

Buttons should feel inviting.

Primary Button

Lavender background

White text

Rounded corners

Soft shadow

Hover

* slight lift
* brighter background

Pressed

Scale

1

↓

0.97

↓

1

Never bounce.

---

# Secondary Buttons

Use only when necessary.

Outlined or light lavender background.

Never compete with the primary button.

---

# Inputs

Rounded

Comfortable padding

Clear placeholder

Focus

Lavender outline

Soft glow

Never use harsh borders.

---

# Statistics

Statistics should always follow the same structure.

Example

Label

↓

Value

↓

Optional description

The value should always receive the strongest emphasis.

---

# Typography

Hierarchy

Heading

↓

Statistic

↓

Label

↓

Caption

Avoid excessive font sizes.

Hierarchy should come from spacing and weight.

---

# Chess Piece Icons

Use the custom chess illustrations consistently.

Style

* White
* Rounded
* Minimal
* Soft lavender shadow

Never mix illustration styles.

Never replace with emoji unless explicitly intended.

---

# Sparkles

Sparkles are decorative accents.

Rules

Maximum

2–3

Small

Fast

Subtle

Never animate continuously.

Never cover important information.

Sparkles should reward attention.

---

# Favorite Game Mode

Inactive

Gray icon

Gray text

Selected

Lavender icon

Lavender text

Tiny scale animation

2–3 sparkles

No additional effects.

This scene should remain clean.

---

# Progress Components

Progress bars

Rounded

Lavender fill

Soft background

Animation

Left

↓

Right

Smooth fill

No gradients inside the bar.

---

# Number Components

All important numbers should animate consistently.

Always count upward.

Never replace values instantly.

Pause briefly after reaching the final value.

Allow users to appreciate the number.

---

# Poster Components

Poster cards should use exactly the same design language.

No special borders.

No extra decoration.

The poster should feel familiar.

Only the layout changes.

---

# Decorative Elements

Allowed

* stars
* sparkles
* blurred circles
* faint chess silhouettes

Not allowed

* confetti
* fireworks
* floating particles everywhere
* animated backgrounds that distract

Decorations support the experience.

They do not become the experience.

---

# Empty Space

Never feel obligated to fill empty areas.

Whitespace creates elegance.

A calm layout feels more premium.

---

# Consistency Test

Before creating a new component, ask:

Could an existing component be reused?

If yes,

reuse it.

If no,

make the new component match the existing design language.

---

# Final Principle

Every component should disappear into the experience.

Players should remember the story,

not the UI.

The best component is the one users never consciously notice.
