// import Logo from 'components/Logo';
import { Cell } from 'components/Container';
import Single from 'components/Uploader/Single';
import { useToast } from 'contexts/toast';
import React, { createRef, useEffect, useRef } from 'react';

export default function Home() {
  const { toast } = useToast();
  useEffect(() => {
    toast('this is a toast');
  });
  const ref = createRef<HTMLInputElement>();
  return (
    <Cell span={{ col: 3 }}>
      <Single type='file' ref={ref} />
      {/* <Logo /> */}
    </Cell>
  );
}

// name: "5797EB17C8FAF30C.png"
// size: 36799
// type: "image/png"
// webkitRelativePath: ""
