export default function ImagePdf({url}) {

    if (url && url.split('.').pop() === 'pdf') {
        return (
            <a className="btn btn-danger mt-2" href={"/storage/" + url} target="_blank">
                <i className="fas fa-file-pdf pe-2" style={{fontSize: 25}}></i> Abrir PDF
            </a>
        )
    }

    if (url) {
        return (
            <div className="text-end">
                <img className="mb-1 img-thumbnail d-block" alt="" src={"/storage/" + url} style={{maxHeight: 200}}/>
                <a className="btn btn-primary btn-sm mb-0 p-1" href={"/storage/" + url} target="_blank" download>
                    Baixar
                </a>
            </div>
        )
    }
}
