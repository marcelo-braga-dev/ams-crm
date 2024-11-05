export default function Lightbox({imageUrl, onClose}) {

    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <div className="lightbox-content">
                <img src={imageUrl} alt="Imagem"/>
                <button onClick={onClose} className="close-button btn-link rounded bg-dark px-2">
                    <small>Fechar</small>
                </button>
            </div>
        </div>
    );
}
