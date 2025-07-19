import axios from 'axios';

export const getProfile = async () => {
  const res = await axios.get('/profile');
  return res.data;
};

export const updateProfile = async (profileData: any) => {
  const res = await axios.put('/profile', profileData);
  return res.data;
};

export const getHeartRate = async () => {
  const res = await axios.get('/profile/heart-rate');
  return res.data;
};

export const getDashboard = async () => {
  const res = await axios.get('/profile/dashboard');
  return res.data;
};

export const getAchievements = async () => {
  const res = await axios.get('/profile/achievements');
  return res.data;
};

export const changePassword = async (oldPassword: string, newPassword: string) => {
  const res = await axios.post('/profile/change-password', { oldPassword, newPassword });
  return res.data;
};
