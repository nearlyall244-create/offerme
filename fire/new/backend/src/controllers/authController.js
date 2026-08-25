import { auth } from '../config/firebaseAdmin.js';
import admin from 'firebase-admin';

const getDb = () => admin.firestore();

const ALLOWED_REGISTRATION_ROLES = ['user', 'business_owner'];

export const registerProfile = async (req, res) => {
  try {
    const { uid } = req.user;
    const { name, email, phone, location, role } = req.body;

    if (!ALLOWED_REGISTRATION_ROLES.includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Allowed: user, business_owner' });
    }

    const db = getDb();
    const existing = await db.collection('users').doc(uid).get();

    const profile = {
      uid,
      name: name || '',
      email: email || req.user.email || '',
      phone: phone || '',
      location: location || '',
      role,
      updatedAt: new Date().toISOString(),
    };

    if (existing.exists) {
      await db.collection('users').doc(uid).set(profile, { merge: true });
      return res.status(200).json({ message: 'Profile updated', profile });
    }

    profile.createdAt = new Date().toISOString();
    await db.collection('users').doc(uid).set(profile);

    try {
      await auth.setCustomUserClaims(uid, { role });
    } catch (claimErr) {
      console.warn('setCustomUserClaims failed (non-fatal):', claimErr.message);
    }

    return res.status(201).json({ message: 'Profile created', profile });
  } catch (err) {
    console.error('registerProfile error:', err.message);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
};

export const getMe = async (req, res) => {
  try {
    const { uid } = req.user;
    const db = getDb();
    const doc = await db.collection('users').doc(uid).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    return res.status(200).json({ profile: doc.data() });
  } catch (err) {
    console.error('getMe error:', err.message);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
};
