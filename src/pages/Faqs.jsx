import { Icon, Stack, Typography } from "@mui/material";
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
import { getAllEntriesByType } from "../client/client";
import { useEffect, useState } from "react";

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
    <Stack textAlign="center">
      <Box style={{ flex: 1, justifyContent: "center" }}>
        {iconComponent && <Icon component={iconComponent} />}
      </Box>
      <Typography fontWeight="bold" sx={{ textTransform: "uppercase" }}>
        {question}
      </Typography>
      <Typography>{answer}</Typography>
    </Stack>
  );
};

const Faqs = () => {
  const [faqs, setFaqs] = useState();

  const getAllFaqs = async () => {
    const response = await getAllEntriesByType("tips");
    console.log(response);
    console.log(response?.map(({ fields }) => fields));
    setFaqs(response?.map(({ fields }) => fields));
  };

  useEffect(() => {
    getAllFaqs();
  }, []);

  return (
    <Stack textAlign="center" spacing={4}>
      <h1>FAQs</h1>
      <Stack spacing={6}>
        {faqs?.map(({ icon, question, answer }) => (
          <Faq
            icon={icon}
            question={question}
            answer={answer.content[0].content[0].value}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Faqs;
