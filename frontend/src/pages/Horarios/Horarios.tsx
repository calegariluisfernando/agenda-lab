import React from 'react';
import { Card, CardBody, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap';
import HeaderPage from '../../components/HeaderPage/HeaderPage';

export default function Horarios(): JSX.Element {
    return (
        <main>
            <div className="container-fluid">
                <div className="row">
                    <div className="col col-12">

                        <HeaderPage
                            title='Horários'
                            shortDescription='Cadastro de novos horários'
                        />


                        <Card className='mt-3'>
                            <CardHeader>Filtros</CardHeader>
                            <CardBody>
                                <Form>
                                    <div className="row">
                                        <div className="col col-6">
                                            <FormGroup>
                                                <Label htmlFor='descricao'>Descrição:</Label>
                                                <Input
                                                    id='descricao'
                                                    name='descricao'
                                                    placeholder='Descrição'
                                                    type='text'
                                                />
                                            </FormGroup>
                                        </div>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}