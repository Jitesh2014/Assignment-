const express = require('express');
const Card = require('../model/Card');
const router = express.Router();

// Create a new card
router.post('/cards', async (req, res) => {
    const { title, description } = req.body;

    try {
        const card = new Card({ title, description });
        await card.save();
        res.status(201).json(card);
    } catch (err) {
        res.status(500).json({ message: 'Error creating card', error: err.message });
    }
});

// Get all cards
router.get('/cards', async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving cards', error: err.message });
    }
});

// Get a specific card by title
router.get('/cards/:title', async (req, res) => {
    const { title } = req.params;

    try {
        const card = await Card.findOne({ title });

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.status(200).json(card);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving card', error: err.message });
    }
});

module.exports = router;

router.delete("/cards/:title",async (req,res)=>{
    const { title } = req.params;
    try {
        const card = await Card.findOneAndDelete({ title });

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.status(200).json({
            success:true,
            message:"Card deleted successfully",
            card
        });
    } catch (err) {
        res.status(500).json({ message: 'Error while deleting card', error: err.message });
    }

})
