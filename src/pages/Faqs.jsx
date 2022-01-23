import React from "react";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import CoronavirusOutlinedIcon from "@mui/icons-material/CoronavirusOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import NoPhotographyOutlinedIcon from "@mui/icons-material/NoPhotographyOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import { Icon, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getFaqs } from "../client/client";

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
  LiveTvOutlined: LiveTvOutlinedIcon,
};

export const Faq = ({ icon, question, answer }) => {
  const iconComponent = iconsRecord[icon];

  return (
    <>
      <Stack textAlign="center" maxWidth="600px">
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
    setFaqs(response?.map(({ fields }) => fields));
  };

  useEffect(() => {
    getAllFaqs();
  }, []);

  return (
    <>
      <Stack mt={1} spacing={6} sx={{ alignItems: "center" }} width="100%">
        {faqs?.map((data, index) => (
          <Faq key={index} {...data} />
        ))}
      </Stack>
    </>
  );
};

export default Faqs;
