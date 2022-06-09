import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { bottomNavStatusState } from "../../recoil/BottomNav";
import { Link,Outlet } from 'react-router-dom'
import styled from 'styled-components'

export default function Home() {
  const setBottomNavStatus = useSetRecoilState(bottomNavStatusState);

  useEffect(() => {
    // 하단바 띄워주기
    setBottomNavStatus(true);

  },[]);

  return (
    <>
      <MainContainer>
        <Header>
        <Link to="">SLUV</Link>
		<Link to="../notice">알림</Link>
        </ Header>
        <TabContainer >
          <Link to="">맞춤</Link>
          <Link to="follow">팔로잉</Link>
          <Link to="question">질문</Link>
          <Link to="event">이벤트</Link>
        </TabContainer >
		<FeedContainer>
			<Outlet/>
		</FeedContainer>
		
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	padding: 1rem;
`

const Header = styled.div`
	display: flex;
	height: 60px;
	background-color: pink;
	justify-content: space-between;
	align-items: center;
`
const TabContainer = styled.div`
	display: flex;
	height: 50px;
	background-color: skyblue;
	justify-content: space-around;
	align-items: center;
`

const FeedContainer = styled.div`
	height: 100vh;
	border: 1px solid black;
	background-color: orange;
`