import { router } from '@inertiajs/react'
import React, {useState} from 'react'
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
    styled, Divider
} from '@mui/material';

import {Row, Col} from 'reactstrap';
import {LegendaNome, Nome} from './styles'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleRight';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

const ITEM_HEIGHT = 48;

export default function ConferenciaCard({dados}) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card sx={{margin: 1}} className="mb-3">
            <CardHeader
                action={
                    <div>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}>
                            <MoreVertIcon/>
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{'aria-labelledby': 'long-button',}}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{style: {maxHeight: ITEM_HEIGHT * 4.5, width: '20ch'},}}>
                            <Link href={route('supervisor.chamado.show', dados.id)} underline="none" color="inherit">
                                <MenuItem key={dados.id} onClick={handleClose}>
                                    Ver Informações
                                </MenuItem>
                            </Link>
                        </Menu>
                    </div>
                }
                title={
                    <>
                        <LegendaNome>Consultor</LegendaNome>
                        <Nome>{dados.consultor}</Nome>
                        <LegendaNome>Gerência</LegendaNome>
                        <Nome>{dados.admin}</Nome>
                        <Divider className={"mb-3"}></Divider>
                    </>
                }
                subheader={
                    <Row>
                        <Col>
                            <Typography variant="caption" component="p" color="text.secondary">
                                Título: {dados.titulo}
                            </Typography>
                            <Typography variant="subtitle2" component="p" color="text.secondary">
                                {dados.msg}
                            </Typography>
                        </Col>
                    </Row>
                }
            />
            <Row className="mx-2 text-muted">
                <Col>
                    <Typography variant="caption" component={"p"}>
                        Data: {dados.status_data}
                    </Typography>
                    <Typography variant="caption" component={"p"}
                                className={dados.prazo_atrasado ? "" : "text-red-600"}>
                        Prazo: {dados.prazo} ({dados.prazo_dias} dias)
                    </Typography>
                </Col>
            </Row>


            <div className="row justify-content-between px-3">
                <div className="col-auto">
                    <span className="text-sm text-muted">ID: #{dados.id}</span>
                </div>
                <div className="col-auto">
                    <a href={route('supervisor.chamado.edit', dados.id)} className="btn btn-primary btn-sm p-1 px-3">
                        <QuestionAnswerOutlinedIcon className="me-2"></QuestionAnswerOutlinedIcon>
                        Abrir
                    </a>
                </div>
            </div>
        </Card>
    )
}
