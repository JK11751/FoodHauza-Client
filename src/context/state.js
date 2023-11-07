import {cloneElement} from "react";
import { DonationPackProvider, DonationsProvider, RequestsProvider} from ".";
import { ProvideAuth } from "../hooks/useAuth";

function ProviderComposer({contexts, children}) {
  return contexts.reduceRight(
    (kids, parent) =>
      cloneElement(parent, {
        children: kids,
      }),
    children
  );
}

const AppContextProvider = ({children}) => {
  return (
    <ProviderComposer
      contexts={[<ProvideAuth />, <DonationPackProvider/>, <DonationsProvider/>, <RequestsProvider/>]}
      value=""
    >
      {children}
    </ProviderComposer>
  );
};

export default AppContextProvider;
