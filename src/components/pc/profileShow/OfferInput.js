import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { CircularProgress } from "@material-ui/core";

const OfferInput = (props) => {
  const [negotiate, setNegotiate] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
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
    <Box>
      <form>
        <Box mt={2} mr={1}>
          {/* {props.product.user._id !== props.currentUser.user.id && ( */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box>
                  <TextField
                    id="negotiate"
                    multiline
                    error={error}
                    helperText={helperText}
                    value={negotiate}
                    onChange={handleNegotiationChange}
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
          {/* )} */}
        </Box>
      </form>
    </Box>
  );
};

export default OfferInput;
