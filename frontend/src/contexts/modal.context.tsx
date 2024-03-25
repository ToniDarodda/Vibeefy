import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface ViewStateProviderProps {
  children: ReactNode;
}

interface ModalContextInteface {
  mouseCoord: {
    clientX: number;
    clientY: number;
  };
  setMouseCoord: Dispatch<
    SetStateAction<{
      clientX: number;
      clientY: number;
    }>
  >;
  calculateModalCoordX: (
    clientX: number,
    componentRef: RefObject<HTMLDivElement>,
  ) => number;
}

const defaultValue: ModalContextInteface = {
  mouseCoord: {
    clientX: 0,
    clientY: 0,
  },
  calculateModalCoordX: () => 0,
  setMouseCoord: () => {},
};

const ModalContext = createContext(defaultValue);

export const ModalProvider: FC<ViewStateProviderProps> = ({ children }) => {
  const [mouseCoord, setMouseCoord] = useState<{
    clientX: number;
    clientY: number;
  }>({ clientX: 0, clientY: 0 });

  const calculateModalCoordX = (
    clientX: number,
    componentRef: RefObject<HTMLDivElement>,
  ) => {
    const { innerWidth: width } = window;
    const componentSize = componentRef.current?.offsetWidth ?? 100;

    if (clientX + componentSize > width) {
      return clientX - componentSize;
    }
    return clientX;
  };

  return (
    <ModalContext.Provider
      value={{ mouseCoord, setMouseCoord, calculateModalCoordX }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalProvider = () => useContext(ModalContext);
