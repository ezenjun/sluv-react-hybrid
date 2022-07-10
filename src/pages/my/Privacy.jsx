import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { BackButton } from '../../components/Buttons/BackButton';
import { ContentWrap } from '../../components/containers/ContentWrap';
import { MainContainer } from '../../components/containers/MainContainer'
import { TopNav } from '../../components/containers/TopNav';
import { MainText } from '../../components/Texts/MainText';
import { BottomNavState } from '../../recoil/BottomNav';
import { ContentParagraphWrap } from './TermsOfUse';

export default function Privacy() {
	const navigate = useNavigate();

	const setBottomNavStatus = useSetRecoilState(BottomNavState);

	useEffect(() => {
		setBottomNavStatus(false);
	},[])

	return (
		<MainContainer>
			<TopNav>
				<BackButton onClick={() => navigate(-1)} />
				<MainText style={{ fontSize: '1.125rem' }} className="centerText">
					개인정보 처리방침
				</MainText>
			</TopNav>

			<ContentWrap padding="1rem 1.25rem 1rem 1.25rem">
				<MainText style={{ fontSize: '1rem' }}>스럽 개인정보 처리방침</MainText>

				<ContentParagraphWrap>
					<p>
						&lt;스럽 - 좋아하는 셀럽의 아이템 정보를 공유하는 커뮤니티 서비스(이하
						스럽)&gt;은(는) 「개인정보 보호법」 제30조에 따라 정부주체의 개인정보를
						보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여
						다음과 같이 개인정보 처리방침을 수립&middot;공개합니다.
					</p>
					<p>○ 이 개인정보처리방침은 2022년 7월 23일 부터 적용됩니다.</p>
					<p>&nbsp;</p>
					<p>제1조(개인정보의 처리 목적)</p>
					<p>
						&lt;스럽 - 좋아하는 셀럽의 아이템 정보를 공유하는 커뮤니티 서비스(이하
						스럽)&gt;은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
						개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는
						경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한
						조치를 이행할 예정입니다.
					</p>
					<p>
						1. 홈페이지 회원가입 및 관리
						<br />
						회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별&middot;인증,
						회원자격 유지&middot;관리, 서비스 부정이용 방지 목적으로 개인정보를
						처리합니다.
						<br />
						<br />
						2. 재화 또는 서비스 제공
						<br />
						서비스 제공, 콘텐츠 제공, 맞춤서비스 제공을 목적으로 개인정보를 처리합니다.
						<br />
						<br />
						3. 마케팅 및 광고에의 활용
						<br />
						신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및
						참여기회 제공 , 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을
						목적으로 개인정보를 처리합니다.
						<br />
						<br />
					</p>
					<p>&nbsp;</p>
					<p>제2조(개인정보의 처리 및 보유 기간)</p>
					<p>
						① &lt;스럽 - 좋아하는 셀럽의 아이템 정보를 공유하는 커뮤니티 서비스(이하
						스럽)&gt;은(는) 법령에 따른 개인정보 보유&middot;이용기간 또는
						정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유&middot;이용기간
						내에서 개인정보를 처리&middot;보유합니다.
					</p>
					<p>&nbsp;</p>
					<p>② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
					<p>1.&lt;홈페이지 회원가입 및 관리&gt;</p>
					<p>
						&lt;홈페이지 회원가입 및 관리&gt;와 관련한 개인정보는 수집.이용에 관한
						동의일로부터&lt;3년&gt;까지 위 이용목적을 위하여 보유.이용됩니다.
					</p>
					<p>보유근거 : 회원가입 시 필수 유저 정보, 앱 사용 기록 보유</p>
					<p>&nbsp;</p>
					<p>2.&lt;홈페이지 회원가입 및 관리&gt;</p>
					<p>
						&lt;홈페이지 회원가입 및 관리&gt;와 관련한 개인정보는 수집.이용에 관한
						동의일로부터&lt;6개월&gt;까지 위 이용목적을 위하여 보유.이용됩니다.
					</p>
					<p>보유근거 : 전자상거래 등에서의 소비자보호에 관한 법률</p>
					<p>관련법령 : 표시/광고에 관한 기록 : 6개월</p>
					<p>&nbsp;</p>
					<p>3.&lt;홈페이지 회원가입 및 관리&gt;</p>
					<p>
						&lt;홈페이지 회원가입 및 관리&gt;와 관련한 개인정보는 수집.이용에 관한
						동의일로부터&lt;3년&gt;까지 위 이용목적을 위하여 보유.이용됩니다.
					</p>
					<p>보유근거 : 전자상거래 등에서의 소비자보호에 관한 법률</p>
					<p>관련법령 : 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년</p>
					<p>&nbsp;</p>
					<p>4.&lt;홈페이지 회원가입 및 관리&gt;</p>
					<p>
						&lt;홈페이지 회원가입 및 관리&gt;와 관련한 개인정보는 수집.이용에 관한
						동의일로부터&lt;5년&gt;까지 위 이용목적을 위하여 보유.이용됩니다.
					</p>
					<p>보유근거 : 전자상거래 등에서의 소비자보호에 관한 법률</p>
					<p>관련법령 : 계약 또는 청약철회 등에 관한 기록 : 5년</p>
					<p>&nbsp;</p>
					<p>5.&lt;홈페이지 회원가입 및 관리&gt;</p>
					<p>
						&lt;홈페이지 회원가입 및 관리&gt;와 관련한 개인정보는 수집.이용에 관한
						동의일로부터&lt;5년&gt;까지 위 이용목적을 위하여 보유.이용됩니다.
					</p>
					<p>보유근거 : 전자상거래 등에서의 소비자보호에 관한 법률</p>
					<p>관련법령 : 대금결제 및 재화 등의 공급에 관한 기록 : 5년</p>
					<p>&nbsp;</p>
					<p>제3조(개인정보의 제3자 제공)</p>
					<p>
						① &lt;스럽 - 좋아하는 셀럽의 아이템 정보를 공유하는 커뮤니티 서비스(이하
						스럽)&gt;은(는) 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위
						내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보
						보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게
						제공합니다.
					</p>
					<p>
						② &lt;스럽 - 좋아하는 셀럽의 아이템 정보를 공유하는 커뮤니티 서비스(이하
						스럽)&gt;은(는) 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.
					</p>
					<p>1. &lt;현재 해당 사항 없음&gt;</p>
					<p>개인정보를 제공받는 자 : 현재 해당 사항 없음</p>
					<p>제공받는 자의 개인정보 이용목적 :</p>
					<p>제공받는 자의 보유.이용기간:</p>
					<p>
						<br />
						<br />
					</p>
					<p>제4조(개인정보처리 위탁)</p>
					<p>
						① &lt;스럽 - 좋아하는 셀럽의 아이템 정보를 공유하는 커뮤니티 서비스(이하
						스럽)&gt;은(는) 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보
						처리업무를 위탁하고 있습니다.
					</p>
					<p>1. &lt;현재 해당사항없음&gt;</p>
					<p>위탁받는 자 (수탁자) :</p>
					<p>위탁하는 업무의 내용 :</p>
					<p>위탁기간 :</p>
					<p>
						② &lt;스럽 - 좋아하는 셀럽의 아이템 정보를 공유하는 커뮤니티 서비스(이하
						스럽)&gt;은(는) 위탁계약 체결시 「개인정보 보호법」 제26조에 따라 위탁업무
						수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에
						대한 관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고,
						수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
					</p>
					<p>
						③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보
						처리방침을 통하여 공개하도록 하겠습니다.
					</p>
					<p>
						<br />
						<br />
					</p>
					<p>제5조(정보주체와 법정대리인의 권리&middot;의무 및 그 행사방법)</p>
					<p>
						① 정보주체는 &lt;스럽 - 좋아하는 셀럽의 아이템 정보를 공유하는 커뮤니티
						서비스(이하 스럽)&gt;에 대해 언제든지 개인정보
						열람&middot;정정&middot;삭제&middot;처리정지 요구 등의 권리를 행사할 수
						있습니다.
					</p>
					<p>
						② 제1항에 따른 권리 행사는 &lt;스럽 - 좋아하는 셀럽의 아이템 정보를 공유하는
						커뮤니티 서비스(이하 스럽)&gt;에 대해 「개인정보 보호법」 시행령
						제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며
						스럽은(는) 이에 대해 지체 없이 조치하겠습니다.
					</p>
					<p>
						③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등
						대리인을 통하여 하실 수 있습니다.이 경우 &ldquo;개인정보 처리 방법에 관한
						고시(제2020-7호)&rdquo; 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
					</p>
					<p>
						④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조
						제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.
					</p>
					<p>
						⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로
						명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
					</p>
					<p>
						⑥ &lt;스럽 - 좋아하는 셀럽의 아이템 정보를 공유하는 커뮤니티 서비스(이하
						스럽)&gt; 정보주체 권리에 따른 열람의 요구, 정정&middot;삭제의 요구,
						처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를
						확인합니다.
					</p>
					<p>
						<br />
						<br />
					</p>
					<p>제6조(처리하는 개인정보의 항목 작성)</p>
					<p>
						① &lt;스럽 - 좋아하는 셀럽의 아이템 정보를 공유하는 커뮤니티 서비스(이하
						스럽)&gt;은(는) 다음의 개인정보 항목을 처리하고 있습니다.
					</p>
					<p>1&lt; 홈페이지 회원가입 및 관리 &gt;</p>
					<p>필수항목 : 휴대전화번호, 이메일, 비밀번호</p>
					<p>선택항목 :</p>
					<p>이용기간: 계약종료 및 회원 탈퇴시까지</p>
					<p>&nbsp;</p>
					<p>
						<br />
						<br />
					</p>
					<p>제7조(개인정보의 파기)</p>
					<p>
						① &lt;스럽 - 좋아하는 셀럽의 아이템 정보를 공유하는 커뮤니티 서비스(이하
						스럽)&gt;은(는) 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
						불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
					</p>
					<p>&nbsp;</p>
					<p>
						② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이
						달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는
						경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를
						달리하여 보존합니다.
					</p>
					<p>1. 법령 근거 :</p>
					<p>2. 보존하는 개인정보 항목 :</p>
					<p>&nbsp;</p>
					<p>③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.</p>
					<p>1. 파기절차</p>
					<p>
						&lt;스럽 - 좋아하는 셀럽의 아이템 정보를 공유하는 커뮤니티 서비스(이하
						스럽)&gt;은(는) 파기 사유가 발생한 개인정보를 선정하고, 스럽의 개인정보
						보호책임자의 승인을 받아 개인정보를 파기합니다.
					</p>
					<p>2. 파기방법</p>
					<p>전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</p>
					<p>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다</p>
					<p>
						<br />
						<br />
					</p>
					<p>제8조(개인정보의 안전성 확보 조치)</p>
					<p>
						&lt;스럽 - 좋아하는 셀럽의 아이템 정보를 공유하는 커뮤니티 서비스(이하
						스럽)&gt;은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
						있습니다.
					</p>
					<p>1. 정기적인 자체 감사 실시</p>
					<p>
						개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를
						실시하고 있습니다.
					</p>
					<p>&nbsp;</p>
					<p>2. 개인정보 취급 직원의 최소화 및 교육</p>
					<p>
						개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를
						관리하는 대책을 시행하고 있습니다.
					</p>
					<p>&nbsp;</p>
					<p>3. 개인정보에 대한 접근 제한</p>
					<p>
						개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를
						통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며
						침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.
					</p>
					<p>&nbsp;</p>
					<p>4. 문서보안을 위한 잠금장치 사용</p>
					<p>
						개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에
						보관하고 있습니다.
					</p>
					<p>&nbsp;</p>
					<p>제9조(개인정보 자동 수집 장치의 설치&bull;운영 및 거부에 관한 사항)</p>
					<p>
						&lt;스럽 - 좋아하는 셀럽의 아이템 정보를 공유하는 커뮤니티 서비스(이하
						스럽)&gt;은(는) 개개인에게 개인화되고 맞춤화된 서비스를 제공하기 위해
						이용자의 정보를 저장하고 수시로 불러오는&nbsp; &lsquo;쿠키(cookie)&rsquo;를
						사용합니다.
					</p>
					<p>쿠키의 사용 목적</p>
					<p>쿠키를 이용한 앱 실행 시 자동 로그인</p>
					<p>서비스 이용에 필수적인 기능을 위해 사용</p>
					<p>&nbsp;</p>
					<p>제10조 (개인정보 보호책임자)</p>
					<p>
						① &lt;스럽 - 좋아하는 셀럽의 아이템 정보를 공유하는 커뮤니티 서비스(이하
						스럽)&gt;은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
						처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이
						개인정보 보호책임자를 지정하고 있습니다.
					</p>
					<p>▶ 개인정보 보호책임자</p>
					<p>성명 : 김보인</p>
					<p>직책 : 대표</p>
					<p>직급 : CEO</p>
					<p>연락처 : 010-2934-1246, rlaqhdls2323@gmail.com</p>
					<p>※ 개인정보 보호 담당부서로 연결됩니다.</p>
					<p>▶ 개인정보 보호 담당부서</p>
					<p>부서명 :&nbsp;</p>
					<p>담당자 : 김보인</p>
					<p>이메일 : celebit.sluv@gmail.com</p>
					<p>
						② 정보주체께서는 &lt;스럽 - 좋아하는 셀럽의 아이템 정보를 공유하는 커뮤니티
						서비스(이하 스럽)&gt;의 서비스(또는 사업)을 이용하시면서 발생한 모든
						개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보
						보호책임자 및 담당부서로 문의하실 수 있습니다. 스럽은(는) 정보주체의 문의에
						대해 지체 없이 답변 및 처리해드릴 것입니다.
					</p>
					<p>&nbsp;</p>
					<p>제11조(개인정보 열람청구)</p>
					<p>
						정보주체는 ｢개인정보 보호법｣ 제35조에 따른 개인정보의 열람 청구를 아래의
						부서에 할 수 있습니다.
					</p>
					<p>
						&lt;스럽 - 좋아하는 셀럽의 아이템 정보를 공유하는 커뮤니티 서비스(이하
						스럽)&gt;은(는) 정보주체의 개인정보 열람청구가 신속하게 처리되도록
						노력하겠습니다.
					</p>
					<p>▶ 개인정보 열람청구 접수&middot;처리 부서</p>
					<p>부서명 :</p>
					<p>담당자 : 김보인</p>
					<p>이메일 : celebit.sluv@gmail.com</p>
					<p>&nbsp;</p>
					<p>제12조(권익침해 구제방법)</p>
					<p>
						정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회,
						한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수
						있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에
						문의하시기 바랍니다.
					</p>
					<p>&nbsp;</p>
					<p>1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)</p>
					<p>2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</p>
					<p>3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)</p>
					<p>4. 경찰청 : (국번없이) 182 (cyberbureau.police.go.kr)</p>
					<p>&nbsp;</p>
					<p>
						「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의
						정정&middot;삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대
						하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를
						받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.
					</p>
					<p>&nbsp;</p>
					<p>
						※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr)
						홈페이지를 참고하시기 바랍니다.
					</p>
					<p>&nbsp;</p>
				</ContentParagraphWrap>
			</ContentWrap>
		</MainContainer>
	);
}
