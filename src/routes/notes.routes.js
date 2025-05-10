import { Router } from "express";
import { getNote, createNote,  getNotes, assignNoteToProduct, getProductWithNotesById, getProductsWithNotes, deleteProductWhitNote, deleteNote } from "../controllers/notes.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";


const router = Router();

router.get('/notes', getNotes);

router.get('/notes/:id', getNote);

router.delete('/notes/:id', authRequired, deleteNote);

router.post('/notes', authRequired, createNote);

router.post('/notes/product-notes', authRequired, assignNoteToProduct);

router.delete('/notes/product-notes/:id', authRequired, deleteProductWhitNote);

router.get('/notes/product-notes', getProductsWithNotes);

router.get('/notes/product-notes/:id', getProductWithNotesById);


// router.delete('/notes/:id', authRequired, d);

// router.put('/notes/:id', authRequired, updateOrder);

export default router;