import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export default function ImagePdf({url, string}) {

    if (url && url.split('.').pop() === 'pdf') {
        return (
            <a className="btn btn-danger mt-2" href={"/storage/" + url} target="_blank">
                <i className="fas fa-file-pdf pe-2" style={{fontSize: 25}}></i> Abrir PDF
            </a>
        )
    }

    if (url || string) {
        const urlCompleta = url ? "/storage/" + url : string

        return (
            <div className="row mb-3">
                <div className="col-auto">
                    <a className="text-dark" href={urlCompleta} target="_blank">
                        <img className="img-thumbnail d-block" alt="" src={urlCompleta}
                             style={{maxHeight: 200}}/>
                    </a>
                    {url && <div className="row justify-content-end g-2">
                        <div className="col-auto">
                            <a className="text-dark" href={urlCompleta} target="_blank">
                                <VisibilityOutlinedIcon fontSize="small"/>
                            </a>
                        </div>
                        <div className="col-auto text-end">
                            <a className="text-dark" href={urlCompleta} download>
                                <FileDownloadOutlinedIcon fontSize="small"/>
                            </a>
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}
