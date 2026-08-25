import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';
import admin from 'firebase-admin';

const router = Router();

router.get('/dashboard', authenticate, authorize('admin'), async (req, res) => {
  try {
    const db = admin.firestore();
    const usersSnap = await db.collection('users').get();
    const users = [];
    usersSnap.forEach((doc) => users.push(doc.data()));

    const stats = {
      totalUsers: users.filter((u) => u.role === 'user').length,
      totalBusinessOwners: users.filter((u) => u.role === 'business_owner').length,
      totalAdmins: users.filter((u) => u.role === 'admin').length,
      totalAll: users.length,
    };

    return res.status(200).json({ stats, users });
  } catch (err) {
    console.error('adminDashboard error:', err.message);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

export default router;
