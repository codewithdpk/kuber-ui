import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface DeploymentGlobalState {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const initialState: DeploymentGlobalState = {
  isDialogOpen: false,
  setIsDialogOpen: () => {
    return;
  },
};

const DeploymentContext = createContext(initialState);

export default function DeploymentContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <DeploymentContext.Provider value={{isDialogOpen, setIsDialogOpen }}>
      {children}
    </DeploymentContext.Provider>
  );
}

export const useDeployment = () => useContext(DeploymentContext);
