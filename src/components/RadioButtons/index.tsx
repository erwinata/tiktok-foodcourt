import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import RadioItem from "components/RadioButtons/RadioItem";
import { group } from "console";
import React from "react";

const RadioButtons = () => {
  const options = ["Debit", "Kredit"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioItem key={value} {...radio}>
            {value}
          </RadioItem>
        );
      })}
    </HStack>
  );
};

export default RadioButtons;
