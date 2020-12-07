import React from "react";
import { Box, TextField, Button, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const Form = (props) => {
  const [value, setValue] = React.useState(3);
  const [description, setDescription] = React.useState("");
  const [hover, setHover] = React.useState(-1);
  const [feedback, setFeedback] = React.useState(1);
  const [happyColor, setHappyColor] = React.useState("#131921");
  const [notHappyColor, setNotHappyColor] = React.useState("#131921");

  const onChange = (e) => {
    setDescription(e.target.value);
  };

  const changeFeedback = (value) => {
    setFeedback(value);
    if (value === 0) {
      setHappyColor("#131921");
      setNotHappyColor("#ff6600");
    } else if (value === 1) {
      setNotHappyColor("#131921");
      setHappyColor("#ff6600");
    }
  };

  async function submit() {
    await props.openBackdrop();
    await props.postRating(
      {
        rating: value,
        review: description,
        feedback,
      },
      props.currentUser.user.id,
      props.order.product._id,
      props.order._id
    );
    await props.closeBackdrop();
    await props.openSnackbar();
    await setDescription("");
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (value < 0.5) {
      props.errors.message = "No rating detected";
      return;
    } else if (!description) {
      props.errors.message = "No review detected";
      return;
    } else {
      submit();
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <Box
        width={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Box>
            <Box textAlign="center">
              <Typography component="legend">experience with seller</Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box onClick={() => changeFeedback(1)}>
                <SentimentVerySatisfiedIcon
                  fontSize="large"
                  className="cursor link"
                  style={{ color: happyColor }}
                />
              </Box>
              <Box onClick={() => changeFeedback(0)}>
                <SentimentVeryDissatisfiedIcon
                  fontSize="large"
                  className="cursor link"
                  style={{ color: notHappyColor }}
                />
              </Box>
            </Box>
          </Box>
          <Box pt={1}>
            <Box textAlign="center">
              <Typography component="legend">product rating</Typography>
            </Box>
            <Rating
              name="rating"
              value={value}
              size="large"
              precision={0.5}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
          </Box>
          {value !== null && (
            <Box textAlign="center" fontSize={13}>
              {labels[hover !== -1 ? hover : value]}
            </Box>
          )}
        </Box>
        <Box width={1} mt={2}>
          <TextField
            id="rating-text"
            label="how do you like this product?"
            multiline
            fullWidth
            value={description}
            onChange={onChange}
            rows={2}
            variant="outlined"
          />
        </Box>
        <Box width={1} my={1}>
          <Button
            onClick={onSubmit}
            fullWidth
            variant="contained"
            className="callToAction"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default Form;
