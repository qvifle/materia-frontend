import { Metadata } from "next"
import appleWebAppConfig from "./appleWebApp"
import metadataKeywords from "./keywords"
import opengraphConfig from "./openGraph"

const metadata: Metadata = {
  title: {
    default: "Matēria: Powerful Kanban Task Management for Your Projects",
    template: "%s | Matēria: Powerful Kanban Task Management for Your Projects",
  },
  creator: "Kopytin Igor",
  authors: [{ name: "Kopytin Igor", url: "https://github.com/qvifle" }],
  keywords: metadataKeywords,
  description:
    "Organize and manage your projects effortlessly with our Kanban-based task management tool. Create, track, and prioritize tasks with ease to boost productivity and streamline your workflow.",
  metadataBase: new URL("http://mateeria.ru"),
  openGraph: opengraphConfig,
  appleWebApp: appleWebAppConfig,
}

export default metadata
