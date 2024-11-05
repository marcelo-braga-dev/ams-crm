import React from "react";

export default function Modal({ id, title, body, confirmText, confirmAction }) {
 return (
    <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">{body}</div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={confirmAction}>{confirmText}</button>
                </div>
            </div>
        </div>
    </div>
)};


