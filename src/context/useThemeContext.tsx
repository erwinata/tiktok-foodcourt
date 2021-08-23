import { isStringMatch } from "helpers/string";
import {
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IModal } from "types/interfaces/IModal";
import { useBreakpointValue } from "@chakra-ui/react";
import { ThemeContext } from "context/ThemeContext";

const useThemeContext = () => {
  const { state, dispatch } = useContext(ThemeContext);
  // const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [initHeight, setInitHeight] = useState(0);

  const smScreen = useBreakpointValue({ base: true, sm: false });
  const mdScreen = useBreakpointValue({ base: true, md: false });
  const xlScreen = useBreakpointValue({ base: true, xl: false });

  const smValue = (smValue: any, otherValue: any) =>
    smScreen ? smValue : otherValue;

  const mdValue = (value: any, otherValue: any) =>
    mdScreen ? value : otherValue;

  const xlValue = (value: any, otherValue: any) =>
    mdScreen ? value : otherValue;

  const setRefPortal = useCallback(
    (refPortal: RefObject<HTMLElement | null>) => {
      dispatch({ refPortal });
    },
    [dispatch]
  );

  const themeAct = useMemo(
    () => ({
      setRefPortal,
    }),
    [setRefPortal]
  );

  const isTouchDevice = matchMedia("(hover: none), (pointer: coarse)").matches;
  const isLandscape = matchMedia(
    "@media screen and (orientation: landscape)"
  ).matches;

  useEffect(() => {
    setInitHeight(window.innerHeight);
  }, []);

  const setIsInputFocus = (isInputFocus: boolean) => {
    dispatch({ isInputFocus });
  };

  const isKeyboardOpen = isTouchDevice && mdScreen && state.isInputFocus;

  return {
    themeState: state,
    themeAct,
    themeHelpers: {
      smScreen,
      mdScreen,
      xlScreen,
      smValue,
      mdValue,
      xlValue,
      isTouchDevice,
      isLandscape,
      isKeyboardOpen,
      setIsInputFocus,
    },
  };
};

export default useThemeContext;
