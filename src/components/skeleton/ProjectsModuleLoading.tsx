import React from "react"
import Skeleton from "./Skeleton"

const ProjectsModuleLoading = () => {
  return (
    <div className="p-4">
      <h2 className="mb-2 w-full text-2xl font-bold">My projects</h2>

      <div className="mb-4 grid w-full grid-cols-1 grid-rows-1 gap-2 overflow-x-auto py-2 min-[420px]:grid-flow-row min-[420px]:grid-cols-2 md:grid-flow-row md:grid-cols-4 md:grid-rows-none xl:grid-cols-5">
        {Array.from(Array(5).keys()).map((index, key: number) => (
          <Skeleton key={key} width="100%" className="rounded-lg">
            <div className="h-[200px] w-[calc(100vw-32px)] min-[420px]:w-full"></div>
          </Skeleton>
        ))}
      </div>

      <h2 className="mb-2 w-full text-2xl font-bold">Collaborates</h2>

      <div className="grid w-full grid-cols-1 grid-rows-1 gap-2 overflow-x-auto py-2 min-[420px]:grid-flow-row min-[420px]:grid-cols-2 md:grid-flow-row md:grid-cols-4 md:grid-rows-none xl:grid-cols-5">
        {Array.from(Array(4).keys()).map((index, key: number) => (
          <Skeleton key={key} width="100%" className="rounded-lg">
            <div className="h-[200px] w-[calc(100vw-32px)] min-[420px]:w-full"></div>
          </Skeleton>
        ))}
      </div>
    </div>
  )
}

export default ProjectsModuleLoading
