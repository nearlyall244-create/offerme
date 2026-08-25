const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const registerUser = async (userData) => {
  await delay(500);
  return { success: true, message: "OTP sent to your email.", email: userData.email };
};

export const verifyRegistrationOtp = async (email, otp) => {
  await delay(500);
  return { success: true, message: "Email verified successfully." };
};

export const loginUser = async (email, password) => {
  await delay(500);
  return { success: true, message: "OTP sent to your email.", email };
};

export const verifyLoginOtp = async (email, otp) => {
  await delay(500);
  return {
    success: true,
    message: "Login successful.",
    token: "mock-jwt-token-12345",
    user: { id: 1, name: "Demo User", email },
  };
};

export const resendOtp = async (email, purpose) => {
  await delay(500);
  return { success: true, message: "OTP resent successfully." };
};

export const forgotPassword = async (email) => {
  await delay(500);
  return { success: true, message: "OTP sent to your email." };
};

export const verifyForgotPasswordOtp = async (email, otp) => {
  await delay(500);
  return { success: true, message: "OTP verified.", resetToken: "mock-reset-token-12345" };
};

export const resetPassword = async (resetToken, newPassword) => {
  await delay(500);
  return { success: true, message: "Password reset successfully." };
};
