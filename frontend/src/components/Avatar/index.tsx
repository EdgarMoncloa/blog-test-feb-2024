import styled from "styled-components";

type avatarTypes = {
  seed: string;
};
export default function Avatar({ seed }: avatarTypes) {
  return (
    <AvatarContainer>
      <StyledAvatar
        avatarurl={`https://api.dicebear.com/7.x/bottts/svg/seed=${seed?.replace(
          " ",
          "_"
        )}`}
      />
    </AvatarContainer>
  );
}

export const AvatarContainer = styled.div`
  width: 80px;
  height: 80px;
  background: var(--color-primary-700);
  box-shadow: 4px 0px 4px 0px rgba(1, 17, 56, 0.4);
  display: flex;
`;

export const StyledAvatar = styled.div<{ avatarurl: string }>`
  width: 52px;
  height: 52px;
  border-radius: 50px;
  background-color: var(--color-secondary-400);
  background-image: url(${(p) => p.avatarurl});
  margin: auto;
`;
