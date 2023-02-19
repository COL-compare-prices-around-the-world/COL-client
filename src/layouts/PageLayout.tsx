import React from 'react'

import { Box } from '@mui/material'
import Header from '@/components/Header'
import Head from 'next/head'

const styles = {
    root: {
        height: '100vh',
        margin: '0 auto',
        overflowX: 'auto',
        // p: 2,
    },
    content: {
        maxWidth: '1290px',
        margin: 'auto',
    },
}

export default function PageLayout({ children }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <>
            <Head>
                <title>COL - сравненивайте цены в разных странах мира</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box sx={styles.root} component="section">
                <Header />
                <Box sx={styles.content}>{children}</Box>
            </Box>
        </>
    )
}
