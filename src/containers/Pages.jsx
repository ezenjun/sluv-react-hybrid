import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Binder from '../pages/binder';
import FindEmail from '../pages/login/FindEmail';
import FindPassword from '../pages/login/FindPassword';
import Home from '../pages/home';
import LocalLogin from '../pages/login/LocalLogin';
import Login from '../pages/login';
import KakaoRedirectHandler from '../pages/login/KakaoRedirectHandler';
import My from '../pages/my';
import RequestCeleb from '../pages/request';
import Search from '../pages/search';
import SelectCeleb from '../pages/signup/SelectCeleb';
import SignUp from '../pages/signup';
import Custom from '../pages/home/Custom';
import Follow from '../pages/home/Follow';
import Question from '../pages/home/Question';
import Event from '../pages/home/Event';
import Notice from '../pages/notice';
import SearchResult from '../pages/search/SearchResult';
import AddBinder from '../pages/binder/AddBinder';
import UserProfile from '../pages/my/UserProfile';
import Setting from '../pages/my/Setting';
import FindEmailResult from '../pages/login/FindEmailResult';
import FindPasswordResult from '../pages/login/FindPasswordResult';
import CelebDetail from '../pages/celebdetail';
import RealtimeQuestion from '../pages/RealtimeQuestion';
import HotItem from '../pages/HotItem';
import UploadItem from '../pages/upload/UploadItem';
import UploadQuestion from '../pages/upload/UploadQuestion';
import BinderDetail from '../pages/binder/BinderDetail';

export default function Pages() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/auth/kakao-login" element={<KakaoRedirectHandler />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/select/celebrity" element={<SelectCeleb />} />
			<Route path="/request/celebrity" element={<RequestCeleb />} />
			<Route path="/login" element={<LocalLogin />} />
			<Route path="/find/email" element={<FindEmail />} />
			<Route path="/find/email/result" element={<FindEmailResult />} />
			<Route path="/find/password" element={<FindPassword />} />
			<Route path="/find/password/result" element={<FindPasswordResult />} />
			{/* 여기 결과페이지 어떻게 할지 고민 라우팅 나눌건지 아님 렌더링으로 처리할지 */}
			<Route path="/home" element={<Home />}>
				<Route path="" element={<Custom />} />
				<Route path="follow" element={<Follow />} />
				<Route path="question" element={<Question />} />
				<Route path="event" element={<Event />} />
			</Route>
			<Route path="/upload/item" element={<UploadItem />} />
			<Route path="/upload/question" element={<UploadQuestion />} />
			<Route path="/celeb/detail/:celebIdx" element={<CelebDetail />} />
			<Route path="/question/realtime" element={<RealtimeQuestion />} />
			<Route path="/hot" element={<HotItem />} />
			<Route path="/notice" element={<Notice />} />
			<Route path="/search" element={<Search />} />
			<Route path="/search/result" element={<SearchResult />} />

			<Route path="/binder" element={<Binder />} />
			<Route path="/binder/:idx" element={<BinderDetail />} />
			<Route path="/binder/add" element={<AddBinder />} />

			<Route path="/my" element={<My />} />
			<Route path="/profile/:idx" element={<UserProfile />} />
			<Route path="/setting" element={<Setting />} />
		</Routes>
	);
}
