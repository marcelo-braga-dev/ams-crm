import React from 'react';
import Modal from 'react-modal';

const ModalConfirm = ({ isOpen, onRequestClose, onConfirm }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={{
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '40vw',
                maxWidth: '90vw',
                padding: 0,
            },
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                zIndex: 1300,
            },
        }}>
            <h2>Confirmar movimentação</h2>
            <p>Você tem certeza que deseja mover este lead?</p>
            <button onClick={onConfirm}>Confirmar</button>
            <button onClick={onRequestClose}>Cancelar</button>
        </Modal>
    );
};

export default ModalConfirm;
