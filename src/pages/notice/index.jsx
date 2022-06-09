import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil';
import { bottomNavStatusState } from '../../recoil/BottomNav';

export default function Notice() {
  const setBottomNavStatus = useSetRecoilState(bottomNavStatusState);

  useEffect(() => {
    setBottomNavStatus(false);

  });

  return (
    <div>Notice</div>
  )
}
