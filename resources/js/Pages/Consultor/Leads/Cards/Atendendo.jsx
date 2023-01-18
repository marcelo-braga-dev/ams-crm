import * as React from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Collapse,
    IconButton,
    Typography,
    Link,
    Menu,
    MenuItem,
    styled
} from '@mui/material';

import {Row, Col} from 'reactstrap';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleRight';


const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const ITEM_HEIGHT = 48;

export default function OrcamentoLine1({nome, data, obs, id}) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card sx={{maxWidth: 280, margin: 2}}>
            <CardHeader
                action={
                    <div>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertIcon/>
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{'aria-labelledby': 'long-button',}}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: '20ch',
                                },
                            }}
                        >
                            <Link href={'/'} underline="none" color="inherit">
                                <MenuItem key={id} onClick={handleClose}>
                                    Em Atendimento
                                </MenuItem>
                            </Link>
                            <Link href={'/'} underline="none" color="inherit">
                                <MenuItem key={id} onClick={handleClose}>
                                    Ver Informações
                                </MenuItem>
                            </Link>
                            <Link href={'/'} underline="none" color="inherit">
                                <MenuItem key={id} onClick={handleClose}>
                                    Editar
                                </MenuItem>
                            </Link>
                        </Menu>
                    </div>
                }
                title={<Typography variant="body1">{nome}</Typography>}
                subheader={<Row>
                    <Col xs="10"><Typography variant="caption">Data: {data} <br/> Prazo: {data}</Typography></Col>
                    <Col xs="2"><Link href={"/"}></Link></Col>
                </Row>}
            />
            <Typography className={"mx-3"} variant="subtitle2" color="text.secondary">
                {obs}
            </Typography>

            <CardActions disableSpacing>
                <Typography variant="caption" ml={2}>ID: {id}</Typography>

                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2">
                        Não há mais informações.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
