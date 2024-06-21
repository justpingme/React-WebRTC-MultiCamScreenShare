import { List, ListItem, Avatar } from "@chakra-ui/react";
import React from "react";
import { Member } from "../../../members/types";
import { useMember } from "../../../members/MemberServiceContext";

export const PeoplePanel = () => {
  const { members } = useMember();
  return (
    <List spacing={2} p={6}>
      {members.map((member: Member) => (
        <ListItem
          key={member.memberId}
          display="flex"
          alignItems="center"
          color="white"
        >
          <Avatar
            name={member.name ?? "waiting for name..."}
            mr={2}
            size="sm"
          />

          {member.name}
        </ListItem>
      ))}
    </List>
  );
};
