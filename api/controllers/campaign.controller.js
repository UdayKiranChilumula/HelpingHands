import Campaign from '../models/campaign.model.js';

// Create a new campaign
export const createCampaign = async (req, res) => {
  try {
    const newCampaign = new Campaign(req.body);
    const savedCampaign = await newCampaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a specific campaign by ID
export const getCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json(campaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all campaigns
export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a campaign by ID
export const updateCampaign = async (req, res) => {
  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Returns the updated document
    );
    if (!updatedCampaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json(updatedCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a campaign by ID
export const deleteCampaign = async (req, res) => {
  try {
    const deletedCampaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!deletedCampaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update raised amount after successful payment
export const updateRaisedAmount = async (req, res) => {
  const { amount } = req.body;
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

    campaign.raisedAmount += parseFloat(amount);
    await campaign.save();

    res.json({ message: 'Payment successful', raisedAmount: campaign.raisedAmount });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
