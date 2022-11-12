import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';
import { ConfigProvider } from 'antd-mobile';
import koKR from 'antd-mobile/es/locales/ko-KR'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<RecoilRoot>
		<QueryClientProvider client={queryClient}>
			<ConfigProvider locale={koKR}>
				<App />
			</ConfigProvider>
		</QueryClientProvider>
	</RecoilRoot>
);

