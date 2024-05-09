import styles from './ADMProjectsStatus.module.scss'
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Table, Button, Tooltip, Modal } from 'antd';
import Axios from "axios";
import { toast } from "react-toastify";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useNavigate } from 'react-router-dom';
import NoDataMensage from '../../components/NoDataMensage/NoDataMensage';

import { BiHash } from 'react-icons/bi';
import { FiMapPin } from 'react-icons/fi';
import { BsInfoCircle, BsCalendarDate } from 'react-icons/bs';
import { RiGlobalLine, RiExchangeLine } from 'react-icons/ri';
import { GrUpdate, GrMore } from 'react-icons/gr';
import { AiOutlineEye } from 'react-icons/ai';
import { RxUpdate } from 'react-icons/rx';
import { TfiExchangeVertical } from 'react-icons/tfi';
import { MdDriveFileRenameOutline, MdPhone, MdTitle, MdOutlineReportProblem } from 'react-icons/md';

function ADMProjectsStatus() {
    const navigate = useNavigate()

    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        getProjects()
    }, [])

    Axios.defaults.withCredentials = true;

    const getProjects = async () => {
        try {
            const response = await Axios.get('http://localhost:8080/adm/projects');
            if (response.status != 200) {
                toast.error('Ocorreu um erro ao carregar projetos!');
                setLoading(false);
            } else {
                const formattedProjects = response.data.projects.map(project => {
                    let event = "Outros";

                    switch (project.event) {
                        case 1:
                            event = "Educacao";
                            break;
                        case 2:
                            event = "Alimento";
                            break;
                        case 3:
                            event = "Roupa";
                            break;
                        case 4:
                            event = "Servico";
                            break;
                        default:
                            event = "Outro";
                            break;
                    }

                    let status = "Outros";

                    switch (project.status) {
                        case 0:
                            status = "Finalizado";
                            break;
                        case 1:
                            status = "Publicado";
                            break;
                        default:
                            status = "Erro!";
                            break;
                    }

                    return {
                        ...project,
                        own: project.user.firstname,
                        event: event,
                        status: status,
                        address: (project.user.address[0].street) + " " + (project.user.address[0].number) + ", " + (project.user.address[0].district) + " - " + (project.user.address[0].city) + " - " + (project.user.address[0].uf),
                        createdAt: format(new Date(project.createdAt), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR }),
                        updatedAt: format(new Date(project.updatedAt), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR }),
                    }
                });
                setProjects(formattedProjects);
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
            title: <Tooltip title="Dono"><MdDriveFileRenameOutline /></Tooltip>,
            dataIndex: 'own',
            key: 'own',
        },
        {
            title: <Tooltip title="Contato"><MdPhone /></Tooltip>,
            dataIndex: 'contact',
            key: 'contact',
        },
        {
            title: <Tooltip title="Título"><MdTitle /></Tooltip>,
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: <Tooltip title="Evento"><MdOutlineReportProblem /></Tooltip>,
            dataIndex: 'event',
            key: 'event',
        },
        {
            title: <Tooltip title="Endereço"><FiMapPin /></Tooltip>,
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: <Tooltip title="Descrição"><BsInfoCircle /></Tooltip>,
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: <Tooltip title="Status"><RiGlobalLine /></Tooltip>,
            dataIndex: 'status',
            key: 'status',
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
            dataIndex: 'visit',
            key: 'visit',
            render: (text, record) => (
                <Tooltip title="Clique para abrir página do projeto">
                    <Button type="primary" onClick={() => handleVisit(record.id)}><AiOutlineEye /></Button>
                </Tooltip>
            ),
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
            dataIndex: 'delete',
            key: 'delete',
            render: (text, record) => (
                <Tooltip title="Clique para alterar o status">
                    <Button onClick={() => handleDelete(record.id)}><TfiExchangeVertical /></Button>
                </Tooltip>
            ),
        },
        {
            dataIndex: 'edit',
            key: 'edit',
            render: (text, record) => (
                <Tooltip title="Clique para atualizar dados do projeto">
                    <Button onClick={() => handleEdit(record.id)}><RxUpdate /></Button>
                </Tooltip>
            ),
        },
    ];

    const handleVisit = (id) => {
        navigate(`/projects/about/${id}`);
    };

    const handleMore = (project) => {
        setSelectedProject(project);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        Axios.defaults.withCredentials = true;

        try {
            const response = await Axios.post('http://localhost:8080/adm/project/changeStatus', { projectid: id });

            if (response.status === 200) {
                getProjects();
            } else {
                console.error('Erro ao finalizar o projeto.');
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/adm/project/edit/${id}`);
    };

    return (

        <section className={styles.container}>
            <div className={styles.secTitle}>
                <h1>Projetos</h1>
                <p>
                    Gestão de <b>Projetos</b>.
                </p>
            </div>
            <div className={styles.containerProjects}>
                {loading ? (
                    <NoDataMensage type="loading" msg="Buscando dados!" />
                ) : (
                    projects && projects.length > 0 ? (
                        <Table columns={columns} dataSource={projects} />
                    ) : (
                        <NoDataMensage type="noData" msg="Nenhum dado encontrado!" />
                    )
                )}
            </div>
            <Modal
                title="Detalhes do Projeto"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="ok" type="primary" onClick={() => setIsModalVisible(false)}>OK</Button>,
                ]}
                className={styles.customModal}
            >
                {selectedProject && (
                    <div className={styles.modalContent}>
                        <table className={styles.projectTable}>
                            <tbody>
                                <tr>
                                    <th>ID:</th>
                                    <td>{selectedProject.id}</td>
                                </tr>
                                <tr>
                                    <th>Dono:</th>
                                    <td>[{selectedProject.ownid}] {selectedProject.own}</td>
                                </tr>
                                <tr>
                                    <th>Contato:</th>
                                    <td>{selectedProject.contact}</td>
                                </tr>
                                <tr>
                                    <th>Título:</th>
                                    <td>{selectedProject.title}</td>
                                </tr>
                                <tr>
                                    <th>Evento:</th>
                                    <td>{selectedProject.event}</td>
                                </tr>
                                <tr>
                                    <th>Endereço:</th>
                                    <td>{selectedProject.address}</td>
                                </tr>
                                <tr>
                                    <th>Descrição:</th>
                                    <td>{selectedProject.description}</td>
                                </tr>
                                <tr>
                                    <th>Status:</th>
                                    <td>{selectedProject.status}</td>
                                </tr>
                                <tr>
                                    <th>Criado em:</th>
                                    <td>{selectedProject.createdAt}</td>
                                </tr>
                                <tr>
                                    <th>Atualizado em:</th>
                                    <td>{selectedProject.updatedAt}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                )}
            </Modal>


        </section>
    )
}

export default ADMProjectsStatus