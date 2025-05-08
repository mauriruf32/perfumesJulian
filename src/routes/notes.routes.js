import { Router } from "express";
import { getNote, createNote,  getNotes, assignNoteToProduct, getProductWithNotesById, getProductsWithNotes } from "../controllers/notes.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";


const router = Router();

router.get('/notes', getNotes);

router.get('/notes/:id', getNote);

router.post('/notes', authRequired, createNote);

router.post('/notes/product-notes', authRequired, assignNoteToProduct);

router.get('/notes/product-notes', getProductsWithNotes);

router.get('/notes/product-notes/:id', getProductWithNotesById);


// router.delete('/notes/:id', authRequired, d);

// router.put('/notes/:id', authRequired, updateOrder);

export default router;