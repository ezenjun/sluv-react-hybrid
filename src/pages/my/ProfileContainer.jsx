import React from 'react'
import styled from 'styled-components';
import { GridImage } from '../../components/GridItems/GridImage';
import { GridItem } from '../../components/GridItems/GridItem';
import { GridItemWrap } from '../../components/GridItems/GridItemWrap';
import { ImageText } from '../../components/ImageText';
import { SubText } from '../../components/Texts/SubText';
import { ReactComponent as BinderWhite } from '../../assets/Icons/binderWhite.svg';

export default function ProfileContainer({uploadInfo}) {
	console.log(uploadInfo);
	return (
		<ProfileContainerWrap>
			{uploadInfo.uploadCnt > 0 && (
				<>
					<div style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#262626', marginBottom:'1rem' }}>
						<span>아이템</span>
						<span style={{ marginLeft: '0.25rem', color: '#9e30f4' }}>
							{uploadInfo.uploadCnt}
						</span>
					</div>
					<GridItemWrap>
						{uploadInfo.uploadItemList.length > 0 &&
							uploadInfo.uploadItemList.map(item => (
								<GridItem key={item.itemIdx}>
									<GridImage>
										<ImageText>
											<SubText
												fontsize="0.8125rem"
												fontweight="bold"
												color="white"
											>
												{item.name}'s
											</SubText>
											<BinderWhite
												style={{
													width: '1.375rem',
													height: '1.375rem',
												}}
											/>
										</ImageText>
									</GridImage>
									<SubText
										fontsize="1rem"
										fontweight="bold"
										margin="0 0 0.375rem 0 "
									>
										{item.brandKr}
									</SubText>
									<SubText
										style={{
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											width: '100%',
										}}
									>
										{item.itemName}
									</SubText>
								</GridItem>
							))}
					</GridItemWrap>
				</>
			)}
		</ProfileContainerWrap>
	);
};

const ProfileContainerWrap = styled.div`
	padding: 1.875rem 1.25rem 0 1.25rem;
`;
