import React, { createContext, useContext } from 'react';

export const OneSignalContext = createContext<{ usersId: string | null }>({ usersId: null });

export const useOneSignal = () => useContext(OneSignalContext);