import { isStringMatch } from "helpers/string";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ModalContext } from "context/ModalContext";
import { IModal } from "types/interfaces/IModal";

const useModalContext = () => {
  const { state, dispatch } = useContext(ModalContext);

  const openModal = useCallback(
    (modal: IModal) => {
      dispatch({ modal });
    },
    [dispatch]
  );

  const closeModal = useCallback(() => {
    dispatch({ modal: undefined });
  }, [dispatch]);

  return {
    modalState: state,
    modalAct: {
      openModal,
      closeModal,
    },
  };
};

export default useModalContext;
