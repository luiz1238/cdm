import { NextApiRequest } from 'next';
import prisma from '../../../../utils/database';
import { sessionAPI } from '../../../../utils/session';
import { NextApiResponseServerIO } from '../../../../utils/socket';

function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
    if (req.method === 'POST') return handlePost(req, res);
    if (req.method === 'PUT') return handlePut(req, res);
    if (req.method === 'DELETE') return handleDelete(req, res);
    res.status(404).send({ message: 'Supported methods: POST | PUT | DELETE' });
}

async function handlePost(req: NextApiRequest, res: NextApiResponseServerIO) {
    const player = req.session.player;
    const itemID = req.body.id;

    if (!player) {
        res.status(401).end();
        return;
    }

    if (!itemID) {
        res.status(400).send({ message: 'Item ID is undefined.' });
        return;
    }

    const quantity = req.body.quantity;
    const currentDescription = req.body.currentDescription;

    await prisma.playerItem.update({
        where: { player_id_item_id: { player_id: player.id, item_id: itemID } },
        data: { quantity, currentDescription }
    });

    res.end();

    res.socket.server.io?.to('admin').emit('itemChange', player.id, itemID, currentDescription, quantity);
}

async function handlePut(req: NextApiRequest, res: NextApiResponseServerIO) {
    const player = req.session.player;

    if (!player) {
        res.status(401).end();
        return;
    }

    const itemID = req.body.id;

    if (!itemID) {
        res.status(400).send({ message: 'Item ID is undefined.' });
        return;
    }

    const item = await prisma.playerItem.create({
        data: {
            currentDescription: '',
            quantity: 1,
            player_id: player.id,
            item_id: itemID
        },
        select: {
            quantity: true, currentDescription: true, Item: {
                select: { id: true, name: true, description: true, weight: true }
            }
        }
    });

    await prisma.playerItem.update({
        where: { player_id_item_id: { player_id: player.id, item_id: itemID } },
        data: { currentDescription: item.Item.description }
    });

    item.currentDescription = item.Item.description;

    res.send({ item });

    res.socket.server.io?.to('admin').emit('itemAdd', player.id, item);
}

async function handleDelete(req: NextApiRequest, res: NextApiResponseServerIO) {
    const player = req.session.player;

    if (!player) {
        res.status(401).end();
        return;
    }

    const itemID = req.body.id;

    if (!itemID) {
        res.status(400).send({ message: 'Item ID is undefined.' });
        return;
    }

    await prisma.playerItem.delete({
        where: { player_id_item_id: { player_id: player.id, item_id: itemID } }
    });

    res.end();

    res.socket.server.io?.to('admin').emit('itemRemove', player.id, itemID);
}

export default sessionAPI(handler);