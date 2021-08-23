const obj = {
  simple_arr: ["a1", "b1", "c1"],
  key_first: "firstVal",
  key_second: "secondVal",
  nested_obj: {
    nested_one: "nested 1 value",
    nested_two: "nested 2 value",
  },
  nested_arr: [
    {
      nested_obj_one: "nested obj val 1",
    },
    {
      nested_obj_two: "nested obj val 2",
    },
    {
      level_3_nested: [
        {
          level_3_key: "level 3 value",
          level_3_another_key: "another level 3 value",
        },
      ],
    },
  ],
};

export const snakeToCamelCase: any = (val: any) => {
  return typeof val !== "object" || val === null
    ? val
    : Array.isArray(val)
    ? val.map(snakeToCamelCase)
    : renameKeys(val);
};

const renameKeys: any = (obj: any) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [
      key.replace(/_(.)/g, (g) => g[1].toUpperCase()),
      snakeToCamelCase(val),
    ])
  );
};
