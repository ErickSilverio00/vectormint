import Loading from "@/assets/animations/loading-MC.json";
import useLoadingStore from "@/store/use-loading-store";
import { useColors } from "@/styles/colors";
import { useMediaQuery } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Lottie from "lottie-react";
import { ContainerLoading, EscritaLoading } from "./styles";

export default function ModalLoading() {
  const { branco } = useColors();
  const isScreenSmall = useMediaQuery("(max-width: 672px)");
  const { isLoading } = useLoadingStore();

  return (
    <>
      {isLoading && (
        <Backdrop
          sx={{ color: branco, zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <ContainerLoading>
            <Lottie
              animationData={Loading}
              autoPlay={true}
              loop={true}
              width="100%"
              height="100%"
              style={{ height: isScreenSmall ? "70%" : "80%" }}
            />
            <EscritaLoading>Processando informações...</EscritaLoading>
          </ContainerLoading>
        </Backdrop>
      )}
    </>
  );
}
