import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Spacer,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import CircleIcon from "components/CircleIcon";
import Pic from "components/Pic";
import useThemeContext from "context/useThemeContext";
import { formatRp } from "helpers/numberFormatter";
import React from "react";
import {
  RiAddBoxLine,
  RiAddCircleFill,
  RiAddCircleLine,
  RiAddFill,
  RiAddLine,
  RiCheckLine,
  RiSubtractLine,
} from "react-icons/ri";
import useCartContext from "routes/Tenant/context/useCartContext";
import { IProduct } from "types/interfaces/IProduct";

interface Props {
  product: IProduct;
  qty: number;
}

const MenuItem = ({ product, qty }: Props) => {
  const { cartState, cartAct } = useCartContext();
  const { themeState, themeHelpers } = useThemeContext();

  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const priceQtyRowMobile = () => (
    <HStack justify="space-between" pt="2" h="50px">
      <Box>
        {product.hargaAsli > product.harga && (
          <Text fontSize="xs" textDecor="line-through" opacity="0.5">
            {formatRp(product.hargaAsli)}
          </Text>
        )}
        <Text fontSize="md" fontWeight="semibold">
          {formatRp(product.harga)}
        </Text>
      </Box>
      {qty > 0 ? (
        <HStack w="120px">
          <Button
            onClick={() => {
              cartAct.setQtyProductInCart(product, qty - 1);
            }}
            size="sm"
          >
            -
          </Button>
          <Input
            variant="unstyled"
            textAlign="center"
            value={qty + "x"}
            readOnly
          />
          <Button
            onClick={() => {
              cartAct.setQtyProductInCart(product, qty + 1);
            }}
            size="sm"
          >
            +
          </Button>
        </HStack>
      ) : (
        <IconButton
          aria-label="Tambah"
          icon={<RiAddFill />}
          onClick={() => {
            cartAct.setQtyProductInCart(product, 1);
          }}
        />
      )}
    </HStack>
  );

  const priceQtyRow = () => (
    <>
      <HStack justify="space-between" pt="2" h="50px">
        <Box>
          {product.hargaAsli > product.harga && (
            <Text fontSize="xs" textDecor="line-through" opacity="0.5">
              {formatRp(product.hargaAsli)}
            </Text>
          )}
          <Text fontSize="md" fontWeight="semibold">
            {formatRp(product.harga)}
          </Text>
        </Box>
      </HStack>

      <Box pt="2">
        {qty > 0 ? (
          <HStack>
            <IconButton
              aria-label="Kurang"
              icon={<RiSubtractLine />}
              size="lg"
              onClick={() => {
                cartAct.setQtyProductInCart(product, qty - 1);
              }}
            />
            <Input
              variant="unstyled"
              textAlign="center"
              fontSize="lg"
              value={qty + "x"}
              readOnly
            />
            <IconButton
              aria-label="Tambah"
              icon={<RiAddFill />}
              size="lg"
              onClick={() => {
                cartAct.setQtyProductInCart(product, qty + 1);
              }}
            />
          </HStack>
        ) : (
          <Button
            aria-label="Tambah"
            leftIcon={<RiAddLine size={22} />}
            size="lg"
            fontWeight="normal"
            fontSize="sm"
            w="full"
            onClick={() => {
              cartAct.setQtyProductInCart(product, 1);
            }}
          >
            Tambah
          </Button>
        )}
      </Box>
    </>
  );

  const desc = () => {
    return (
      <Text fontSize="sm" color="gray.500" lineHeight="1" pt="1" h="4">
        {product.deskripsi &&
          product.deskripsi !== "0" &&
          product.deskripsi !== "-" &&
          product.deskripsi}
      </Text>
    );
  };

  return (
    <Box bg="white" rounded="lg" px={3} py={3} shadow="lg" role="group">
      <Stack
        // align={{ base: "center", sm: "flex-start" }}
        align="flex-start"
        spacing="3"
        direction={{ base: "row", sm: "column" }}
        pos="relative"
      >
        <Popover
          returnFocusOnClose={false}
          isOpen={isOpen}
          onClose={close}
          isLazy
        >
          <PopoverTrigger>
            <Box w={{ base: "25%", sm: "full" }} maxW="400px">
              <Pic
                borderRadius="md"
                objectFit="cover"
                pos="relative"
                w="full"
                ratioo={4 / 3}
                pt="1"
                src={product.photo}
                alt={product.nama}
                onClick={open}
                minifyText={themeHelpers.smScreen}
              />
            </Box>
          </PopoverTrigger>

          <Stack direction="column" flexGrow={1} spacing="0" w="full">
            <Heading fontSize="md">{product.nama}</Heading>
            {/* <Text fontSize="sm" color="gray.400">
              #{product.id}
            </Text> */}
            {desc()}
            <Spacer />
            {themeHelpers.smScreen ? priceQtyRowMobile() : priceQtyRow()}
          </Stack>

          <Portal containerRef={themeState.refPortal}>
            <PopoverContent w="180px" _focus={{ outline: "none" }}>
              <PopoverArrow />
              <PopoverBody px="0" py="1">
                <Stack spacing="0">
                  <Text px="4" py="2" _hover={{ bg: "gray.100" }}>
                    Favorit
                  </Text>
                  <Text px="4" py="2" _hover={{ bg: "gray.100" }}>
                    Nonaktifkan
                  </Text>
                  <Text px="4" py="2" _hover={{ bg: "gray.100" }}>
                    Batal
                  </Text>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>

        {qty > 0 && (
          <CircleIcon
            pos="absolute"
            top={-1}
            right={themeHelpers.smScreen ? 0 : 2}
            size="20px"
            bg="red.500"
            color="white"
            zIndex="1"
            icon={<RiCheckLine />}
          />
        )}
      </Stack>
      {/* {isRowDisplay && desc()} */}
      {/* {isRowDisplay && priceQtyRow()} */}
    </Box>
  );
};

export default MenuItem;
