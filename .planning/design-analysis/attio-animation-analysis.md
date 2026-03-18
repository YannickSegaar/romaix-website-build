# Attio Workflow Animation Analysis - Extracted Configurations

**Analyzed:** 2026-01-31
**Source:** https://attio.com/platform/workflows

---

## Summary

Attio's workflow animation uses a **three-layer SVG approach** with CSS-animated gradient strokes to create the "traveling dot" effect. They use the **Web Animations API** (22 concurrent animations detected) rather than SMIL animations or JavaScript animation libraries.

---

## Animation Architecture

### Three-Layer Edge Design

Each edge connection consists of **three overlapping paths**:

```
Layer 1: Base stroke (gray)     - #D1D3D6, stroke-width: 1
Layer 2: Active stroke (green)  - #0FC27B, stroke-width: 1, starts opacity: 0
Layer 3: Gradient pulse stroke  - url(#puls-N), stroke-width: 1.5
```

### Example SVG Structure (Extracted)

```svg
<svg class="-translate-x-1/2 -translate-y-[11px]" xmlns="http://www.w3.org/2000/svg"
     width="12" height="70" fill="none" viewBox="0 0 12 70">

  <!-- Layer 1: Base path (always visible, gray) -->
  <path stroke="#D1D3D6" stroke-linecap="round" stroke-linejoin="round"
        stroke-width="1" d="m1 64 5 5 5-5M6 1v67"/>

  <!-- Layer 2: Active path (green, fades in during animation) -->
  <path stroke="#0FC27B" stroke-linecap="round" stroke-linejoin="round"
        stroke-width="1" d="m1 64 5 5 5-5M6 1v67" opacity="1"/>

  <!-- Layer 3: Animated gradient pulse (creates traveling dot) -->
  <path stroke="url(#puls-1)" stroke-linecap="round"
        stroke-width="1.5" d="m1 64 5 5 5-5M6 1v67"/>

  <defs>
    <linearGradient id="puls-1" gradientUnits="userSpaceOnUse"
                    x1="-180" x2="-60" y1="-45" y2="-90">
      <stop stop-color="#0FC27B" stop-opacity="0"/>
      <stop stop-color="#0FC27B"/>
      <stop offset="1" stop-color="#0FC27B" stop-opacity="0"/>
    </linearGradient>
  </defs>
</svg>
```

---

## Color Palette

### Primary Animation Colors

| Purpose | Hex | RGB |
|---------|-----|-----|
| **Pulse/Active** | `#0FC27B` | rgb(15, 194, 123) |
| **Alternative Green** | `#0B935D` | rgb(11, 147, 93) |
| **Base Edge** | `#D1D3D6` | rgb(209, 211, 214) |
| **Inactive Gray** | `#5C5E63` | rgb(92, 94, 99) |

### UI Colors

| Purpose | Hex | RGB |
|---------|-----|-----|
| **Blue accent** | `#407FF2` | rgb(64, 127, 242) |
| **Blue light** | `#E5EEFF` | rgb(229, 238, 255) |
| **Blue border** | `#D6E5FF` | rgb(214, 229, 255) |
| **Completed badge bg** | `#DDF9E4` | rgb(221, 249, 228) |
| **Completed badge border** | `#C7F4D3` | rgb(199, 244, 211) |

---

## Animation Timing

### Duration

**`--duration: 2500ms`** (2.5 seconds per animation cycle)

### Keyframes

#### Connection Animation
```css
@keyframes connection {
  100% { opacity: 1; }
}
```

#### Running Status
```css
@keyframes running {
  0% { opacity: 0; top: 0px; }
  15%, 85% { opacity: 1; top: -28px; }
  100% { opacity: 0; top: 0px; }
}
```

#### Completed Status
```css
@keyframes completed {
  0%, 85% { opacity: 0; top: 0px; }
  100% { opacity: 1; top: -28px; }
}
```

#### Rotate (for gradient angle)
```css
@keyframes rotate {
  0% { --workflows-card-gradient-angle: 0deg; }
  18% { --workflows-card-gradient-angle: 76deg; }
  27% { --workflows-card-gradient-angle: 104deg; }
  63% { --workflows-card-gradient-angle: 256deg; }
  72% { --workflows-card-gradient-angle: 284deg; }
  100% { --workflows-card-gradient-angle: 360deg; }
}
```

### CSS Classes

```css
.workflows-hero-card .workflows-hero-card-connection,
.workflows-hero-card .workflows-hero-card-running,
.workflows-hero-card .workflows-hero-card-completed {
  animation-fill-mode: forwards;
  animation-duration: var(--duration);
  animation-timing-function: ease-in-out;
}

.workflows-hero-card {
  background-image: conic-gradient(#0fc27b var(--workflows-card-gradient-angle), transparent 0);
  animation-name: rotate;
  animation-fill-mode: forwards;
  animation-duration: var(--duration);
  animation-timing-function: linear;
}

.workflows-hero-card .workflows-hero-card-connection {
  animation-name: connection;
}

.workflows-hero-card .workflows-hero-card-running {
  animation-name: running;
}

.workflows-hero-card .workflows-hero-card-completed {
  animation-name: completed;
}
```

---

## Gradient Animation (The "Traveling Dot")

The "traveling dot" effect is created by **animating the gradient coordinates** using the Web Animations API (not CSS animations).

### Gradient Structure

```svg
<linearGradient id="puls-1" gradientUnits="userSpaceOnUse"
                x1="-180" x2="-60" y1="-45" y2="-90">
  <stop stop-color="#0FC27B" stop-opacity="0"/>     <!-- Transparent -->
  <stop stop-color="#0FC27B"/>                       <!-- Full opacity -->
  <stop offset="1" stop-color="#0FC27B" stop-opacity="0"/>  <!-- Transparent -->
</linearGradient>
```

### Animation Approach

The gradient coordinates (x1, y1, x2, y2) are animated using JavaScript's Web Animations API to move the gradient along the path, creating the traveling dot effect.

For a path of total length L:
- Animate from: `x1=-L, x2=0`
- Animate to: `x1=0, x2=L`
- The middle "opaque" section of the gradient creates the dot appearance

---

## Node/Card Handles

### Handle Circle Design

```svg
<circle cx="6" cy="6" r="4.8" fill="#fff" stroke-width="1"
        class="stroke-blue-500"/>
<circle cx="6" cy="6" r="4.8" fill="#fff" stroke-width="1"
        class="workflows-hero-card-connection stroke-green-500 opacity-0"/>
```

- **Size:** 12x12px container, 4.8px radius circle
- **Default:** White fill with blue (#407FF2) stroke
- **Active:** Green (#0FC27B) stroke, fades in with connection animation

---

## Path Shapes

### Vertical Edge (Simple)
```
d="m1 64 5 5 5-5M6 1v67"
```
- Arrow pointing down
- Vertical line

### Curved Edge (L-shaped with rounded corners)
```
d="M198 1v43.5c0 11-9 20-20 20H26c-11 0-20 9-20 20V128"
```
- Starts vertical
- 20px radius curve
- Horizontal segment
- 20px radius curve
- Ends vertical

### Arrow Head
```
d="m1 124 5 5 5-5"
```
- Simple chevron/arrow pointing in direction of flow

---

## Status Badges

### Running Badge
```html
<div class="workflows-hero-card-running absolute right-0 flex items-center gap-x-1
            rounded-lg border border-subtle-stroke bg-surface-subtle
            px-[5px] py-px opacity-0">
  <svg class="animate-spin"><!-- spinner --></svg>
  <span class="text-tertiary-foreground text-xs">Running</span>
</div>
```

### Completed Badge
```html
<div class="workflows-hero-card-completed absolute right-0 flex items-center gap-x-1
            rounded-lg border border-[#C7F4D3] bg-[#DDF9E4]
            px-[5px] py-px opacity-0">
  <svg><!-- checkmark --></svg>
  <span class="text-[#0B935D] text-xs">Completed</span>
</div>
```

---

## Implementation Recommendations

### For Our React Flow Implementation

1. **Edge Component Structure:**
   - Create three `<path>` elements per edge
   - Base path with gray stroke
   - Active path with green stroke (animated opacity)
   - Gradient path for traveling dot

2. **Gradient Animation:**
   - Use SVG `<linearGradient>` with gradientUnits="userSpaceOnUse"
   - Animate gradient position with Framer Motion or Web Animations API
   - Gradient should be 3-stop: transparent → opaque → transparent

3. **Timing:**
   - Total cycle: 2500ms
   - Use `ease-in-out` for most transitions
   - Stagger animations between sequential nodes

4. **Handle Animation:**
   - Animate stroke color from blue to green
   - Sync with edge "completion"

5. **Status Indicators:**
   - Position absolutely relative to card
   - Use `animation-fill-mode: forwards` to persist end state
   - Running: appears at 15%, fades at 85%
   - Completed: appears at 85%, persists to 100%

---

## Files Generated

- `/tmp/attio-analysis/01-initial-state.png` - Full page screenshot
- `/tmp/attio-analysis/workflow-section-focused.png` - Workflow section screenshot
- `/tmp/attio-analysis/frame-02.png` through `frame-06.png` - Animation frames
- `/tmp/attio-analysis/full-analysis.json` - Complete extraction data
- `/tmp/attio-analysis/page-source.html` - Full page HTML

---

## Key Takeaways

1. **No SMIL or CSS `@keyframes` for the actual dot animation** - They use Web Animations API to animate SVG gradient coordinates
2. **Simple color scheme** - Just two main colors: gray (#D1D3D6) and green (#0FC27B)
3. **2.5s animation cycle** - Not too fast, not too slow
4. **Three-layer approach** - Clean separation of base, active, and animated states
5. **Progressive reveal** - Connection opacity, running status, completed status all animate separately
6. **Rounded path curves** - 20px radius for smooth bezier-like curves
7. **Web Animations API detected** - 22 concurrent animations running on the page
