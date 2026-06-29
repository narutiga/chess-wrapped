# ANIMATION.md

# Chess Wrapped — Motion Guidelines

## Motion Philosophy

Motion exists to support storytelling.

It should never become the main attraction.

The user should remember the feeling,
not the animation itself.

Every movement should guide attention.

If users notice the animation more than the content,
the animation is probably too strong.

---

# Overall Feeling

The motion should feel:

* Calm
* Smooth
* Soft
* Delightful
* Premium

Never:

* Loud
* Flashy
* Fast
* Dramatic

Imagine the motion language of:

* Apple
* Spotify Wrapped
* GitHub Year in Review
* Linear

Not:

* Mobile games
* Slot machines
* PowerPoint
* Gaming UI

---

# General Rules

Animate only one focal element at a time.

Never animate every component simultaneously.

Use motion to guide the user's eyes.

Every scene should have one clear visual focus.

---

# Preferred Animations

Use these whenever possible:

* opacity
* translateY
* subtle scale
* staggered appearance
* count-up numbers
* gentle fade transition

These should represent about 90% of all animations.

---

# Avoid

Avoid using:

* rotation
* spinning
* excessive bouncing
* large zooms
* particle explosions
* fireworks
* shaking
* flashing

Small moments feel more premium than large effects.

---

# Timing

Recommended duration:

Small animations

150–250ms

Component entrance

300–500ms

Scene transition

500–800ms

Never create animations longer than one second unless absolutely necessary.

The experience should feel responsive.

---

# Easing

Prefer:

easeOut

or

easeInOut

Avoid exaggerated spring animations.

Use spring only for tiny emphasis animations.

---

# Scene Transitions

Every scene should smoothly transition into the next.

Avoid hard cuts.

Preferred transition:

Current scene fades slightly

↓

Moves upward by a few pixels

↓

Next scene fades in

↓

Moves upward naturally

The user should barely notice the transition.

---

# Numbers

Numbers are one of the most important animated elements.

Always count upward.

Never place values.

Example

0

↓

583

↓

1482

Keep the animation smooth.

Do not make numbers count too quickly.

The final value should remain visible long enough to appreciate.

---

# Sparkles

Sparkles are decorative.

Use them sparingly.

Maximum:

2–3 sparkles.

Sparkles should:

* appear quickly
* fade naturally
* never repeat continuously

Sparkles celebrate.

They do not entertain.

---

# Favorite Game Mode

This is one of the signature scenes.

Initial state

Every game mode is gray.

After a short pause,

only the favorite game mode becomes highlighted.

Example

♟ Bullet

♞ Blitz

✨ ♝ Rapid ✨

♜ Daily

Animation

The selected row:

* changes from gray to lavender
* scales slightly

1

↓

1.06

↓

1

Duration

200ms

Immediately afterwards,

create two or three tiny sparkles.

The sparkles disappear within 300ms.

Hold the completed state for approximately one second.

Then transition naturally to the next scene.

Do NOT animate every row.

Only celebrate the selected one.

---

# Shared Animation Language

Games Played

Current Rating

Win Rate

All should use the same animation language.

Consistency is more important than variety.

---

# Poster Transition

The final poster should feel earned.

Do not suddenly display it.

Instead:

Previous scene fades

↓

Poster appears slightly smaller

↓

Scale

0.95

↓

1

↓

Soft fade

↓

Everything settles

↓

Download button fades in

The animation should communicate:

"This is the final result."

---

# Hover Animations

Hover effects should be subtle.

Examples:

* slight lift
* brighter shadow
* slightly brighter background

Avoid dramatic movement.

---

# Click Animations

Buttons

Scale

1

↓

0.97

↓

1

Duration

150ms

Buttons should feel responsive.

Never bounce.

---

# Rhythm

The entire experience should have rhythm.

Think of breathing.

Fast.

Pause.

Fast.

Pause.

Allow users time to enjoy each scene.

Do not rush.

---

# Motion Consistency

Every animation should feel like it belongs to the same product.

Never invent new animations for individual scenes.

Consistency creates trust.

---

# Final Rule

Before adding any animation, ask:

"Does this help tell the story?"

If the answer is no,

remove it.

The best animation is often the simplest one.
