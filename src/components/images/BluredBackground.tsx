import React from "react"
import Image, { StaticImageData } from "next/image"

const BluredBackground = async ({ src }: { src: StaticImageData }) => {
  return (
    <Image
      className="z-[-10]"
      fill
      src={src}
      alt="background"
      placeholder="blur"
      priority
      style={{
        objectFit: "cover",
      }}
    />
  )
}

export default BluredBackground
