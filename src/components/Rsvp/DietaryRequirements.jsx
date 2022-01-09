import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useMemo, useState } from "react";
import { getContentTypeById } from "../../client/client";
import CheckIcon from "@mui/icons-material/Check";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

export const DietaryRequirementsSection = ({
  onChange,
  user,
  values,
  setFieldValue,
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

    setOptions(validations);

    return validations;
  };

  const handleParentChange = () => {
    if (isExpanded) {
      setFieldValue(`${userId}.dietaryRequirements`, []);
      setFieldValue(`${userId}.allergies`, null);
    }
    setIsExpanded((d) => !d);
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
            checked={isExpanded}
            onChange={() => handleParentChange()}
            checkedIcon={<CheckBoxOutlinedIcon />}
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
                control={<Checkbox checkedIcon={<CheckBoxOutlinedIcon />} />}
                name={`${userId}.dietaryRequirements`}
                label={option}
                value={option}
                checked={values?.dietaryRequirements?.includes(option)}
                onChange={onChange}
              />
            ))}
          </FormGroup>
          <TextField
            name={`${userId}.allergies`}
            label="Allergies"
            placeholder="Please list any allergies here."
            multiline
            value={values?.allergies}
            onChange={onChange}
            minRows={3}
          />
        </Stack>
      )}
    </Box>
  );
};
