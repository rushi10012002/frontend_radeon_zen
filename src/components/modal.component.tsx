import React from 'react'
import Modal from "react-awesome-modal"

interface modelPro { width: string, height: string, mode: boolean, closeModal: any, Component: any }
function ModalCom({ width, height, mode, closeModal, Component }: modelPro) {
    return (
        <Modal visible={mode} width={width} height={height} effect="fadeInUp"  >
            <div className="main-model">

                {Component}
            </div>
        </Modal>
    )
}

export default ModalCom