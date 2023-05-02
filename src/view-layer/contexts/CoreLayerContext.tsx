import { PropsWithChildren, createContext, useContext } from "react";
import { CoreLayer } from "../../core-layer/index";

const CoreLayerContext = createContext<CoreLayer>({} as CoreLayer);

export function CoreLayerProvider(
  props: PropsWithChildren<{ coreLayer: CoreLayer }>
) {
  return (
    <CoreLayerContext.Provider value={props.coreLayer}>
      {props.children}
    </CoreLayerContext.Provider>
  );
}

export function useCoreLayer() {
  return useContext(CoreLayerContext);
}
