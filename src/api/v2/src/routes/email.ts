import express, {Router} from 'express';
import sendMail from '../utils/sendmail.ts';

const router: Router = express.Router();

router.post("/", async (req,res) => {
  try {
    const result = await sendMail(req.body.data, req.body.template);
    res.status(200).send({"message": "Email sent success", result})
  } catch(error) {
    res.status(500).send(error)
  }
})
export default router;
