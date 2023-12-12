import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Lightbox from "@/Components/Elementos/Lightbox";
import {useState} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {IconButton} from "@mui/material";

export default function ImagePdf({url, string}) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const closeLightbox = () => {
        setLightboxOpen(false);
    };


    if (url && url.split('.').pop() === 'pdf') {
        return (
            <a className="btn btn-danger mt-2" href={"/storage/" + url} target="_blank">
                <i className="fas fa-file-pdf pe-2" style={{fontSize: 25}}></i> Abrir PDF
            </a>
        )
    }

    if (url || string) {
        let urlCompleta = url?.includes('/storage/') ? url : url + "/storage/"
        if (string) urlCompleta = string

        return (
            <div className="row mb-3">
                <div className="col-auto">
                    <a className="text-dark" href={urlCompleta} target="_blank">
                        <img className="img-thumbnail d-block" alt="" src={urlCompleta}
                             style={{maxHeight: 200}}/>
                    </a>
                    {url && <div className="row justify-content-end g-2">
                        {lightboxOpen && (
                            <Lightbox imageUrl={urlCompleta} onClose={closeLightbox}/>
                        )}
                        <div className="col-auto m-0">
                            <IconButton
                                sx={{color: 'black'}}
                                onClick={() => setLightboxOpen(true)}>
                                <VisibilityOutlinedIcon className="me-1 p-0 m-0" fontSize="small"/>
                            </IconButton>
                        </div>
                        <div className="col-auto text-end m-0">
                            <IconButton href={urlCompleta} sx={{color: 'black'}} download>
                                <FileDownloadOutlinedIcon fontSize="small"/>
                            </IconButton>
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}
