import { useRef, useEffect } from "react";

const useEffectOnce = (callback: () => void) => {
  const calledOnce = useRef(false);

  useEffect(() => {
    if (calledOnce.current) {
      return;
    }

    callback();

    calledOnce.current = true;
  }, [callback]);
};

export default useEffectOnce;
