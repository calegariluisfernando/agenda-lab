import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { useAuth } from "../../contexts/Auth/AuthContext";
import './Login.scss';

export default function Login(): JSX.Element {

    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [modalIsOpen, setModalisOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('texto inicial');

    const toggleModal = () => {
        setModalisOpen(!modalIsOpen);
    }

    const { signin } = useAuth();

    const fazerLogin = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const retornoLogin = await signin(login, senha);

        if ('code' in retornoLogin) {

            const message = retornoLogin?.message
                ? retornoLogin.message : 'Ops! Algo deu errado, tente novamente mais tarde.';
                
            setModalMessage(message);
            toggleModal();
        } else {

            navigate(`/`);
        }
    }

    return (
        <>
            <div className="wrap-login-page">
                <div className="text-center">
                    <main className="form-signin">
                        <form onSubmit={(event: FormEvent<HTMLFormElement>) => fazerLogin(event)}>
                            <h1 className="h3 mb-3 fw-normal">Sistema</h1>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="login"
                                    placeholder="login"
                                    value={login}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => setLogin(event.target.value)}
                                />
                                <label htmlFor="login">Login</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="senha"
                                    placeholder="Senha"
                                    value={senha}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => setSenha(event.target.value)}
                                />
                                <label htmlFor="senha">Senha</label>
                            </div>
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Entrar</button>
                            <p className="mt-5 mb-3 text-muted">&copy; 2017–{new Date().toLocaleDateString('pt-br', { year: 'numeric' })}</p>
                        </form>
                    </main>
                </div>
            </div>

            <Modal isOpen={modalIsOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Mensagem</ModalHeader>
                <ModalBody>
                    {modalMessage}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>Fechar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}