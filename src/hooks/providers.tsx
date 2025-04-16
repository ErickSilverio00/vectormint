import React, { ReactNode } from "react";
import { UploadProvider } from "./upload/use-upload";

const Providers = React.memo(({ children }: { children: ReactNode }) => (
  <UploadProvider>{children}</UploadProvider>
));

export default Providers;
