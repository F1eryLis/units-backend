import { Router, type Request, type Response } from "express";
import prisma from "../prisma/prisma";

const router = Router();

/**
 * @swagger
 * /phonelist:
 *   get:
 *     tags: [Phone List]
 *     summary: Returns all phonelist
 *     responses:
 *       200:
 *         description: A list of phonelist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 phones:
 *                   type: array
 *                   items:
 *                     type: string
 *             example:
 *               id: 1
 *               name: "List name"
 *               phones: ["123456789", "987654321"]
 */
router.get('/', async (req, res) => {
    try {
        const phoneList = await prisma.phoneList.findMany();
        res.json(phoneList);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /phonelist/{id}:
 *   get:
 *     tags: [Phone List]
 *     summary: Get phonelist by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Phonelist id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Phonelist found
 *       404:
 *         description: Phonelist not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const phoneList = await prisma.phoneList.findUnique({
            where: { id: parseInt(id) }
        });
        if (!phoneList) {
            res.status(404).json({ error: 'Phone List not found' });
            return;
        }

        res.json(phoneList);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /phonelist:
 *   post:
 *     tags: [Phone List]
 *     summary: Create a new phonelist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phones:
 *                 type: array
 *                 items:
 *                   type: string
 *           example:
 *             name: "List name"
 *             phone: ["123456789", "987654321"]
 *     responses:
 *       201:
 *         description: Phonelist created
 *       500:
 *         description: Internal Server Error
 */
router.post('/', async (req, res) => {
    try {
        const { name, phones } = req.body;
        const newPhoneList = await prisma.phoneList.create({
            data: {
                name,
                phones
            }
        });
        res.status(201).json(newPhoneList);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /phonelist/{id}:
 *   put:
 *     tags: [Phone List]
 *     summary: Update phonelist by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Phonelist id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phones:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Phonelist updated
 *       404:
 *         description: Phonelist not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, phones } = req.body;
        const updatedPhoneList = await prisma.phoneList.update({
            where: { id: parseInt(id) },
            data: {
                name,
                phones
            }
        });
        if (!updatedPhoneList) {
            res.status(404).json({ error: 'Phone List not found' });
            return;
        }

        res.json(updatedPhoneList);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /phonelist/{id}:
 *   delete:
 *     tags: [Phone List]
 *     summary: Delete phonelist by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Phonelist id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Phonelist deleted
 *       404:
 *         description: Phonelist not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedPhoneList = await prisma.phoneList.delete({
            where: { id: parseInt(id) }
        });
        if (!deletedPhoneList) {
            res.status(404).json({ error: 'Phone List not found' });
            return;
        }

        res.json(deletedPhoneList);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;