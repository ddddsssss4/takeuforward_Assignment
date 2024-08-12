import express from "express"
import prisma from "../prismaclient/prismClient.js"
const router = express.Router()


router.post('/admin',async(req,res)=>{
  const {question , answer} = req.body;
  try {
    const flashcard = await prisma.flashcard.create({
      data: { question, answer }
    });
    res.json(flashcard);
  } catch (error) {
    console.error('Error:', error); // Log the error for debugging
    res.status(500).json({
      error: 'Failed to create flashcard'
    });
  }
})


router.get('/admin/:id',async(req,res)=>{
  const {id} = req.params;
  console.log(id);
  try{
    const flashcard = await prisma.flashcard.findUnique({
      where:{
        id:parseInt(id)
      },
    });
    if(flashcard){
      res.status(200).json(flashcard);
    }else{
      res.status(404).json({
        error:'Flashcard not found'
      })
    }
  }catch(error){
    console.log('Error fetching flashcard:',error);
    res.status(500).json({
      error:'Internal server error'
    })
  }
});

router.put('/admin/:id', async(req,res)=>{
  console.log(req.body);
  const {id} = req.params;
  const {question,answer} = req.body;
  try{
    const updateFlashCard = await prisma.flashcard.update({
      where: {id: parseInt(id)},
      data:{question,answer}
    })
    console.log(updateFlashCard);
  }catch(error){
    console.log('Error updating flashcard:',error);
    res.status(500).json({
      error:'Internal server error'
    })
  }
});


router.delete('/admin/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.flashcard.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting flashcard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default router;