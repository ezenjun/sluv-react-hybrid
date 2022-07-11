import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';
import { ConfigProvider } from 'antd-mobile';
import koKR from 'antd-mobile/es/locales/ko-KR'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<RecoilRoot>
		{/* <React.StrictMode> */}
		<ConfigProvider locale={koKR}>
			<App />
		</ConfigProvider>

		{/* </React.StrictMode> */}
	</RecoilRoot>
);

