import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import SheetModal from './SheetModal';

type CreateItemModalProps = {
    onCreate(name: string, description: string): void;
    show: boolean;
    onHide(): void;
}

export default function CreateItemModal(props: CreateItemModalProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function reset() {
        setName('');
        setDescription('');
    }

    return (
        <SheetModal title='Novo Item' show={props.show} onHide={props.onHide} onExited={reset}
            applyButton={{ name: 'Criar', onApply: () => props.onCreate(name, description) }}>
            <Container fluid>
                <Form.Group controlId='createItemName' className='mb-3'>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control className='theme-element' value={name}
                        onChange={ev => setName(ev.currentTarget.value)} />
                </Form.Group>
                <Form.Group controlId='createItemName' className='mb-3'>
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control className='theme-element' value={description}
                        onChange={ev => setDescription(ev.currentTarget.value)} />
                </Form.Group>
            </Container>
        </SheetModal>
    );
}