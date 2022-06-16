import React, { ChangeEvent, useEffect, useState } from 'react';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import HttpClient from '../../services/HttpClient/HttpClient';
import HeaderPage from '../../components/HeaderPage/HeaderPage';
import { useLoading } from '../../contexts/Loading/LoadingContext';
import FormValidator from '../../services/Validator/FormValidator';

import './../EstiloPaginas.scss';

interface IUser {
    nome?           : string;
    login?          : string;
    senha?          : string;
    confirmSenha?   : string
    tipoUsuario?    : string,
    email?          : string;
}

interface ITipoUsuario {
    codigo      : number,
    descricao   : string
}

const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const service = HttpClient.getInstance();
export default function Usuario(): JSX.Element {

    useEffect(() => {

        service.get('/users/tipos-usuarios')
            .then(res => setTiposUsuarios(res.data))
    }, []);

    const { toggle } = useLoading();

    const [modal, setModal] = useState(false);
    const [tiposUsuarios, setTiposUsuarios] = useState([] as Array<ITipoUsuario>);

    const handleSalvarModalAddUsuario = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {

        event.preventDefault();
        toggle(true);
        // await service.post('/users/save', JSON.stringify(camposModal));

        setModal(!modal);

        toggle(false);
    }

    const modalValidate = FormValidator({ 
        initialValues: {
            nome        : '',
            login       : '',
            senha       : '',
            confirmSenha: '',
            tipoUsuario : '',
            email       : ''
        } as IUser,
        validate: (values: any) => {

            const errors = {} as any;

            if (!values.nome.length) {

                errors.nome = "O Campo Nome deve ser preenchido."
            }

            if (!values.login.length) {

                errors.login = "O Campo login deve ser preenchido."
            }

            if (values.senha.length < 6) {

                errors.senha = "O Campo senha deve conter mais 5 de caracteres.";
            }

            if (values.confirmSenha.length < 6) {

                errors.confirmSenha = "O Campo senha deve conter mais 5 de caracteres.";
            }

            if (values.confirmSenha !== values.senha) {

                errors.senha        = "O Confirmar Senha deve ser igual ao campo Senha.";
                errors.confirmSenha = "O Confirmar Senha deve ser igual ao campo Senha.";
            }

            if (!values.tipoUsuario.length) {

                errors.tipoUsuario = "O Campo Tipo Usuario deve ser preenchido.";
            }

            if (!regexEmail.test(values.email)) {

                errors.email = "O Campo E-mail deve conter um formato válido.";
            }

            return errors;
        } 
    });

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
                                    onBlur={ modalValidate.handleBlur }
                                    onChange={ modalValidate.handleChange }
                                    value={ modalValidate.values.nome }
                                    invalid={ modalValidate.touched.nome && modalValidate.errors.nome }
                                />
                                <FormFeedback>
                                    { modalValidate.errors.nome }
                                </FormFeedback>
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
                                    onBlur={ modalValidate.handleBlur }
                                    onChange={ modalValidate.handleChange }
                                    value={ modalValidate.values.login }
                                    invalid={ modalValidate.touched.login && modalValidate.errors.login }
                                />
                                <FormFeedback>
                                    { modalValidate.errors.login }
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup>
                                <Label for='itipoUsuario'>Tipo de Usuário</Label>
                                <Input
                                    id='itipoUsuario'
                                    name='tipoUsuario'
                                    type='select'
                                    onBlur={ modalValidate.handleBlur }
                                    onChange={ modalValidate.handleChange }
                                    value={ modalValidate.values.tipoUsuario }
                                    invalid={ modalValidate.touched.tipoUsuario && modalValidate.errors.tipoUsuario }
                                >
                                    <option value="0">Selecione uma opção</option>
                                    { tiposUsuarios.map(tipoUsuario => (<option key={tipoUsuario.codigo} value={tipoUsuario.codigo}>{ tipoUsuario.descricao }</option>)) }
                                </Input>
                                <FormFeedback>
                                    { modalValidate.errors.tipoUsuario }
                                </FormFeedback>
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
                                    onBlur={ modalValidate.handleBlur }
                                    onChange={ modalValidate.handleChange }
                                    value={ modalValidate.values.senha }
                                    invalid={ modalValidate.touched.senha && modalValidate.errors.senha }
                                />
                                <FormFeedback>
                                    { modalValidate.errors.senha }
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup>
                                <Label for='iconfirSenha'>Confirmar Senha</Label>
                                <Input
                                    id='iconfirSenha'
                                    name='confirmSenha'
                                    placeholder='Confirmar Senha'
                                    type='password'
                                    onBlur={ modalValidate.handleBlur }
                                    onChange={ modalValidate.handleChange }
                                    value={ modalValidate.values.confirmSenha }
                                    invalid={ modalValidate.touched.confirmSenha && modalValidate.errors.confirmSenha }
                                />
                                <FormFeedback>
                                    { modalValidate.errors.confirmSenha }
                                </FormFeedback>
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
                                    onBlur={ modalValidate.handleBlur }
                                    onChange={ modalValidate.handleChange }
                                    value={ modalValidate.values.email }
                                    invalid={ modalValidate.touched.email && modalValidate.errors.email }
                                />
                                <FormFeedback>
                                    { modalValidate.errors.email }
                                </FormFeedback>
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