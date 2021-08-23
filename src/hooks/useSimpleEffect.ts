import { isStringMatch } from "helpers/string";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ModalContext } from "context/ModalContext";
import { IModal } from "types/interfaces/IModal";

const useSimpleEffect = (effect: () => any, deps: any[]) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, deps);
};

export default useSimpleEffect;
