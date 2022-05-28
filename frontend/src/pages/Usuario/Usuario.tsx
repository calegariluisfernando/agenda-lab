import React, { ChangeEvent, useEffect, useState } from 'react';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import HeaderPage from '../../components/HeaderPage/HeaderPage';

import './../EstiloPaginas.scss';
import HttpClient from '../../services/HttpClient/HttpClient';

interface IUser {
    nome?: string;
    login?: string;
    senha?: string;
    confirmSenha?: string;
    email?: string;
}

const service = HttpClient.getInstance();

export default function Usuario(): JSX.Element {

    const [modal, setModal] = useState(false);

    const [inome, setINome] = useState('');
    const [ilogin, setILogin] = useState('');
    const [isenha, setISenha] = useState('');
    const [iconfirmSenha, setIConfirmSenha] = useState('');
    const [iemail, setIEmail] = useState('');
    const [itipoUsuario, setITipoUsuario] = useState([{codigo: 1, descricao: 'root'}]);

    const handleSalvarModalAddUsuario = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {

        event.preventDefault();

        const obj = {
            nome: inome,
            login: ilogin,
            senha: isenha,
            confirmSenha: iconfirmSenha,
            email: iemail
        };

        await service.post('/users/save', JSON.stringify(obj));

        clearModalAddUser();
        setModal(!modal);
    }

    const clearModalAddUser = () => {
        setINome(''); setILogin('');
        setISenha(''); setIConfirmSenha('');
        setIEmail('');
    }

    const options = itipoUsuario.map((el, idx) => <option key={idx} value={el.codigo}>{el.descricao}</option>).join('');
    return (
        <>
            <main className='container-fluid'>

                <HeaderPage
                    title='Usuários'
                    shortDescription='Cadastro de usuários do sistema'
                />

                <Card className='card-filter'>
                    <CardHeader>
                        Filtros
                    </CardHeader>
                    <CardBody>
                        <div className="row">
                            <div className="col col-6">
                                <FormGroup>
                                    <Label htmlFor='nome'>Nome</Label>
                                    <Input
                                        id='nome'
                                        name='nome'
                                    />
                                </FormGroup>
                            </div>
                            <div className="col col-6">
                                <FormGroup>
                                    <Label htmlFor='login'>Login</Label>
                                    <Input
                                        id='login'
                                        name='login'
                                    />
                                </FormGroup>
                            </div>
                            <div className="col col-6">
                                <FormGroup>
                                    <Label htmlFor='email'>E-mail</Label>
                                    <Input
                                        id='email'
                                        name='email'
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <Button color='primary'>
                            <FontAwesomeIcon className='me-2' icon={faSearch} />
                            Buscar
                        </Button>
                        <Button
                            color='success'
                            onClick={() => setModal(!modal)}
                        >
                            <FontAwesomeIcon className='me-2' icon={faPlus} />
                            Novo
                        </Button>
                    </CardFooter>
                </Card>

                <Card className='card-data'>
                    <CardHeader>
                        Dados
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nome</th>
                                            <th>Login</th>
                                            <th>E-mail</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={5}>laksdfj</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </main>

            <Modal
                isOpen={modal}
                backdrop={'static'}
                centered={true}
            >
                <ModalHeader
                    toggle={() => setModal(!modal)}
                >
                    Adicionar Usuário
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for='inome'>Nome</Label>
                                <Input
                                    id='inome'
                                    name='nome'
                                    placeholder='Nome'
                                    type='text'
                                    value={inome}
                                    onChange={event => setINome(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <FormGroup>
                                <Label for='ilogin'>Login</Label>
                                <Input
                                    id='ilogin'
                                    name='login'
                                    placeholder='Login'
                                    type='text'
                                    value={ilogin}
                                    onChange={event => setILogin(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup>
                                <Label for='itipoUsuario'>Tipo de Usuário</Label>
                                <Input
                                    id='itipoUsuario'
                                    name='itipoUsuario'
                                    type='select'
                                >
                                    {options}
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <FormGroup>
                                <Label for='isenha'>Senha</Label>
                                <Input
                                    id='isenha'
                                    name='senha'
                                    placeholder='Senha'
                                    type='password'
                                    value={isenha}
                                    onChange={event => setISenha(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup>
                                <Label for='iconfirSenha'>Confirmar Senha</Label>
                                <Input
                                    id='iconfirSenha'
                                    name='confirSenha'
                                    placeholder='Confirmar Senha'
                                    type='password'
                                    value={iconfirmSenha}
                                    onChange={event => setIConfirmSenha(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for='iemail'>E-mail</Label>
                                <Input
                                    id='iemail'
                                    name='email'
                                    placeholder='E-mail'
                                    type='email'
                                    value={iemail}
                                    onChange={event => setIEmail(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={handleSalvarModalAddUsuario}
                    >
                        Salvar
                    </Button>
                    <Button
                        onClick={() => setModal(!modal)}
                    >
                        Fechar
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}