import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil';
import { bottomNavStatusState } from '../../recoil/bottomNav';

export default function My() {
  const setBottomNavStatus = useSetRecoilState(bottomNavStatusState);

  useEffect(() => {
    // 하단바 띄워주기
    setBottomNavStatus(true);

  },[]);

  return (
    <div>My</div>
  )
}
