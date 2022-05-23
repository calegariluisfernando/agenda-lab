import React from 'react';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardBody, CardFooter, CardHeader, FormGroup, Input, Label } from 'reactstrap';
import HeaderPage from '../../components/HeaderPage/HeaderPage';

import './../EstiloPaginas.scss';

export default function Usuario(): JSX.Element {

    return (
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
                    <Button color='success'>
                        <FontAwesomeIcon className='me-2' icon={faPlus} />
                        Novo
                    </Button>
                </CardFooter>
            </Card>


        </main>
    );
}