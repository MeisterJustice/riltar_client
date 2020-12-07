import React from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import Alerts from "../../../general-components/Alert";

const Form = (props) => {
  const [name, setName] = React.useState("");
  const [fetchingName, setFetchingName] = React.useState(false);
  const [data, setData] = React.useState({
    bankName: props.user.bankName ? props.user.bankName : "",
    bankCode: props.user.bankCode ? props.user.bankCode : "",
    bankAccountNumber: props.user.bankAccountNumber
      ? props.user.bankAccountNumber
      : "",
  });
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  async function submit() {
    await props.openBackdrop();
    for (var i = 0; i < props.banks.length; i++) {
      if (props.banks[i].name === data.bankName) {
        setData({ ...data, bankCode: props.banks[i].code });
        break;
      }
    }
    await props
      .updateBank(data, props.currentUser.user.id)
      .then(() => {
        props.closeBackdrop();
        props.openSnackbar();
      })
      .catch((e) => {
        props.closeBackdrop();
      });
  }
  const onSubmit = (e) => {
    e.preventDefault();
    submit();
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="white"
      boxShadow={2}
      p={2}
    >
      <Box mx={3} width={1}>
        <Box align="center" mb={2.5}>
          {props.errors.message && (
            <Alerts message={props.errors.message} severity="error" />
          )}
        </Box>
        <form noValidate autoComplete="off">
          <Box>
            <InputLabel id="bankName">Bank Name</InputLabel>
            <Select
              labelId="bankName"
              id="bankName"
              value={data.bankName}
              onChange={onChange}
              name="bankName"
              fullWidth
            >
              {props.banks.map((data, index) => (
                <MenuItem key={index} value={data.name}>
                  {data.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box mt={2}>
            <TextField
              id="bankAccountNumber"
              label="Account Number"
              type="number"
              name="bankAccountNumber"
              fullWidth
              value={data.bankAccountNumber}
              onChange={onChange}
            />
          </Box>

          <Box mt={5}>
            <Button
              onClick={onSubmit}
              type="submit"
              size="large"
              fullWidth
              variant="contained"
              className="callToAction"
            >
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Form;
