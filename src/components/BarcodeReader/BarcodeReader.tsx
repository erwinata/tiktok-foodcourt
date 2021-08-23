import {
  AspectRatio,
  Box,
  Button,
  Center,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Quagga from "quagga";
import useSimpleEffect from "hooks/useSimpleEffect";
import { getLocal, setLocal } from "helpers/localStorage";

interface Props {}

const BarcodeReader: React.FC<Props> = () => {
  const [videoSize, setVideoSize] = useState({
    width: 1,
    height: 1,
  });
  const [videoInit, setVideoInit] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isCameraSupported, setCameraSupported] = useState(false);
  const [isCameraEnabled, setCameraEnabled] = useState(
    getLocal("CAM_PERMISSION")
  );

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setCameraSupported(true);
    }
  }, []);

  const onCamEnabled = () => {
    setLocal("CAM_PERMISSION", true);
    setCameraEnabled(true);
  };

  const onInitSuccess = () => {
    Quagga.start();
    setVideoInit(true);
  };

  const onDetected = (result: any) => {
    Quagga.offDetected(onDetected);
    console.log("onDetected", result.codeResult.code);
    alert(result.codeResult.code);
  };

  useSimpleEffect(async () => {
    if (!isCameraSupported || !isCameraEnabled || videoInit) return;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      let stream = await navigator.mediaDevices.getUserMedia({ video: true });
      let { width, height } = stream?.getTracks()[0]?.getSettings();
      setVideoSize({ width: width || 1, height: height || 1 });

      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#video"),
          },
          numOfWorkers: 1,
          locate: true,
          decoder: {
            readers: [
              // "ean_reader",
              // "ean_8_reader",
              // "upc_reader",
              "code_128_reader",
            ],
          },
        },
        (err: any) => {
          if (err) {
            setVideoError(true);
            return;
          }
          onInitSuccess();
        }
      );
      Quagga.onDetected(onDetected);
    }
  }, [isCameraSupported, isCameraEnabled, videoInit]);

  const renderCameraDisabled = (
    <>
      <Text>Camera is disabled</Text>
      <Button colorScheme="red" onClick={onCamEnabled}>
        Enable Camera
      </Button>
    </>
  );

  const renderVideoError = (
    <Text>
      Your device does not support camera access or something went wrong
    </Text>
  );

  const renderMainContent = (
    <AspectRatio
      ratio={videoSize.width / videoSize.height}
      w="full"
      pos="relative"
    >
      <Box w="full" h="full">
        <Box className="video" id="video" w="full" h="full">
          {videoInit && (
            <Center w="full" h="full">
              <Spinner size="xl" />
            </Center>
          )}
        </Box>
      </Box>
    </AspectRatio>
  );
  let content;

  if (!isCameraEnabled) content = renderCameraDisabled;
  if (isCameraEnabled && videoError) content = renderVideoError;
  if (isCameraEnabled && isCameraSupported && !videoError)
    content = renderMainContent;

  return (
    <Box
      bg="red"
      color="white"
      overflow="hidden"
      minH="300px"
      w="full"
      pos="relative"
      align="center"
      justify="center"
    >
      <Text>{`w: ${videoSize.width} - h: ${videoSize.height}`}</Text>
      {content}
    </Box>
  );
};

export default BarcodeReader;
