"use client";
import React, { useEffect, useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import api from "@/lib/utils/api";

const Page = () => {
  const [data, setData] = useState<{ name: string; email: string }[]>([]);
  useEffect(() => {
    const getData = async () => {
      const { data, status } = await api.get("/");
      if (status != 200) {
        return;
      }

      setData(data);
    };

    getData();
  }, []);
  return (
    <div>
      {data.length > 0
        ? data.map((el, key) => (
            <div key={key}>
              <div>{el.name}</div>
              <div>{el.email}</div>
            </div>
          ))
        : null}
    </div>
  );
};

export default Page;
