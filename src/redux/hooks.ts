import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";
import type { RootState } from "./index";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
