import React, { ChangeEvent, useState } from 'react';
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

export default function Usuario(): JSX.Element {

    const [modal, setModal] = useState(false);
    const [iuser, setIuser] = useState(
        {
            nome: '',
            login: '',
            senha: '',
            confirmSenha: '',
            email: '',
        } as IUser
    );

    function handleInputsModalAddUsuario(event: ChangeEvent<HTMLInputElement>): void {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setIuser({
            [name]: value
        });
    }

    const handleSalvarModalAddUsuario = async (event: ChangeEvent<HTMLButtonElement>): void => {

        const service = HttpClient.getInstance();
        const retorno = await service.post('/users/save', JSON.stringify({ 
            nome: iuser.nome,
            login: iuser.login,
            senha: iuser.senha, 
            confirmSenha: iuser.confirmSenha,
            email: iuser.email
        }));

        console.log('retorno:', retorno);
    }

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
                onClosed={() => setIuser({} as IUser)}
                centered={true}
            >
                <ModalHeader
                    toggle={() => setModal(!modal)}
                >
                    Adicionar Usuário
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs={6}>
                            <FormGroup>
                                <Label for='inome'>Nome</Label>
                                <Input
                                    id='inome'
                                    name='nome'
                                    placeholder='Nome'
                                    type='text'
                                    value={iuser.nome}
                                    onChange={event => handleInputsModalAddUsuario(event)}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup>
                                <Label for='ilogin'>Login</Label>
                                <Input
                                    id='ilogin'
                                    name='login'
                                    placeholder='Login'
                                    type='text'
                                    value={iuser.login}
                                    onChange={event => handleInputsModalAddUsuario(event)}
                                />
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
                                    value={iuser.senha}
                                    onChange={event => handleInputsModalAddUsuario(event)}
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
                                    value={iuser.confirmSenha}
                                    onChange={event => handleInputsModalAddUsuario(event)}
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
                                    value={iuser.email}
                                    onChange={event => handleInputsModalAddUsuario(event)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
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