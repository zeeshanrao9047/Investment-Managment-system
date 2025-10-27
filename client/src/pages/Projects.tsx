import Sidebar from "@/components/layout/Sidebar";
import ProjectsList from "@/components/projects/ProjectsList";
import React from "react";

export default function Projects() {
  return (
    <>
      <div className="block md:flex">
        <Sidebar />
        <div className="w-full overflow-x-auto">
          <ProjectsList />
        </div>
      </div>
    </>
  );
}
