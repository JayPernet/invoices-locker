# Admin Dashboard Components Plan

Since `Input` and `Button` were previously implemented as raw HTML/Tailwind in `UnlockVault.jsx`, we need to standardize them for the Admin Dashboard to ensure consistency.

## Missing Atomic Components (To Be Created)
- **`src/components/ui/Input.jsx`**: Standard input with "Cyber-Precision" borders and focus states.
- **`src/components/ui/Button.jsx`**: Reusable button with variants (Primary/Emerald, Ghost, Destructive).
- **`src/components/ui/Label.jsx`**: Standard label with `clash-display` font.
- **`src/components/ui/TextArea.jsx`**: For the JSON content sections.

## Admin-Specific Components
- **`src/features/admin/components/AdminLayout.jsx`**: Sidebar/Header layout.
- **`src/features/admin/components/LoginForm.jsx`**: Supabase Auth UI.
- **`src/features/admin/components/ProposalForm.jsx`**: Main "Factory" form.

## Refinement (Claudio)
- Integrate these new components back into `UnlockVault.jsx` later to reduce technical debt (optional, keep KISS for now if working).
