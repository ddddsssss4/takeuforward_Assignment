import express from "express"
const router = express.Router();
import prisma from "../prismaclient/prismClient.js";

router.post('/',async(req,res)=>{
  const {question , answer} = req.body;
  console.log(req.body)
  try{
  const flashcard = await prisma.flashcard.create({
    data: {
      question,
      answer
    }
  }); 

    res.json(flashcard);
  }catch(error){
   console.log(error)
  }

});




export default router;
