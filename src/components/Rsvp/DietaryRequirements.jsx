import { Checkbox, FormControlLabel, FormGroup, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useMemo, useState } from "react";
import { getContentTypeById } from "../../client/client";

export const DietaryRequirementsSection = ({
  onChange,
  user,
  name,
  values,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [options, setOptions] = useState([]);

  const userId = user.sys.id;

  const getAvailableOptions = async () => {
    const userContentType = await getContentTypeById("user");

    console.log(userContentType.fields);

    const validations = userContentType.fields.find(({ id }) => {
      return id === "dietaryRequirements";
    }).items.validations[0].in;
    console.log(validations);

    setOptions(validations);

    return validations;
  };

  useEffect(() => {
    setIsExpanded(!!user.fields.dietaryRequirements?.length);
    getAvailableOptions();
  }, []);

  return (
    <Box key={user.sys.id}>
      <FormControlLabel
        control={
          <Checkbox
            value={"dietaryReqs"}
            // value={isExpanded || undefined}
            checked={isExpanded}
            onChange={() => setIsExpanded((d) => !d)}
          />
        }
        label="I have dietary requirements"
      />

      {isExpanded && (
        <Stack ml={2} spacing={2}>
          <FormGroup>
            {options?.map((option) => (
              <FormControlLabel
                key={userId + option}
                control={<Checkbox />}
                name={`${userId}.dietaryRequirements`}
                label={option}
                value={option}
                checked={values?.includes(option)}
                onChange={onChange}
              />
            ))}
          </FormGroup>
        </Stack>
      )}
    </Box>
  );
};
