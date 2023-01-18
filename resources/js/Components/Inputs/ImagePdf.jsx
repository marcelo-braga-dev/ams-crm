import {Button} from "reactstrap";

export default function ImagePdf({url}) {

    if (url && url.split('.').pop() === 'pdf') {
        return (
            <Button className="mt-2 mb-3" color="danger" size="sm" href={"/storage/" + url}
                    target="_blank">
                <i className="fas fa-file-pdf"></i> Abrir PDF
            </Button>)
    }

    if (url) {
        return (
            <a href={"/storage/" + url} target="_blank" download>
                <img className={"mb-3 img-thumbnail"} alt="" src={"/storage/" + url} style={{maxHeight: 200}}/>
            </a>
        )

    }
}
