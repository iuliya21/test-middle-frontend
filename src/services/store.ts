import { createStore, combineReducers } from "redux";

type TInitialState = {
  language: string;
};

type TLanguageAction = {
  type: "SET_LANGUAGE";
  payload: string;
};

const initialState: TInitialState = {
  language: "ru",
};

const languageReducer = (
  state = initialState.language,
  action: TLanguageAction
) => {
  switch (action.type) {
    case "SET_LANGUAGE":
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  language: languageReducer,
});

const store = createStore(rootReducer);

export default store;
export type RootState = ReturnType<typeof rootReducer>;