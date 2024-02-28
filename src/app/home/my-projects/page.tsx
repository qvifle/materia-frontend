import ProjectCard from "@/components/cards/ProjectCard";

const Page = () => {
  return (
    <div className="grid grid-cols-4  gap-4">
      <ProjectCard
        title="Economics website"
        iconUrl="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4b8.png"
        description="Website for Telegram Bot Hexcel. It's includes Design in Figma
        and Frontend on Next.js"
        createdAt="23 February"
      />
      <ProjectCard
        title="Hexcel"
        iconUrl="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4b8.png"
        description="Telegram Bot for creating Excel tables charged Head Hunter Api"
        createdAt="1 January"
      />
    </div>
  );
};

export default Page;
