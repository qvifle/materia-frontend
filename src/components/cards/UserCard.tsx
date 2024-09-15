import React, { ReactNode } from "react"
import { Avatar, Card, CardBody } from "@nextui-org/react"

interface UserCardProps {
  name: string
  email: string
  content: ReactNode
}

const UserCard: React.FC<UserCardProps> = ({ name, email, content }) => {
  return (
    <Card className="bg-default-100">
      <CardBody>
        <div className="grid w-full grid-cols-[40px,140px,1fr] grid-rows-1 items-center gap-2 sm:grid-cols-[40px,200px,1fr]">
          <Avatar name={name} />
          <div className="flex flex-col">
            <h4 className="leading text-base font-medium leading-[18px]">
              {name}
            </h4>
            <h5 className="text-sm text-default-800">{email}</h5>
          </div>
          {content}
        </div>
      </CardBody>
    </Card>
  )
}

export default UserCard
