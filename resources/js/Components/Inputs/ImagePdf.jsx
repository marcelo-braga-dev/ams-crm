import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
            <div className="row mb-3">
                <div className="col-auto">
                    <a className="text-dark" href={"/storage/" + url} target="_blank">
                        <img className="mb-1 img-thumbnail d-block" alt="" src={"/storage/" + url}
                             style={{maxHeight: 200}}/>
                    </a>
                    <div className="row justify-content-end">
                        <div className="col-auto">
                            <a className="text-dark" href={"/storage/" + url} target="_blank">
                                <VisibilityIcon />
                            </a>
                        </div>
                        <div className="col-auto text-end">
                            <a className="text-dark" href={"/storage/" + url} download>
                                <DownloadIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
