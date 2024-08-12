import express from 'express'
const router = express.Router();
import prisma from '../prismaclient/prismClient.js';

router.get('/user',async(req,res)=>{
  try{
   const flashCards = await prisma.flashcard.findMany();
   res.status(200).json(flashCards);
  }catch(error){
    console.error('Error fetching flashcards:',error);
  res.status(500).json({error: 'Internal server error'});
  }
})

export default router