import express from 'express';
import sendMail from '../utils/sendmail.ts';

const router = express.Router();

/**
 * @swagger 
 * /email:
 *   post:
 *     summary: Returns the list of all the books
 *     parameters:
        - in: path
          name: userId
          schema:
            type: integer
          required: true
          description: Numeric ID of the user to get
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           
 */

router.post("/", async (req,res) => {
  try {
    const result = await sendMail(req.body.data, req.body.template);
    res.status(200).send({"message": "Email sent success", result})
  } catch(err) {
    res.status(500).send(err)
  }
})
export default router;
