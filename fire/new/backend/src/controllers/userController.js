import admin from 'firebase-admin';

const getDb = () => admin.firestore();

export const getProfile = async (req, res) => {
  try {
    const { uid } = req.user;
    const db = getDb();
    const doc = await db.collection('users').doc(uid).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    return res.status(200).json({ profile: doc.data() });
  } catch (err) {
    console.error('getProfile error:', err.message);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
};
