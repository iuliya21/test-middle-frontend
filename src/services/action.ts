type TLanguageActionTypes = typeof setLanguage;

const setLanguage = (language: string) => ({
  type: "SET_LANGUAGE" as const,
  payload: language,
})

export { setLanguage };
export type { TLanguageActionTypes };
