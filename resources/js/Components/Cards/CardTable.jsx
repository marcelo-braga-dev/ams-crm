import styled from 'styled-components'
import {Stack, TextField, Typography} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import CardTitle from "@/Components/Cards/CardTitle";
import React from "react";

const Container = styled.div`
    padding-top: 20px;
`

export default function CardTable({children, title, paginateDados, paginate, setPaginate}) {
    return (<>
            {paginate &&
                <CardTitle title={title}>
                    <Stack direction="row" spacing={6}>
                        <Stack direction="row" spacing={0}>
                            <Pagination count={paginateDados?.last_page} color="standard" page={paginate > paginateDados?.last_page ? 1 : paginate}
                                        onChange={(event, value) => setPaginate(value)}/>
                            <Typography className="mt-1" variant="caption">Total: {paginateDados?.total}</Typography>
                        </Stack>
                    </Stack>
                </CardTitle>
            }
            <Container>
                {children}
            </Container>
        </>
    )
}
