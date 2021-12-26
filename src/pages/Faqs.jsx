import { Icon, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CoronavirusOutlinedIcon from "@mui/icons-material/CoronavirusOutlined";

const icons = {
  CoronavirusOutlined: CoronavirusOutlinedIcon,
};

const faqs = [
  { question: "What is love?", answer: "Baby don't hurt me." },
  {
    icon: "CoronavirusOutlined",
    question: "Don't hurt me?",
    answer: "No more.",
  },
];

export const Faq = ({ icon, question, answer }) => {
  return (
    <Stack textAlign="center">
      <Box style={{ flex: 1, justifyContent: "center" }}>
        <Icon component={icons[icon]} />
      </Box>
      <Typography fontWeight="bold" sx={{ textTransform: "uppercase" }}>
        {question}
      </Typography>
      <Typography>{answer}</Typography>
    </Stack>
  );
};

const Faqs = () => {
  return (
    <Stack textAlign="center" spacing={4}>
      <h1>FAQs</h1>
      <Stack spacing={6}>
        {faqs.map((props) => (
          <Faq {...props} />
        ))}
      </Stack>
    </Stack>
  );
};

export default Faqs;
