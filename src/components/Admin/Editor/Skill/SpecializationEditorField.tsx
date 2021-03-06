import { Specialization } from '@prisma/client';
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { BsTrash } from 'react-icons/bs';
import { ErrorLogger } from '../../../../contexts';
import useExtendedState from '../../../../hooks/useExtendedState';
import api from '../../../../utils/api';
import BottomTextInput from '../../../BottomTextInput';

type SpecializationEditorFieldProps = {
    specialization: Specialization;
    onDelete(id: number): void;
    onNameChange?(id: number, newName: string): void;
}

export default function SpecializationEditorField(props: SpecializationEditorFieldProps) {
    const [lastName, name, setName] = useExtendedState(props.specialization.name);
    const logError = useContext(ErrorLogger);

    function onBlur() {
        if (name === lastName) return;
        setName(name);
        if (props.onNameChange) props.onNameChange(props.specialization.id, name);
        api.post('/sheet/specialization', { id: props.specialization.id, name }).catch(logError);
    }

    return (
        <tr>
            <td>
                <Button onClick={() => props.onDelete(props.specialization.id)} size='sm' variant='secondary'>
                    <BsTrash color='white' size={24} />
                </Button>
            </td>
            <td>
                <BottomTextInput value={name} onChange={ev => setName(ev.currentTarget.value)}
                    onBlur={onBlur} />
            </td>
        </tr>
    );
}