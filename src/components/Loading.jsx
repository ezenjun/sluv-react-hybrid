import styled from "styled-components";
import loadingGIF  from '../assets/Gif/loading.gif';
import React from 'react'

export default function Loading() {
	return <LoadingDialog src={loadingGIF} />;
}

const LoadingDialog = styled.img`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 18.75rem;
	height: 40.625rem;
`;
