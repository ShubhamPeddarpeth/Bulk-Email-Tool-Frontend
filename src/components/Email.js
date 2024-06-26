import React from "react";
import { ListItem, Checkbox, Typography, Box, styled } from "@mui/material";
import { StarBorder, Star } from "@mui/icons-material";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";

const Wrapper = styled(ListItem)`
  padding: 0 0 0 10px;
  background: #f2f6fc;
  cursor: pointer;
  & > div {
    display: flex;
    width: 100%;
  }
  & > div > p {
    font-size: 14px;
  }
`;

const Indicator = styled(Typography)`
  font-size: 12px !important;
  background: #ddd;
  color: #222;
  border-radius: 4px;
  margin-right: 6px;
  padding: 0 4px;
`;

const DateText = styled(Typography)`
  && {
    margin-left: auto;
    margin-right: 20px;
    font-size: 12px;
    color: #5f6368;
  }
`;

const Email = ({
  email,
  setStarredEmail,
  selectedEmails,
  setSelectedEmails,
}) => {
  const toggleStarredEmailService = useApi(API_URLS.toggleStarredMails);
  const navigate = useNavigate();

  const toggleStarredEmail = () => {
    toggleStarredEmailService.call({ id: email._id, value: !email.starred });
    setStarredEmail((prevState) => !prevState);
  };

  const handleChange = () => {
    setSelectedEmails((prevState) =>
      selectedEmails.includes(email._id)
        ? prevState.filter((id) => id !== email._id)
        : [...prevState, email._id]
    );
  };

  const formatDate = React.useMemo(() => {
    const formattedDate = new Date(email.date);
    return `${formattedDate.getDate()} ${formattedDate.toLocaleString(
      "default",
      {
        month: "long",
      }
    )}`;
  }, [email.date]);

  return (
    <Wrapper>
      <Checkbox
        size="small"
        checked={selectedEmails.includes(email._id)}
        onChange={handleChange}
      />
      {email.starred ? (
        <Star
          fontSize="small"
          style={{ marginRight: 10 }}
          onClick={toggleStarredEmail}
        />
      ) : (
        <StarBorder
          fontSize="small"
          style={{ marginRight: 10 }}
          onClick={toggleStarredEmail}
        />
      )}
      <Box onClick={() => navigate(routes.view.path, { state: { email } })}>
        <Typography style={{ width: 200 }}>
          To: {email.to.split("@")[0]}
        </Typography>
        <Indicator>Inbox</Indicator>
        <Typography>
          {`${email.subject} ${email.body ? "-" : ""} ${email.body}`}
        </Typography>
        <DateText>{formatDate}</DateText>
      </Box>
    </Wrapper>
  );
};

export default Email;
