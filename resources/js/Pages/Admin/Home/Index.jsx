import Layout from "@/Layouts/AdminLayout/LayoutAdmin";

import {Box, Card, CardActions, CardContent, Typography} from "@mui/material";

export default function () {
    return (
        <Layout titlePage="Home">
            <div className="row row-cols-3">
                <div className="col">
                    <Card className="shadow">
                        <CardContent>
                            <Typography variant="h5">
                                Pedidos
                            </Typography>
                        </CardContent>
                        <CardActions className="mx-3">
                            <a className="btn btn-primary btn-sm" href={route('admin.pedidos.index')}>Ver Pedidos</a>
                            <a className="btn btn-primary btn-sm" href={route('admin.pedidos.emitir.index')}>Cadastrar
                                Pedido</a>
                        </CardActions>
                    </Card>
                </div>
                <div className="col">
                </div>
            </div>
        </Layout>
    )
}
