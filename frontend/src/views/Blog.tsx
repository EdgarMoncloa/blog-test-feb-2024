import styled from "styled-components";
import backgroundImg from "./../imgs/cubes-pattern.png";
import Card from "../components/Card";
import Search from "../components/Search";
import CustomButton from "../components/CustomButton.tsx";
import { useEffect, useReducer, useState } from "react";
import CardModal, { cardModalValues } from "../components/CardModal/index.tsx";
import { RiSignalWifiOffLine } from "react-icons/ri";
import textStyles from "../tokens/textStyle.ts";

type blogPosts = {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
};

enum blogPostsActionsTypes {
  ADD = "ADD",
  REMOVE = "REMOVE",
  DATA_READY = "DATA_READY",
}

type dataReadyAction = {
  type: blogPostsActionsTypes.DATA_READY;
  payload: Array<blogPosts>;
};
type addPostAction = {
  type: blogPostsActionsTypes.ADD;
  payload: blogPosts;
};
type removePostAction = {
  type: blogPostsActionsTypes.REMOVE;
  payload: number;
};
type blogPostActions = dataReadyAction | addPostAction | removePostAction;
function blogPostsReducer(state: Array<blogPosts>, action: blogPostActions) {
  const { type, payload } = action;

  switch (type) {
    case blogPostsActionsTypes.ADD:
      return [...state, payload];
    case blogPostsActionsTypes.REMOVE:
      return { ...state };
    case blogPostsActionsTypes.DATA_READY:
      return [...payload];
  }
}

export default function Blog() {
  const [isNewBlogItemModalOpen, setIsNewBlogItemModalOpen] =
    useState<boolean>(false);
  const [postsList, dispatchPostsLists] = useReducer(blogPostsReducer, []);
  const [searchVal, setSearchVal] = useState("");
  const [errorModalMessage, setErrorModalMessage] = useState<string | null>(
    null
  );
  const [isOnline, setIsOnline] = useState(true);

  window.addEventListener("online", () => {
    setIsOnline(true);
  });
  window.addEventListener("offline", () => {
    setIsOnline(false);
  });

  const handleAddBtnClick = () => {
    setIsNewBlogItemModalOpen(true);
  };

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        const list = await fetch("http://localhost:3000/feed-blogpost");
        const response = await list.json();
        const postsData = response.map((item: any) => {
          return {
            id: item.id,
            title: item.title,
            author: item.author,
            content: item.content,
            date: item.post_date,
          };
        });
        dispatchPostsLists({
          type: blogPostsActionsTypes.DATA_READY,
          payload: postsData,
        });
      } catch (error) {
        console.log(error);
      }
    };
    asyncFunction();
  }, []);
  useEffect(() => {
    setErrorModalMessage(null);
  }, [isNewBlogItemModalOpen]);

  const cardsComponentList = postsList.map((postData) => {
    if (
      String(postData.title).includes(searchVal) ||
      String(postData.author).includes(searchVal) ||
      String(postData.content).includes(searchVal)
    ) {
      return (
        <Card
          key={String(postData.id)}
          id={String(postData.id)}
          title={postData.title}
          author={postData.author}
          content={postData.content}
          date={postData.date}
        />
      );
    }
  });

  const handleModalCardAccept = async (values: cardModalValues) => {
    const data = {
      title: String(values.title),
      author: String(values.author),
      post_date: String(new Date().toLocaleDateString("en-GB")),
      content: String(values.content),
    };
    try {
      const response = await fetch("http://localhost:3000/feed-blogpost", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
      const jsonResponse = await response.json();
      if (response.status === 400) {
        throw new Error(jsonResponse.error);
      }
      dispatchPostsLists({
        type: blogPostsActionsTypes.ADD,
        payload: {
          id: jsonResponse.id,
          title: jsonResponse.title,
          author: jsonResponse.author,
          date: jsonResponse.post_date,
          content: jsonResponse.content,
        },
      });
      setIsNewBlogItemModalOpen(false);
    } catch (error) {
      setErrorModalMessage(String(error));
    }
  };

  return (
    <>
      <CardModal
        isOpen={isNewBlogItemModalOpen}
        isNew={true}
        setIsOpen={setIsNewBlogItemModalOpen}
        handleAccept={handleModalCardAccept}
        customTitle={errorModalMessage}
      />
      <MainView>
        <Content>
          <StyledH1>Blog posts</StyledH1>
          <MenuContainer>
            <Menu>
              <Search value={searchVal} setValue={setSearchVal} />
              {isOnline === true ? (
                <CustomButton
                  handleClick={handleAddBtnClick}
                  text="Nuevo post"
                />
              ) : (
                <OfflineElement>
                  <div>Sin conexión</div>
                  <RiSignalWifiOffLine />
                </OfflineElement>
              )}
            </Menu>
          </MenuContainer>
          <CardsContainer>
            <CardsList>{cardsComponentList}</CardsList>
          </CardsContainer>
        </Content>
      </MainView>
    </>
  );
}

const MainView = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  overflow: hidden;
  display: flex;
  background-color: var(--color-primary-800);
  background-image: url(${backgroundImg});
`;

const Content = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: 100%;
  grid-template-rows: 1fr 2fr 20fr;
  height: 95%;
  margin: auto;
  max-width: 580px;
  min-height: 720px;
  min-width: 480px;
  width: 50%;
`;

const StyledH1 = styled.h1`
  text-align: center;
  color: var(--color-neutral-50);
  margin: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const MenuContainer = styled.div`
  backdrop-filter: blur(4px);
  background: var(--background-gradient);
  border-radius: 8px;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const Menu = styled.div`
  width: 100%;
  height: auto;
  margin: 16px 32px;
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr 120px;
  grid-template-rows: 100%;
`;

const CardsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  backdrop-filter: blur(4px);
  background: var(--background-gradient);
  border-radius: 8px;
  overflow: hidden;
`;

const CardsList = styled.div`
  width: calc(100% - 64px);
  height: calc(100% - 64px);
  margin: auto;
  justify-content: center;
  display: grid;
  grid-template-columns: 100%;
  grid-auto-rows: 80px;
  overflow: auto;
  gap: 8px;

  overflow-x: hidden;
  /* width */
  &::-webkit-scrollbar {
    width: 12px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background-color: transparent;

    box-shadow: inset 0 0 10px 10px transparent;
    border: solid 3px transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;

    background: var(--color-primary-800);
    background-clip: padding-box;

    border: 4px solid transparent;
  }
`;

const OfflineElement = styled.div`
  ${textStyles.h6}
  text-align:center;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
