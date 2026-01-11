# Spec Frontend High-Fidelity: Invoice Unlocker

**"Design is how it feels. And it feels like the future."**

## 1. Visual Foundation (The Obsidian Shield)
Following Beatriz's [design_system.json](file:///home/pernet/Documentos/StarIAup/Projetos/Invoice%20Unlocker/design_system.json), all surfaces must use the **Obsidian** palette with **Electric Emerald** as the functional highlighter.

### Global Effects
- **Grain Overlay:** A fixed div with a subtle noise texture (`4%` opacity) over the entire screen to add physical depth.
- **Scanlines:** Subtle `linear-gradient` overlay on the Background to simulate a high-tech monitoring screen.

---

## 2. Component Design: The Unlock Vault (`UnlockOverlay`)
This is the "First Impression". It must feel heavy, secure, and technologically advanced.

### Visual Architecture
- **Card (`GlassContainer`):**
  - **Background:** `rgba(13, 13, 15, 0.7)` with `backdrop-filter: blur(40px)`.
  - **Border:** `1px solid rgba(0, 255, 148, 0.1)` (Electric Emerald at low opacity).
  - **Inner Glow:** `box-shadow: inset 0 0 20px rgba(0, 255, 148, 0.05)`.
- **The Input (`PINField`):**
  - **Font:** `Satoshi Mono` / `Monospace`.
  - **Caret:** `#00FF94` (Blinking with a 0.5s intervals).
  - **Success State:** When the code is correct, the background of the input briefly flashes Electric Emerald at 30% opacity.

### Micro-Interactions (Framer Motion)
- **Entrance:** Card scales from `0.95` to `1.0` with `y: 40px` to `0`. Ease: `[0.2, 1, 0.3, 1]`.
- **Unlock Sequence:**
  1. **Validation Stage:** Button shows a technical loader (a spinning arc, not a standard circle).
  2. **Success Trigger:** The Overlay's blur increases from `40px` to `80px` while scaling the content by `1.2` and fading to `0`. 
  3. **Reveal:** The Proposal content behind starts blurred and "focuses" (blur `100px` -> `0`).

---

## 3. Component Design: The Modular Proposal (`ProposalTemplate`)
A series of high-impact sections that tell the story.

### Header (The Hook)
- **Client Name:** Monospace, all caps, tracking `0.3em`, `#00FF94`.
- **Main Heading:** `Clash Display` Semibold, tracking `-0.04em`.
- **Intro Paragraph:** `Satoshi`, leading `1.8`, MAX-WIDTH `640px`.

### Modular Content Blocks
- **Block: Technical Summary**
  - Card with no background, only a left border (`2px solid #00FF94`).
  - Staggered list items with phosphoric "nodes" (small square dots) as bullets.
- **Block: Investment Tiers**
  - Glass cards with `hover:emerald-glow`.
  - Large price displays in `Clash Display`.

---

## 4. CTA: The Execution Button
The "Accept Proposal" button is the most important element.
- **Style:** Flat Electric Emerald background.
- **Hover:** Intense outer glow using `filter: drop-shadow(0 0 15px rgba(0, 255, 148, 0.6))`.
- **Click:** Subtle scale down `0.98`.

---

## 5. Technical Constraints for Claudio
- **Responsive:** Use Beatriz's `clamp()` values for all typography.
- **Performance:** Hardware accelerate all transforms (`transform-translate-z(0)`).
- **Accessibility:** 
  - PIN Field must have ARIA label: "Código de acesso da proposta".
  - TAB order must be strictly managed for the Unlock modal.

---

*Assinado: Amanda - Lead UI/UX.*
