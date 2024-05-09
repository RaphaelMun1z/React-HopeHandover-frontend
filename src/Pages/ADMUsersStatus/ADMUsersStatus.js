import styles from './ADMUsersStatus.module.scss'
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Table, Button, Tooltip, Modal } from 'antd';
import Axios from "axios";
import { toast } from "react-toastify";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useNavigate } from 'react-router-dom';
import NoDataMensage from '../../components/NoDataMensage/NoDataMensage';
import { AuthContext } from '../../Contexts/AuthContext'

import { BiHash, BiBuildings } from 'react-icons/bi';
import { FiMapPin } from 'react-icons/fi';
import { BsShieldLock, BsCalendarDate } from 'react-icons/bs';
import { FaBuilding } from 'react-icons/fa';
import { GrUpdate, GrMore, GrUserAdmin } from 'react-icons/gr';
import { AiOutlineEye } from 'react-icons/ai';
import { RxUpdate } from 'react-icons/rx';
import { TfiExchangeVertical } from 'react-icons/tfi';
import { MdDriveFileRenameOutline, MdOutlineEmail, MdTitle, MdOutlineReportProblem } from 'react-icons/md';

function ADMUsersStatus() {
    const { authuser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setselectedUser] = useState(null);

    useEffect(() => {
        getUsers()
    }, [])

    Axios.defaults.withCredentials = true;

    const getUsers = async () => {
        try {
            const response = await Axios.get('http://localhost:8080/adm/users');
            if (response.status != 200) {
                toast.error('Ocorreu um erro ao carregar usuários!');
                setLoading(false);
            } else {
                const formattedUsers = response.data.users.map(user => {
                    let usertype = "Pessoa física";

                    switch (user.usertype) {
                        case 1:
                            usertype = "Pessoa física";
                            break;
                        case 2:
                            usertype = "Pessoa jurídica";
                            break;
                        default:
                            usertype = "Erro!";
                            break;
                    }

                    let accesslevel = "Pessoa física";

                    switch (user.accesslevel) {
                        case 1:
                            accesslevel = "Cliente";
                            break;
                        case 2:
                            accesslevel = "Funcionário";
                            break;
                        case 3:
                            accesslevel = "Administrador";
                            break;
                        default:
                            accesslevel = "Inativo";
                            break;
                    }

                    return {
                        ...user,
                        usertype: usertype,
                        accesslevel: accesslevel,
                        createdAt: format(new Date(user.createdAt), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR }),
                        updatedAt: format(new Date(user.updatedAt), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR }),
                    }
                });
                setUsers(formattedUsers);
                setLoading(false);
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
            toast.error('Ocorreu um erro na solicitação!');
            setLoading(false);
        }
    };

    const columns = [
        {
            title: <Tooltip title="ID"><BiHash /></Tooltip>,
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: <Tooltip title="Nome"><MdDriveFileRenameOutline /></Tooltip>,
            dataIndex: 'firstname',
            key: 'firstname',
        },
        {
            title: <Tooltip title="Sobrenome"><MdDriveFileRenameOutline /></Tooltip>,
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: <Tooltip title="Tipo de usuário"><BiBuildings /></Tooltip>,
            dataIndex: 'usertype',
            key: 'usertype',
        },
        {
            title: <Tooltip title="Nível de acesso"><BsShieldLock /></Tooltip>,
            dataIndex: 'accesslevel',
            key: 'accesslevel',
        },
        {
            title: <Tooltip title="Email"><MdOutlineEmail /></Tooltip>,
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: <Tooltip title="Criado em"><BsCalendarDate /></Tooltip>,
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: <Tooltip title="Atualizado em"><GrUpdate /></Tooltip>,
            dataIndex: 'updatedAt',
            key: 'updatedAt',
        },
        {
            dataIndex: 'more',
            key: 'more',
            render: (text, record) => (
                <Tooltip title="Clique para ter acesso a mais informações">
                    <Button onClick={() => handleMore(record)}><GrMore /></Button>
                </Tooltip>
            ),
        },
        {
            dataIndex: 'editStatus',
            key: 'editStatus',
            render: (text, record) => (
                <Tooltip title="Clique para alterar o nível de acesso">
                    {authuser.accesslevel === 3 ? (
                        <Button onClick={() => handleChangeStatus(record.id)}><TfiExchangeVertical /></Button>
                    ) : (
                        null
                    )}
                </Tooltip>
            ),
        },
        {
            dataIndex: 'edit',
            key: 'edit',
            render: (text, record) => (
                <Tooltip title="Clique para atualizar dados do usuário">
                    <Button onClick={() => handleEdit(record.id)}><RxUpdate /></Button>
                </Tooltip>
            ),
        },
    ];

    const handleMore = (user) => {
        setselectedUser(user);
        setIsModalVisible(true);
    };

    const handleChangeStatus = async (id) => {
        Axios.defaults.withCredentials = true;

        try {
            const response = await Axios.post('http://localhost:8080/adm/user/changeStatus', { userid: id });

            if (response.status === 200) {
                console.log('Status do Usuário alterado com sucesso.');
                getUsers();
            } else {
                console.error('Erro ao alterar status do usuário.');
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/adm/user/edit/${id}`);
    };

    return (

        <section className={styles.container}>
            <div className={styles.secTitle}>
                <h1>Usuários</h1>
                <p>
                    Gestão de <b>Usuários</b>.
                </p>
            </div>
            <div className={styles.containerUsers}>
                {loading ? (
                    <NoDataMensage type="loading" msg="Buscando dados!" />
                ) : (
                    users && users.length > 0 ? (
                        <Table columns={columns} dataSource={users} />
                    ) : (
                        <NoDataMensage type="noData" msg="Nenhum dado encontrado!" />
                    )
                )}
            </div>
            <Modal
                title="Detalhes do Usuário"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="ok" type="primary" onClick={() => setIsModalVisible(false)}>OK</Button>,
                ]}
                className={styles.customModal}
            >
                {selectedUser && (
                    <div className={styles.modalContent}>
                        <table className={styles.userTable}>
                            <tbody>
                                <tr>
                                    <th>ID:</th>
                                    <td>{selectedUser.id}</td>
                                </tr>
                                <tr>
                                    <th>Nome:</th>
                                    <td>{selectedUser.firstname} {selectedUser.lastname}</td>
                                </tr>
                                <tr>
                                    <th>Email:</th>
                                    <td>{selectedUser.email}</td>
                                </tr>
                                <tr>
                                    <th>Tipo de usuário:</th>
                                    <td>{selectedUser.usertype}</td>
                                </tr>
                                <tr>
                                    <th>Nível de acesso:</th>
                                    <td>{selectedUser.accesslevel}</td>
                                </tr>
                                <tr>
                                    <th>Foto de perfil:</th>
                                    <td>
                                        <img src={`http://localhost:8080/images/${selectedUser.image}`} alt='Profile User Image' />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Criado em:</th>
                                    <td>{selectedUser.createdAt}</td>
                                </tr>
                                <tr>
                                    <th>Atualizado em:</th>
                                    <td>{selectedUser.updatedAt}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                )}
            </Modal>


        </section>
    )
}

export default ADMUsersStatus