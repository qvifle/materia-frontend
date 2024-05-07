import React from "react";
import deskService from "@/services/DeskService";
import { IDesk } from "@/types/desk.types";
import { useQuery } from "@tanstack/react-query";
import DeskCard from "../cards/DeskCard";

interface IDesksContainer {
  projectId: string;
}

const DesksContainer: React.FC<IDesksContainer> = ({ projectId }) => {
  const { data, isPending, isError } = useQuery<IDesk[]>({
    queryKey: ["desks"],
    queryFn: async () => {
      const { data } = await deskService.getDesks(projectId);
      return data;
    },
  });

  if (isPending) {
    return "Loading";
  }

  if (isError || !data.length) {
    return "Error";
  }

  return (
    <>
      {data.map((desk, index) => (
        <DeskCard key={index} desk={desk} />
      ))}
    </>
  );
};

export default DesksContainer;
