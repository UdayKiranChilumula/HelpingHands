import express from 'express';
import {
  createCampaign,
  getCampaign,
  getAllCampaigns,
  updateCampaign,
  deleteCampaign,
  updateRaisedAmount
} from '../controllers/campaign.controller.js';

const router = express.Router();

router.post('/campaigns', createCampaign);
router.get('/campaigns/:id', getCampaign);
router.get('/campaigns', getAllCampaigns);
router.put('/campaigns/:id', updateCampaign);
router.delete('/campaigns/:id', deleteCampaign);

// Endpoint to update the raised amount after payment
router.post('/campaigns/pay/:id', updateRaisedAmount);

export default router;
