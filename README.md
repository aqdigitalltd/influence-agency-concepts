# Influence agency — website concepts

Three landing-page directions for a new creator/influencer marketing business, built as plain HTML/CSS/JS for client review. See `PLAN.md` for the brief.

| Route | Concept |
| --- | --- |
| `/` | Concept picker |
| `/concept-1/` | 01 · Bold Creator |
| `/concept-2/` | 02 · Premium Minimal |
| `/concept-3/` | 03 · Social Native |

## Run locally

Any static server works, for example:

```sh
npx serve .
# or
python3 -m http.server 8000
```

## Notes

- "Alike" is a placeholder working name. Swap it in each `index.html` when the real name is confirmed.
- Imagery is Unsplash placeholder photography, hot-linked.
- Each concept is self-contained (`index.html`, `styles.css`, `main.js`) on purpose, so the chosen direction can be lifted into the Next.js build without untangling shared styles.
