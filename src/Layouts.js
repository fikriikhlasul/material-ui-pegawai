import React from 'react'
import { Container, CssBaseline } from '@mui/material'

export default function Layouts(props) {
    return (
        <>
            <CssBaseline />
            <Container>
                <CssBaseline />
                {props.children}
            </Container>
        </>
    )
}
