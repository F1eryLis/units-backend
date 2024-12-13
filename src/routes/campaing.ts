import { Router, type Request, type Response } from "express";
import prisma from "../prisma/prisma";

const router = Router();

/**
 * @swagger
 * /campaings:
 *   get:
 *     tags: [Campaings]
 *     summary: Returns all campaings
 *     responses:
 *       200:
 *         description: A list of campaings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 comLimit:
 *                   type: integer
 *                 dayLimit:
 *                   type: integer
 *                 status:
 *                   type: integer
 *                 startTime:
 *                   type: string
 *                   format: date-time
 *                 endTime:
 *                   type: string
 *                   format: date-time
 *                 days:
 *                   type: array
 *                   items:
 *                     type: integer
 *                 reactions:
 *                   type: object
 *                 soundFileId:
 *                   type: integer
 *                 phonesId:
 *                   type: integer
 *             example:
 *               id: 1
 *               name: "Campaing 1"
 *               comLimit: 10
 *               dayLimit: 10
 *               status: 1
 *               startTime: "2021-09-01T00:00:00.000Z"
 *               endTime: "2021-09-30T00:00:00.000Z"
 *               days: [1, 2, 3, 4, 5]
 *               reactions: {}
 *               soundFileId: 1
 *               phonesId: 1
 *               createdAt: "2021-09-01T00:00:00.000Z"
 *               updatedAt: "2021-09-01T00:00:00.000Z"
*/
router.get('/', async (req, res) => {
    try {
        const campaings = await prisma.campaing.findMany();
        res.status(200).json(campaings);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /campaings/{id}:
 *   get:
 *     tags: [Campaings]
 *     summary: Get campaing by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Campaing id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Campaing found
 *       404:
 *         description: Campaing not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const campaing = await prisma.campaing.findUnique({
            where: { id }
        });
        if (!campaing) {
            res.status(404).json({ error: 'Campaing not found' });
            return;
        }

        res.status(200).json(campaing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /campaings:
 *   post:
 *     tags: [Campaings]
 *     summary: Create a new campaing
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               comLimit:
 *                 type: integer
 *               dayLimit:
 *                 type: integer
 *               status:
 *                 type: integer
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               days:
 *                 type: array
 *                 items:
 *                   type: integer
 *               reactions:
 *                 type: object
 *               soundFileId:
 *                 type: integer
 *               phonesId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created campaing
 *       500:
 *         description: Internal Server Error
 */
router.post('/', async (req, res) => {
    try {
        const { name, comLimit, dayLimit, status, startTime, endTime, days, reactions, soundFileId, phonesId } = req.body;
        const campaing = await prisma.campaing.create({
            data: {
                name,
                comLimit,
                dayLimit,
                status,
                startTime,
                endTime,
                days,
                reactions,
                soundFileId,
                phonesId
            }
        });
        res.status(201).json(campaing);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /campaings/{id}:
 *   put:
 *     tags: [Campaings]
 *     summary: Update a campaing
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
 *               comLimit:
 *                 type: integer
 *               dayLimit:
 *                 type: integer
 *               status:
 *                 type: integer
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               days:
 *                 type: array
 *                 items:
 *                   type: integer
 *               reactions:
 *                 type: object
 *               soundFileId:
 *                 type: integer
 *               phonesId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated campaing
 *       404:
 *         description: Campaing not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, comLimit, dayLimit, status, startTime, endTime, days, reactions, soundFileId, phonesId } = req.body;

        const updatedCampaing = await prisma.campaing.update({
            where: { id },
            data: {
                name,
                comLimit,
                dayLimit,
                status,
                startTime,
                endTime,
                days,
                reactions,
                soundFileId,
                phonesId
            }
        });

        res.status(200).json(updatedCampaing);
    } catch (error) {
        if (error instanceof Object && 'code' in error && error.code === 'P2025') {
            res.status(404).json({ error: 'Campaing not found' });
            return;
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /campaings/{id}:
 *   delete:
 *     tags: [Campaings]
 *     summary: Delete a campaing
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Campaing deleted
 *       404:
 *         description: Campaing not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prisma.campaing.delete({
            where: { id }
        });
        res.status(204).send();
    } catch (error) {
        if (error instanceof Object && 'code' in error && error.code === 'P2025') {
            res.status(404).json({ error: 'Campaing not found' });
            return;
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;