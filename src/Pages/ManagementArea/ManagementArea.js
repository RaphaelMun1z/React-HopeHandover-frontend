import styles from './ManagementArea.module.scss'
import { Link } from "react-router-dom"
import { AuthContext } from '../../Contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';

import ManagementLinkMap from '../../components/ManagementLinkMap/ManagementLinkMap'
import ContentSection from '../../components/ContentSection/ContentSection'
import AdminLinkMap from '../../components/AdminLinkMap/AdminLinkMap';

import img1 from '../../img/imgContent2.png'

function ManagementArea() {
    const { authuser } = useContext(AuthContext)
    const [level, setLevel] = useState(1)

    useEffect(() => {
        if (authuser.accesslevel === 2)
            setLevel(2)
        else if (authuser.accesslevel === 3)
            setLevel(3)
    }, [authuser])

    return (
        <>
            <ContentSection
                title='Área de gerenciamento'
                paragraph='Aqui você você pode controlar o sistema.'
                btnText='Saiba Mais'
                img={img1}
                type={2}
            />
            {level === 2 || level === 3? (
                < AdminLinkMap />
            ) : null}
            <ManagementLinkMap />
        </>
    )
}

export default ManagementArea