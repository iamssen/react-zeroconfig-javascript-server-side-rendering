import { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';

export function useInitialState(defaultInitialState) {
  const [initialState, setInitialState] = useState(defaultInitialState);
  const {location} = useReactRouter();
  const [lastLocation, setLastLocation] = useState(location);
  
  useEffect(() => {
    if (lastLocation.pathname !== location.pathname) {
      setLastLocation(location);
      setInitialState(null);
    }
  }, [location]);
  
  return {initialState};
}