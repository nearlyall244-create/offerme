import admin from 'firebase-admin';
import { Resend } from 'resend';

const getDb = () => admin.firestore();
const resend = new Resend(process.env.RESEND_API_KEY);

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const db = getDb();
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await db.collection('otps').doc(email).set({
      email,
      otp,
      expiresAt: expiresAt.toISOString(),
      createdAt: new Date().toISOString(),
      verified: false,
    });

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Your Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px;">
          <h2 style="text-align: center; color: #333;">Email Verification</h2>
          <p style="color: #555; font-size: 16px;">Your OTP verification code is:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 8px;">${otp}</span>
          </div>
          <p style="color: #777; font-size: 14px;">This code will expire in 10 minutes.</p>
          <p style="color: #777; font-size: 14px;">If you did not request this code, please ignore this email.</p>
        </div>
      `,
    });

    return res.status(200).json({ message: 'OTP sent successfully', email });
  } catch (err) {
    console.error('sendOTP error:', err.message);
    return res.status(500).json({ error: err.message || 'Failed to send OTP' });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const db = getDb();
    const doc = await db.collection('otps').doc(email).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'OTP not found. Please request a new one.' });
    }

    const data = doc.data();

    if (data.verified) {
      return res.status(400).json({ error: 'OTP already verified' });
    }

    if (new Date(data.expiresAt) < new Date()) {
      return res.status(400).json({ error: 'OTP expired. Please request a new one.' });
    }

    if (data.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    await db.collection('otps').doc(email).update({ verified: true });

    await db.collection('users').doc(email).set({ emailVerified: true }, { merge: true });

    return res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    console.error('verifyOTP error:', err.message);
    return res.status(500).json({ error: err.message || 'Failed to verify OTP' });
  }
};

export const checkVerification = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const db = getDb();
    const doc = await db.collection('otps').doc(email).get();

    if (!doc.exists) {
      return res.status(200).json({ verified: false });
    }

    return res.status(200).json({ verified: doc.data().verified });
  } catch (err) {
    console.error('checkVerification error:', err.message);
    return res.status(500).json({ error: err.message || 'Failed to check verification' });
  }
};
