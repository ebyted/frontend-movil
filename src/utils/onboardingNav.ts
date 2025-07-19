// Helper to get next onboarding screen name
export function getNextOnboardingScreen(current: string): string {
  const screens = [
    "TempleScreen",
    "EmotionScreen",
    "IntentionScreen",
    "PersonalDataScreen",
    "SkinSelectorOnboarding",
    "WelcomeScreen"
  ];
  const idx = screens.indexOf(current);
  return screens[Math.min(idx + 1, screens.length - 1)];
}
