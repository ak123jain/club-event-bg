 
 import { User } from "../models/user.models.js";



// POST /api/waitlist
export const createWaitlist = async (req, res) => {
    try {
        const { email } = req.body;
    
        if (!email || !email.includes('@')) {
          return res.status(400).json({ message: 'Invalid email' });
        }
    
        const existing = await User.findOne({ email });

        if (existing) {
          return res.status(409).json({ message: 'Email already joined the waitlist' });
        }
    
        const saved = await User.create({ email });
        res.status(201).json({ message: 'Successfully joined the waitlist', data: saved });
    
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
}