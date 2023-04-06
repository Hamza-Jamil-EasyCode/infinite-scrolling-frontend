import React, { ReactNode } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

type Props = {
  isOpenModal: boolean;
  closeModalHandler: () => void;
  children: ReactNode;
  heading: string;
  showCloseIcon?: boolean;
};

const ModalContainer = ({
  isOpenModal,
  closeModalHandler,
  children,
  heading,
  showCloseIcon,
}: Props) => {
  const renderCloseIcon = (
    <i className="fa-regular fa-circle-xmark modal_cross_icon"></i>
  );

  return (
    <Modal
      open={isOpenModal}
      onClose={closeModalHandler}
      showCloseIcon={showCloseIcon}
      closeIcon={renderCloseIcon}
      center={true}
      classNames={{
        overlay: "customOverlay",
        modal: "customModal",
      }}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <div className="modal_container">
        <div className="modal_container-header">
          <h1>{heading}</h1>
        </div>
        <hr />
        <div className="modal_container-content">{children}</div>
      </div>
    </Modal>
  );
};

export default ModalContainer;
