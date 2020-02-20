import { useEffect, useRef } from 'react';

export default function useEventListener(eventName, handler, element = window) {

  const savedHandler = useRef();

  // https://codesandbox.io/s/z64on3ypm

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(

    () => {

        console.log("element", element, element.addEventListener)
      if (!(element && element.addEventListener)) {
          return;
      }

      

      // Create event listener that calls handler function stored in ref
      const eventListener = event => savedHandler.current(event);

      // Add event listener
      element.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };

    }, [eventName, element] );

}