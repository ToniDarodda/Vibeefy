import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface ViewStateContextInterface {
  viewState: ViewStateEnum;
  queueState: boolean;

  setQueueState: Dispatch<SetStateAction<boolean>>;
  setViewState: Dispatch<SetStateAction<ViewStateEnum>>;
}

interface ViewStateProviderProps {
  children: ReactNode;
}

export enum ViewStateEnum {
  ARTISTS,
  SEARCH,
  ALBUM,
  PLAYLIST,
  SELECTEDARTIST,
  YOUTUBE,
}

const defaultValue: ViewStateContextInterface = {
  viewState: ViewStateEnum.ARTISTS,
  queueState: false,
  setQueueState: () => {},
  setViewState: () => {},
};

const ViewStateContext = createContext(defaultValue);

export function usePlaylistView() {
  return useContext(ViewStateContext);
}

export const ViewStateProvider: React.FC<ViewStateProviderProps> = ({
  children,
}) => {
  const [viewState, setViewState] = useState<ViewStateEnum>(
    ViewStateEnum.ARTISTS,
  );

  const [queueState, setQueueState] = useState<boolean>(false);

  useEffect(() => {
    console.log(viewState);
  }, [viewState]);

  return (
    <ViewStateContext.Provider
      value={{ viewState, setViewState, queueState, setQueueState }}
    >
      {children}
    </ViewStateContext.Provider>
  );
};

export const useViewStateContext = () => useContext(ViewStateContext);
