import React, { useEffect } from "react";
import styled from 'styled-components'



export default function NickName() {
  

  useEffect(() => {
    // 하단바 띄워주기


	}, []);


	return (
		<Container>
			<Top>
				<H2>
					사용하실 닉네임을 <br /> 입력해주세요
				</H2>
				<Label>닉네임</Label>
				<Input placeholder="언제든지 수정가능해요"></Input>
			</Top>
			<ButtonContainer>
				<FinishButton>완료</FinishButton>
			</ButtonContainer>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: space-between;
`;

const Top = styled.div``;

const H2 = styled.h2`
	font-weight: bold;
	margin-bottom: 2.1875rem;
`;

const Label = styled.h4`
	font-weight: bolder;
	margin: 0.625rem 0;
`;

const Input = styled.input`
	height: 2.8125rem;
	width: 100%;
	border: none;
	background-color: transparent;
	border-bottom: 1px solid gray;
	font-size: 0.875rem;
	&:focus {
		outline: none;
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px;
`;

const FinishButton = styled.button`
	width: 20.9375rem;
	height: 3.125rem;
	color: white;
	font-weight: bold;
	border: none;
	border-radius: 4rem;
	background-color: #8e8e8e;
`;
