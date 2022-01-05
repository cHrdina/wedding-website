import { Icon, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CoronavirusOutlinedIcon from "@mui/icons-material/CoronavirusOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import NoPhotographyOutlinedIcon from "@mui/icons-material/NoPhotographyOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import { getAllEntriesByType, getFaqs } from "../client/client";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";

const iconsRecord = {
  CoronavirusOutlined: CoronavirusOutlinedIcon,
  QuestionAnswerOutlined: QuestionAnswerOutlinedIcon,
  LocalDiningOutlined: LocalDiningOutlinedIcon,
  HailOutlined: HailOutlinedIcon,
  CardGiftcardOutlined: CardGiftcardOutlinedIcon,
  NoPhotographyOutlined: NoPhotographyOutlinedIcon,
  ChildCareOutlined: ChildCareOutlinedIcon,
  CheckroomOutlined: CheckroomOutlinedIcon,
  AccessTimeOutlined: AccessTimeOutlinedIcon,
  DirectionsCarOutlined: DirectionsCarOutlinedIcon,
};

export const Faq = ({ icon, question, answer }) => {
  const iconComponent = iconsRecord[icon];

  return (
    <>
      <Stack textAlign="center">
        <Box style={{ flex: 1, justifyContent: "center" }}>
          {iconComponent && <Icon component={iconComponent} />}
        </Box>
        <Typography component="div">
          <Box sx={{ fontWeight: "bold", m: 1 }}>{question}</Box>
          <Box sx={{ fontWeight: "regular", m: 1 }}>{answer}</Box>
        </Typography>
      </Stack>
    </>
  );
};

const Faqs = () => {
  const [faqs, setFaqs] = useState();

  const getAllFaqs = async () => {
    const response = await getFaqs();
    console.log(response);
    console.log(response?.map(({ fields }) => fields));
    setFaqs(response?.map(({ fields }) => fields));
  };

  useEffect(() => {
    getAllFaqs();
  }, []);

  return (
    <>
      <Typography variant="h1">Questions and Answers</Typography>
      <Stack mt={1} spacing={6}>
        {faqs?.map((data) => (
          <Faq {...data} />
        ))}
      </Stack>
    </>
  );
};

export default Faqs;
