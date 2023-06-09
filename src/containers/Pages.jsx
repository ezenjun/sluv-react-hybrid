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
import Settings from '../pages/my/settings/Settings';
import Privacy from '../pages/my/settings/Privacy';
import TermsOfUse from '../pages/my/settings/TermsOfUse';
import FindEmailResult from '../pages/login/FindEmailResult';
import FindPasswordResult from '../pages/login/FindPasswordResult';
import CelebDetail from '../pages/celebdetail';
import RealtimeQuestion from '../pages/RealtimeQuestion';
import HotItem from '../pages/HotItem';
import UploadItem from '../pages/upload/UploadItem';
import UploadQuestion from '../pages/upload/UploadQuestion';
import BinderDetail from '../pages/binder/BinderDetail';
import QuestionDetail from '../pages/QuestionDetail';
import ReportUser from '../pages/Report/ReportUser';
import ReportPost from '../pages/Report/ReportPost';
import ReportComment from '../pages/Report/ReportComment';
import Faq from '../pages/my/Faq';
import SupportNotices from '../pages/my/SupportNotices';
import SupportNoticeDetail from '../pages/my/SupportNoticeDetail';

import ItemDetail from '../pages/ItemDetail/ItemDetail';
import ViewedItems from '../pages/my/ViewedItems';
import MyUploadItems from '../pages/my/MyUploadItems';
import Followers from '../pages/my/Followers';
import Followings from '../pages/my/Followings';
import EditProfile from '../pages/my/settings/EditProfile';
import EditPassword from '../pages/my/settings/EditPassword';
import ResetPassword from '../pages/my/settings/ResetPassword';
import EventDetail from '../pages/EventDetail';
import EditBinder from '../pages/binder/EditBinder';

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

			<Route path="event/:eventIdx" element={<EventDetail />} />

			<Route path="/celeb/detail/:celebIdx" element={<CelebDetail />} />
			<Route path="/item/detail/:itemIdx" element={<ItemDetail />} />

			<Route path="/question/:idx" element={<QuestionDetail />} />
			<Route path="/question/realtime" element={<RealtimeQuestion />} />

			<Route path="/hot" element={<HotItem />} />
			<Route path="/notice" element={<Notice />} />
			<Route path="/search" element={<Search />} />
			<Route path="/search/result/:searchInput" element={<SearchResult />} />

			<Route path="/binder" element={<Binder />} />
			<Route path="/binder/:idx" element={<BinderDetail />} />
			<Route path="/binder/add" element={<AddBinder />} />
			<Route path="/binder/edit" element={<EditBinder />} />

			<Route path="/users/:idx" element={<My />} />
			<Route path="/users/viewed-items" element={<ViewedItems />} />
			<Route path="/users/upload-items" element={<MyUploadItems />} />
			<Route path="/users/:idx/followers" element={<Followers />} />
			<Route path="/users/:idx/followings" element={<Followings />} />
			<Route path="/settings" element={<Settings />} />
			<Route path="/settings/edit/profile" element={<EditProfile />} />
			<Route path="/settings/edit/password" element={<EditPassword />} />
			<Route path="/settings/reset/password/:jwt" element={<ResetPassword />} />
			<Route path="/settings/privacy" element={<Privacy />} />
			<Route path="/settings/terms-of-use" element={<TermsOfUse />} />
			<Route path="/faq" element={<Faq />} />
			<Route path="/support/notices" element={<SupportNotices />} />
			<Route path="/support/notices/page/:idx" element={<SupportNoticeDetail />} />

			<Route path="/report/user/:idx" element={<ReportUser />} />
			<Route path="/report/post/:idx" element={<ReportPost />} />
			<Route path="/report/comment/:idx" element={<ReportComment />} />
		</Routes>
	);
}
