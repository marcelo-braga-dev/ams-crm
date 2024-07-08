import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Lightbox from "@/Components/Elementos/Lightbox";
import {useState} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {IconButton, Typography} from "@mui/material";
import {FiletypePdf, Images} from "react-bootstrap-icons";

export default function ImagePdf({url, string, urlRaiz}) {
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const urlCompleta = urlRaiz ? url : (url ? "/storage/" + url : string)
    const closeLightbox = () => {
        setLightboxOpen(false);
    };


    if (url && url.split('.').pop() === 'pdf') {
        return (
            <a className="btn btn-outline-danger btn-sm mt-2 bg-white px-4" href={urlCompleta} target="_blank">
                <FiletypePdf size={20} color="red"/> <Typography display="inline" marginTop={3}>Abrir PDF</Typography>
            </a>
        )
    }

    if (url && url.split('.').pop() === 'mp4') {
        return (
            <video width="320" height="240" controls>
                <source src={url} type="video/mp4"/>
                <source src={url} type="video/ogg"/>
                Não tem suporte para este tipo de vídeo.
            </video>
        )
    }

    if (url || string) {

        return (
            <div className="row mx-auto">
                <div className="col-auto">
                    <img className="img-thumbnail d-block cursor-pointer" alt="" src={urlCompleta} loading="lazy"
                         onClick={() => setLightboxOpen(true)}
                         style={{maxHeight: 200}}/>
                    {url && <div className="row justify-content-end g-2">
                        {lightboxOpen && (
                            <Lightbox imageUrl={urlCompleta} onClose={closeLightbox}/>
                        )}
                        <div className="col-auto m-0">
                            <a className="text-dark" href={urlCompleta} target="_blank">
                                <IconButton
                                    sx={{color: 'black'}}>
                                    <OpenInNewIcon className="me-1 p-0 m-0" fontSize="small"/>
                                </IconButton>
                            </a>
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
