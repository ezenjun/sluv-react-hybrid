import React, { useState } from 'react';
import styled from 'styled-components';

import { Chip } from '../../components/Chip/Chip';
import { ChipWrap } from '../../components/Chip/ChipWrap';

import { HorizontalLine } from '../../components/Lines/HorizontalLine';
import { VerticalLine } from '../../components/Lines/VerticalLine';
import { MainText } from '../../components/Texts/MainText';
import { SubText } from '../../components/Texts/SubText';

import { ReactComponent as Present } from '../../assets/Icons/Present.svg';
export default function Question() {
	return (
		<>
			<NoQuestion>
				<Present style={{ width: '3.75rem', height: '3.75rem' }}></Present>
				<SubText></SubText>
				<SubText color="#262626" fontsize="1rem" margin="1rem 0 0.5rem 0">
					아직 올라온 질문이 없어요
				</SubText>
				<SubText color="#8d8d8d" fontweight="normal" fontsize="0.875rem">
					셀럽의 궁금한 아이템이 있다면
				</SubText>
				<SubText color="#8d8d8d" fontweight="normal" fontsize="0.875rem">
					스럽에 질문해 보세요!
				</SubText>
			</NoQuestion>
		</>
	);
}

const NoQuestion = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 25.625rem;
	text-align: center;
`;
const QuestionButton = styled.div``;
