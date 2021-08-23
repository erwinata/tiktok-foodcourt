import {
  AspectRatio,
  Box,
  Button,
  Center,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import Quagga from "quagga";
import useSimpleEffect from "hooks/useSimpleEffect";
import { getLocal, setLocal } from "helpers/localStorage";
import qrcode from "components/BarcodeReader/QRcode";
import useSound from "use-sound";
import beepSfx from "assets/beep.mp3";

interface Props {
  isScanning: boolean;
  onDetected: (code: string) => void;
  onReady: () => void;
}

const QRcodeReader: React.FC<Props> = ({ isScanning, onDetected, onReady }) => {
  var audioBeep = new Audio(beepSfx);

  const scanCooldown = useRef(false);
  const [videoInit, setVideoInit] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const stream = useRef<any>(null);
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

  const stopRecording = () => {
    (stream?.current?.getTracks() || []).forEach(function (track: any) {
      if (track.readyState === "live" && track.kind === "video") {
        track.stop();
      }
    });
  };

  const onInit = (currentStream: any) => {
    stream.current = currentStream;
    setVideoInit(true);
    onReady();
  };

  const onDetect = (code: string) => {
    if (scanCooldown.current) return;
    if (!isScanning) return;
    audioBeep.play();
    onDetected(code);
    scanCooldown.current = true;
    setTimeout(() => (scanCooldown.current = false), 2000);
  };

  useSimpleEffect(() => {
    if (!isCameraSupported || !isCameraEnabled || videoInit) return;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        qrcode({
          onInit,
          onDetect,
        });
      } catch (e) {
        setVideoError(true);
      }
    }
  }, [isCameraSupported, isCameraEnabled, videoInit]);

  useSimpleEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

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

  return (
    <>
      <Box bg="black" color="white" overflow="hidden" w="full">
        {!isCameraEnabled && renderCameraDisabled}
        {isCameraEnabled && videoError && renderVideoError}

        <AspectRatio
          ratio={1}
          w="400px"
          h="400px"
          overflow="hidden"
          pos="relative"
        >
          <Box w="full" h="full">
            <Box className="video" id="video" w="full" h="full">
              <canvas id="canvas" height="400" width="400"></canvas>
              <Center w="full" h="full">
                <Spinner size="xl" />
              </Center>
            </Box>
          </Box>
        </AspectRatio>
      </Box>
    </>
  );
};

export default QRcodeReader;
