import { useCallback, useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

function useConfirmExit(confirmExit: () => boolean, when = true) {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) {
      return;
    }

    const { push } = navigator;

    navigator.push = (...args: Parameters<typeof push>) => {
      const result = confirmExit();

      if (result !== false) {
        push(...args);
      }
    };

    // eslint-disable-next-line consistent-return
    return () => {
      navigator.push = push;
    };
  }, [navigator, confirmExit, when]);
}

export default function useNavPrompt(message: string, when = true) {
  useEffect(() => {
    if (when) {
      window.onbeforeunload = function () {
        return message;
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [message, when]);

  const confirmExit = useCallback(() => {
    const confirm = window.confirm(message);

    return confirm;
  }, [message]);

  useConfirmExit(confirmExit, when);
}
