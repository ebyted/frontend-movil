import axios from "axios";
export async function onboardingStart() {
  const res = await axios.post("/onboarding/start");
  return res.data.session_id;
}
export async function onboardingSaveTemple(sessionId, templeName) {
  return axios.post("/onboarding/temple", { session_id: sessionId, temple_name: templeName });
}
export async function onboardingSaveEmotion(sessionId, emotion) {
  return axios.post("/onboarding/emotional-state", { session_id: sessionId, emotional_state: emotion });
}
export async function onboardingSaveIntention(sessionId, intention) {
  return axios.post("/onboarding/intention", { session_id: sessionId, intention });
}
export async function onboardingSavePersonalData(sessionId, fullName, birthDate, birthPlace, birthTime) {
  return axios.post("/onboarding/personal-data", { session_id: sessionId, full_name: fullName, birth_date: birthDate, birth_place: birthPlace, birth_time: birthTime });
}
export async function onboardingCompleteRegistration(sessionId, email, password) {
  return axios.post("/onboarding/complete-registration", { session_id: sessionId, email, password });
}
export async function onboardingGetStatus(sessionId) {
  return axios.get(`/onboarding/status/${sessionId}`);
}
export async function onboardingGenerateWelcome(sessionId) {
  return axios.post("/onboarding/generate-welcome", { session_id: sessionId });
}
