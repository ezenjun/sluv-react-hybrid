import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil';
import { bottomNavStatusState } from '../../recoil/BottomNav';

export default function Binder() {
  const setBottomNavStatus = useSetRecoilState(bottomNavStatusState);

  useEffect(() => {
    // 하단바 띄워주기
    setBottomNavStatus(true);

  },[]);

  return (
    <div>Binder</div>
  )
}
