import Card from "../components/Card";
import Search from "../components/Search";
import CustomButton from "../components/CustomButton.tsx";
import { useEffect, useReducer, useState } from "react";
import CardModal, { cardModalValues } from "../components/CardModal/index.tsx";
import { RiSignalWifiOffLine } from "react-icons/ri";
import {
  MainView,
  Content,
  StyledH1,
  MenuContainer,
  Menu,
  CardsContainer,
  CardsList,
  OfflineElement,
} from "./blogStyles.ts";

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
