import { collection, config, fields, singleton } from "@keystatic/core";

// All uploaded images land here (served from /public). Per-app screenshots and
// renders share one folder; give files descriptive names when uploading.
const IMAGE_STORE = {
  directory: "public/images/cms/products",
  publicPath: "/images/cms/products",
} as const;

// Storage mode is env-driven so local development keeps working with zero
// config: set NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO ("owner/repo") to switch the
// admin to GitHub mode (edits commit straight to the repo from the hosted
// /keystatic page); leave it unset to write to local files you commit yourself.
const githubRepo = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO as
  | `${string}/${string}`
  | undefined;

const storage = githubRepo
  ? ({ kind: "github", repo: githubRepo } as const)
  : ({ kind: "local" } as const);

// Keystatic runs in **local mode**: edits made in the admin UI (/keystatic)
// are written straight to files in this repo, which you then commit and push.
// No external account or API key is needed — the content travels with the Git
// history, which is exactly what we want when handing the project off.
export default config({
  storage,
  ui: {
    brand: { name: "SirLancelot CMS" },
  },
  singletons: {
    // The shared apps catalog that powers every product page's
    // "Other Apps by SirLancelot" carousel. Stored as a single JSON file at
    // `content/apps.json` (path has no trailing slash → one flat file).
    apps: singleton({
      label: "Apps catalog",
      path: "content/apps",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            name: fields.text({
              label: "Name",
              validation: { length: { min: 1 } },
            }),
            desc: fields.text({ label: "Description", multiline: true }),
            href: fields.text({
              label: "Page path",
              description: "Internal route, e.g. /holy-bible (leave blank if none)",
            }),
            icon: fields.text({
              label: "Icon path",
              description: "Path under /public, e.g. /images/holy-bible.svg",
            }),
            crossPromote: fields.checkbox({
              label: "Show in other apps' carousels",
              description: "Off for unreleased teasers like the Mystery App.",
              defaultValue: true,
            }),
          }),
          {
            label: "Apps",
            itemLabel: (props) => props.fields.name.value || "Untitled app",
          }
        ),
      },
    }),
  },
  collections: {
    // Per-app media. One entry per product page, keyed by a slug that must
    // match the page route (e.g. `holy-bible`). The Platform choice swaps the
    // relevant fields: Garmin apps get watch images, mobile apps get phone
    // screenshots. Every field is optional — the site falls back to its current
    // visuals until an image is uploaded.
    products: collection({
      label: "App media",
      path: "content/products/*",
      slugField: "app",
      format: { data: "json" },
      entryLayout: "form",
      schema: {
        app: fields.slug({
          name: {
            label: "App",
            description: "Must match the page route slug, e.g. holy-bible",
          },
        }),
        media: fields.conditional(
          fields.select({
            label: "Platform",
            description:
              "Garmin watch apps show watch images; mobile apps show phone screenshots.",
            options: [
              { label: "Garmin watch app", value: "garmin" },
              { label: "Mobile app", value: "mobile" },
            ],
            defaultValue: "garmin",
          }),
          {
            // Garmin apps: hero render, feature-card render, watch-strip shots.
            garmin: fields.object({
              heroImage: fields.image({
                label: "Hero image",
                description: "Watch render shown in the hero (top of the page).",
                ...IMAGE_STORE,
              }),
              featureImage: fields.image({
                label: "Features card image",
                description: "Watch render shown in the first feature card.",
                ...IMAGE_STORE,
              }),
              // Composited into the watch screens in the scrolling watch strip.
              // Use square/circular Garmin watch-screen captures. Cycled across
              // the watches in order; leave empty for plain watch outlines.
              watchStrip: fields.array(
                fields.image({ label: "Watch screenshot", ...IMAGE_STORE }),
                {
                  label: "Watch strip screenshots",
                  itemLabel: (props) => props.value?.filename ?? "Screenshot",
                }
              ),
            }),
            // Mobile apps: phone screenshots for the hero gallery.
            mobile: fields.object({
              mobileScreenshots: fields.array(
                fields.object({
                  image: fields.image({ label: "Screenshot", ...IMAGE_STORE }),
                  label: fields.text({
                    label: "Caption",
                    description: "Short label shown for accessibility / dots.",
                  }),
                }),
                {
                  label: "Mobile app screenshots",
                  itemLabel: (props) => props.fields.label.value || "Screenshot",
                }
              ),
            }),
          }
        ),
      },
    }),
  },
});
