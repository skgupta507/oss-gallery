import prisma from "@/lib/prisma";
import { Suspense } from "react";
import ProjectGrid from "./project-grid";

export default function ProjectList() {
  return (
    <Suspense fallback={null}>
      <ProjectListRSC />
    </Suspense>
  );
}

async function ProjectListRSC() {
  const featured = ["gallery", "dub", "ui"];
  const [featuredProjects, projects] = await Promise.all([
    prisma.project.findMany({
      where: {
        slug: {
          in: featured,
        },
      },
    }),
    prisma.project.findMany({
      where: {
        verified: true,
      },
      orderBy: {
        stars: "desc",
      },
      take: 300,
    }),
  ]);

  return (
    <div className="mx-5 md:mx-0">
      <div className="grid gap-4">
        <h2 className="font-display text-2xl font-semibold">Featured</h2>
        <ProjectGrid projects={featuredProjects} />
      </div>

      <div className="mb-8 mt-12 border-t border-gray-200" />

      <div className="grid gap-4">
        <h2 className="font-display text-2xl">All Projects</h2>
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
