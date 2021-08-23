import { chakra } from "@chakra-ui/react";
import useModalContext from "context/useModalContext";
import { motion } from "framer-motion";
import React from "react";
import { MODAL_TENANT_ID } from "routes/Tenant/constants/modal";
import ModalCheckout from "routes/Tenant/subroutes/Order/Modal/ModalCheckout";
import ModalInputCustomer from "routes/Tenant/subroutes/Order/Modal/ModalInputCustomer";
import ModalLoadDraft from "routes/Tenant/subroutes/Order/Modal/ModalLoadDraft";

// export const MotionBox = motion<BoxProps>(Box);
const MotionBox = chakra(motion.div);

interface Props {}

const Modal: React.FC<Props> = () => {
  const { modalState, modalAct } = useModalContext();

  return (
    <>
      {modalState.modal?.id === MODAL_TENANT_ID.INPUT_CUSTOMER && (
        <ModalInputCustomer />
      )}
      {modalState.modal?.id === MODAL_TENANT_ID.LOAD_DRAFT && (
        <ModalLoadDraft />
      )}
      {modalState.modal?.id === MODAL_TENANT_ID.ALERT_SUCCESS_CHECKOUT && (
        <ModalCheckout />
      )}
    </>
  );
};

export default Modal;
