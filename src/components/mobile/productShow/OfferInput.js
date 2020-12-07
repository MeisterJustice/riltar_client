import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { CircularProgress } from "@material-ui/core";

const OfferInput = React.memo((props) => {
  const [sent, setSent] = useState(false);
  const [negotiate, setNegotiate] = useState("");
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(false);
  const [helperText, setHelperText] = useState("");
  const handleNegotiationChange = (e) => {
    setNegotiate(e.target.value);
  };
  const handleNegotiationSubmit = (e) => {
    e.preventDefault();
    if (!negotiate) {
      setError(true);
      setHelperText(`required`);
    } else {
      setProgress(true);
      props
        .postRoom(
          { message: negotiate },
          props.currentUser.user.id,
          props.product._id,
          props.product.user._id
        )
        .then(() => {
          setProgress(false);
          setError(false);
          setHelperText(``);
          setNegotiate("");
          props.handleNegotiationOpen();
          setSent(true);
        })
        .catch(() => {
          setError(false);
          setHelperText(``);
          setNegotiate("");
        });
    }
  };
  return (
    <form>
      <Box>
        {props.product.user._id !== props.currentUser.user.id && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box>
                <TextField
                  id="negotiate"
                  error={error}
                  helperText={helperText}
                  value={negotiate}
                  onChange={handleNegotiationChange}
                  multiline
                  label="send message"
                  variant="outlined"
                  name="negotiate"
                  required
                  fullWidth
                  size="small"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              {progress ? (
                <Box align="center">
                  <CircularProgress style={{ color: "gray" }} />
                </Box>
              ) : (
                <Button
                  disabled={sent}
                  onClick={handleNegotiationSubmit}
                  size="large"
                  fullWidth
                  variant="contained"
                  className="callToAction"
                >
                  MAKE OFFER
                </Button>
              )}
            </Grid>
          </Grid>
        )}
      </Box>
    </form>
  );
});

export default OfferInput;
