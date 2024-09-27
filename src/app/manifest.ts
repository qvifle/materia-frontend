import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Matēria",
    short_name: "Matēria",
    description:
      "Organize and manage your projects effortlessly with our Kanban-based task management tool. Create, track, and prioritize tasks with ease to boost productivity and streamline your workflow.",
    start_url: "/",
    display: "standalone",
    theme_color: "#111113",
    background_color: "#111113",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
