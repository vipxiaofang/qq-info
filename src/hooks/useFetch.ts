import { useMountedRef } from "hooks";
import { useCallback, useReducer } from "react";

type Status = "idle" | "loading" | "error" | "success";

interface State<D> {
  data: D | null;
  status: Status;
  error: Error | null;
}

const defaultInitialState: State<null> = {
  data: null,
  status: "idle",
  error: null,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export const useFetch = <D>(initialState?: State<D>) => {
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    { ...defaultInitialState, ...initialState }
  );
  const safeDispatch = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        status: "success",
        error: null,
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        data: null,
        status: "error",
        error,
      }),
    [safeDispatch]
  );

  const run = useCallback(
    async (promise: Promise<D>) => {
      safeDispatch({ status: "loading" });
      try {
        const res = await promise;
        return setData(res);
      } catch (err) {
        return setError(err as Error);
      }
    },
    [safeDispatch, setData, setError]
  );

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
