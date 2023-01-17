import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Box, Typography, Tabs, Tab } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { contries } from '../../mock'
import PageLayout from '../../components/PageLayout'
import InfoWrapper from '../../components/InfoWrapper'
import InfoCard from '../../components/InfoCard'
import { TabPanel, allyProps } from '../../components/tabs'
import flagImg from '../../assets/united-kingdom.png'

const TABS = [
    { label: 'Общие' },
    { label: 'Магазины' },
    { label: 'Жилье' },
    { label: 'Рестараны' },
    { label: 'Транспорт' },
]

const styles = {
    content: {
        maxWidth: '1290px',
        margin: 'auto',
        padding: '16px',
    },
}

export default function Country({ country }) {
    const { restaurants, market, transprot } = country.info.statistic
    const [tab, setTab] = useState(0)
    const handleTabChange = (event, newTab) => {
        setTab(newTab)
    }

    const columns = [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'name', headerName: 'Название', flex: 1 },
        { field: 'price', headerName: 'Цена', flex: 1 },
    ]

    return (
        <PageLayout>
            <Box sx={styles.content}>
                <InfoWrapper style={{ paddingBottom: 0 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Image alt="country flag img" src={flagImg.src} width={24} height={24} />

                        <Typography sx={{ ml: 1 }} variant="h6">
                            {country?.name || ''}
                        </Typography>
                    </Box>
                    <Tabs sx={{ color: '#fff' }} value={tab} onChange={handleTabChange}>
                        {TABS.map((item, index) => (
                            <Tab key={index + item.label} label={item.label} {...allyProps(index)} />
                        ))}
                    </Tabs>
                </InfoWrapper>
                <TabPanel value={tab} index={0}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '16px',
                            flexGrow: 1,
                            flexWrap: 'wrap',
                            mb: 3,
                        }}
                    >
                        <InfoCard
                            title="Средняя цена похода в ресторан"
                            info="1255р"
                            subInfo="Это цена ниже чем в 55% странах"
                        />
                        <InfoCard title="Средняя продуктовая корзина" info="950р" />
                        <InfoCard title="В среднем тратят на досуг" info="455р" />
                        <InfoCard title="Средняя поездка на такси" info="155р" />
                    </Box>
                    <InfoWrapper>
                        <Typography variant="h6">Магазины</Typography>
                        <DataGrid sx={{ color: '#fff' }} autoHeight rows={market} columns={columns} />
                        <Typography variant="h6">Рестораны</Typography>
                        <DataGrid sx={{ color: '#fff' }} autoHeight rows={restaurants} columns={columns} />
                        <Typography variant="h6">Транспорт</Typography>
                        <DataGrid sx={{ color: '#fff' }} autoHeight rows={transprot} columns={columns} />
                    </InfoWrapper>
                </TabPanel>

                <TabPanel value={tab} index={1}>
                    <>sss</>
                </TabPanel>
            </Box>
        </PageLayout>
    )
}
const getContries = async () => ({
    data: contries,
    message: 'its ok',
    error: null,
})

const getCountry = async (id) => ({
    data: contries.filter((country) => country.id === id)[0],
    message: 'its ok',
    error: null,
})

export async function getStaticProps({ params }) {
    const response = await getCountry(+params.id)
    const country = response.data
    return {
        props: {
            country,
        },
    }
}

export async function getStaticPaths() {
    const contries = await getContries()

    const paths = contries.data.map((post) => ({
        params: { id: post.id.toString() },
    }))

    return {
        paths,
        fallback: false,
    }
}
