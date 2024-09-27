import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

const opengraphConfig: OpenGraph = {
  title: "Matēria: Powerful Kanban Task Management for Your Projects",
  description:
    "Organize and manage your projects effortlessly with our Kanban-based task management tool. Create, track, and prioritize tasks with ease to boost productivity and streamline your workflow.",
  type: "website",
  locale: "en_US",
  siteName: "Materia",
  images: [
    {
      url: "https://mateeria.ru/opengraph-image.png",
      width: 1200,
      height: 630,
      alt: "Matēria",
    },
  ],

  url: "mateeria.ru",
}

export default opengraphConfig
