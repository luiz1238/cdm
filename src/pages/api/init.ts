import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(404).end();

    const config = await prisma.config.findUnique({ where: { name: 'init' } });

    if (config && config.value) return res.status(400).end();

    await Promise.all([
        prisma.config.createMany({ data: databaseData.config }),
        prisma.info.createMany({ data: databaseData.info }),
        prisma.extraInfo.createMany({ data: databaseData.extraInfo }),
        prisma.attribute.createMany({ data: databaseData.attribute }),
        prisma.spec.createMany({ data: databaseData.spec }),
        prisma.characteristic.createMany({ data: databaseData.characteristic }),
        prisma.currency.createMany({ data: databaseData.currency }),
        prisma.specialization.createMany({ data: databaseData.specialization }),
        prisma.equipment.createMany({ data: databaseData.equipment }),
        prisma.item.createMany({ data: databaseData.item }),
        prisma.spell.createMany({ data: databaseData.spell }),
    ]);

    await Promise.all([
        prisma.attributeStatus.createMany({ data: databaseData.attribute_status }),
        prisma.skill.createMany({ data: databaseData.skill }),
    ]);

    res.end();
}

const databaseData = {
    config: [
        {
            name: 'init',
            value: JSON.stringify(true)
        },
        {
            name: 'environment',
            value: 'idle'
        },
        {
            name: 'admin_key',
            value: '123456'
        },
        {
            name: 'enable_success_types',
            value: JSON.stringify(false)
        },
        {
            name: 'dice',
            value: JSON.stringify({
                base: {
                    value: 20,
                    branched: false
                },
                attribute: {
                    value: 100,
                    branched: false
                }
            })
        },
        {
            name: 'portrait',
            value: JSON.stringify({
                attributes: ['Vida', 'Sanidade'],
                side_attribute: 'Magia'
            })
        }
    ],
    attribute: [
        {
            id: 1,
            name: 'Vida',
            color: 'b62323',
            rollable: false
        },
        {
            id: 2,
            name: 'Sanidade',
            color: '1f3ce0',
            rollable: true
        },
        {
            id: 3,
            name: 'Magia',
            color: 'ae00ff',
            rollable: false
        }
    ],
    attribute_status: [
        {
            name: 'Inconsciente',
            attribute_id: 1
        },
        {
            name: 'Ferimento Grave',
            attribute_id: 1
        },
        {
            name: 'Traumatizado',
            attribute_id: 3
        },
        {
            name: 'Enlouquecido',
            attribute_id: 3
        }
    ],
    characteristic: [
        { name: 'For??a' },
        { name: 'Destreza' },
        { name: 'Intelig??ncia' },
        { name: 'Constitui????o' },
        { name: 'Apar??ncia' },
        { name: 'Poder' },
        { name: 'Tamanho' },
        { name: 'Educa????o' }
    ],
    currency: [
        { name: 'N??vel de Gasto Di??rio' },
        { name: 'Dinheiro' }
    ],
    equipment: [
        {
            name: 'Desarmado',
            type: 'Comum',
            damage: '1d3+DB',
            range: 'Toque',
            attacks: '1',
            ammo: null,
            visible: true
        }
    ],
    extraInfo: [
        { name: 'Patrim??nio e Posses' },
        { name: 'Personalidade' },
        { name: 'Backstory' },
        { name: 'Itens, Pessoas e Locais Importantes' },
        { name: 'Fobias e Manias' }
    ],
    info: [
        {
            name: 'Nome',
            'default': true
        },
        {
            name: 'Player',
            'default': false
        },
        {
            name: 'Ocupa????o',
            'default': false
        },
        {
            name: 'Idade',
            'default': false
        },
        {
            name: 'G??nero',
            'default': false
        },
        {
            name: 'Resid??ncia',
            'default': false
        },
        {
            name: 'Local de Nascimento',
            'default': false
        },
        {
            name: 'Peso',
            'default': false
        },
        {
            name: 'Altura',
            'default': false
        }
    ],
    item: [
        {
            name: 'Chapa de Identifica????o',
            description: 'Uma chapa de identifica????o militar.',
            weight: 0,
            visible: true
        },
        {
            name: 'Vestimentas',
            description: 'Descreva suas vestimentas aqui.',
            weight: 0,
            visible: true
        },
        {
            name: 'Celular',
            description: 'Um celular comum.',
            weight: 0,
            visible: true
        },
        {
            name: 'Isqueiro',
            description: 'Um isqueiro comum.',
            weight: 0,
            visible: true
        },
        {
            name: 'Mochila',
            description: 'Uma mochila comum. Descreva aqui seu tamanho e sua capacidade.',
            weight: 0,
            visible: true
        },
        {
            name: 'Maleta',
            description: 'Uma maleta comum. Descreva aqui seu tamanho e sua capacidade.',
            weight: 0,
            visible: true
        },
        {
            name: 'Mala',
            description: 'Uma mala comum. Descreva aqui seu tamanho e sua capacidade.',
            weight: 0,
            visible: true
        },
        {
            name: 'Bolsa',
            description: 'Uma bolsa comum. Descreva aqui seu tamanho e sua capacidade.',
            weight: 0,
            visible: true
        },
        {
            name: 'Rel??gio',
            description: 'Um rel??gio comum.',
            weight: 0,
            visible: true
        },
        {
            name: 'Carteira',
            description: 'Uma carteira comum.',
            weight: 0,
            visible: true
        },
        {
            name: 'Livro',
            description: 'Um livro comum. Descreva aqui o conte??do do livro.',
            weight: 0,
            visible: true
        },
        {
            name: 'Livro de Ocultismo',
            description: 'Um livro de ocultismo. Descreva aqui seu conte??do.',
            weight: 0,
            visible: true
        },
        {
            name: 'Kit M??dico',
            description: 'Um kit m??dico que garante vantagem em Primeiros Socorros/Medicina no uso.',
            weight: 0,
            visible: true
        }
    ],
    skill: [
        {
            name: 'Antropologia',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Arcos',
            specialization_id: 1,
            mandatory: false
        },
        {
            name: 'Armas Pesadas',
            specialization_id: 1,
            mandatory: false
        },
        {
            name: 'Lan??a-Chamas',
            specialization_id: 1,
            mandatory: false
        },
        {
            name: 'Metralhadoras',
            specialization_id: 1,
            mandatory: false
        },
        {
            name: 'Pistolas',
            specialization_id: 1,
            mandatory: true
        },
        {
            name: 'Rifles/Espingardas',
            specialization_id: 1,
            mandatory: true
        },
        {
            name: 'Submetralhadoras',
            specialization_id: 1,
            mandatory: false
        },
        {
            name: 'Arqueologia',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Arremessar',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Atua????o',
            specialization_id: 2,
            mandatory: false
        },
        {
            name: 'Belas Artes',
            specialization_id: 2,
            mandatory: false
        },
        {
            name: 'Criptografia',
            specialization_id: 2,
            mandatory: false
        },
        {
            name: 'Falsifica????o',
            specialization_id: 2,
            mandatory: false
        },
        {
            name: 'Fotografia',
            specialization_id: 2,
            mandatory: false
        },
        {
            name: 'Artilharia',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Avalia????o',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Cavalgar',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Charme',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Chaveiro',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Astronomia',
            specialization_id: 3,
            mandatory: false
        },
        {
            name: 'Biologia',
            specialization_id: 3,
            mandatory: false
        },
        {
            name: 'Bot??nica',
            specialization_id: 3,
            mandatory: false
        },
        {
            name: 'Ci??ncia Forense',
            specialization_id: 3,
            mandatory: false
        },
        {
            name: 'Engenharia',
            specialization_id: 3,
            mandatory: false
        },
        {
            name: 'Farm??cia',
            specialization_id: 3,
            mandatory: false
        },
        {
            name: 'F??sica',
            specialization_id: 3,
            mandatory: false
        },
        {
            name: 'Geologia',
            specialization_id: 3,
            mandatory: false
        },
        {
            name: 'Matem??tica',
            specialization_id: 3,
            mandatory: false
        },
        {
            name: 'Meteorologia',
            specialization_id: 3,
            mandatory: false
        },
        {
            name: 'Qu??mica',
            specialization_id: 3,
            mandatory: false
        },
        {
            name: 'Zoologia',
            specialization_id: 3,
            mandatory: false
        },
        {
            name: 'Consertos El??tricos',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Consertos Mec??nicos',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Contabilidade',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Demoli????es',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Direito',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Dirigir Autom??veis',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Disfarce',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Eletr??nica',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Encontrar',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Escalar',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Escutar',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Esquivar',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Furtividade',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Hipnose',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Hist??ria',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Intimida????o',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'L??bia',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Leitura Labial',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Nativa',
            specialization_id: 4,
            mandatory: true
        },
        {
            name: 'Briga',
            specialization_id: 5,
            mandatory: true
        },
        {
            name: 'Chicotes',
            specialization_id: 5,
            mandatory: false
        },
        {
            name: 'Espadas',
            specialization_id: 5,
            mandatory: false
        },
        {
            name: 'Garrote',
            specialization_id: 5,
            mandatory: false
        },
        {
            name: 'Lan??as',
            specialization_id: 5,
            mandatory: false
        },
        {
            name: 'Machados',
            specialization_id: 5,
            mandatory: false
        },
        {
            name: 'Manguais',
            specialization_id: 5,
            mandatory: false
        },
        {
            name: 'Motosserras',
            specialization_id: 5,
            mandatory: false
        },
        {
            name: 'Medicina',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Mergulho',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Mundo Natural',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Nata????o',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Navega????o',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'N??vel de Cr??dito',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Ocultismo',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Operar Maquin??rio Pesado',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Persuas??o',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Aeronave',
            specialization_id: 6,
            mandatory: false
        },
        {
            name: 'Barco',
            specialization_id: 6,
            mandatory: false
        },
        {
            name: 'Prestidigita????o',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Primeiros Socorros',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Psican??lise',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Psicologia',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Rastrear',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Saltar',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Treinar Animais',
            specialization_id: null,
            mandatory: false
        },
        {
            name: 'Usar Bibliotecas',
            specialization_id: null,
            mandatory: true
        },
        {
            name: 'Usar Computadores',
            specialization_id: null,
            mandatory: false
        }
    ],
    spec: [
        { name: 'Dano B??nus' },
        { name: 'Corpo' },
        { name: 'Exposi????o Paranormal' },
        { name: 'Taxa de Movimento' }
    ],
    specialization: [
        {
            id: 1,
            name: 'Armas de Fogo'
        },
        {
            id: 2,
            name: 'Arte e Of??cio'
        },
        {
            id: 3,
            name: 'Ci??ncia'
        },
        {
            id: 4,
            name: 'L??ngua'
        },
        {
            id: 5,
            name: 'Lutar'
        },
        {
            id: 6,
            name: 'Pilotar'
        },
        {
            id: 7,
            name: 'Sobreviv??ncia'
        }
    ],
    spell: [
        {
            name: 'Bola de Fogo',
            description: 'Gera uma pequena bola de fogo na m??o do usu??rio.',
            cost: '1d4+2 PM',
            type: 'Nenhum',
            target: '??nico',
            damage: '1d10',
            castingTime: 'Instant??neo',
            range: '25 Metros',
            duration: 'Instant??neo',
            slots: 1,
            visible: true
        }
    ]
};