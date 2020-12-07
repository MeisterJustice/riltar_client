import React, { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import Alerts from "../../../general-components/Alert";

const Form = (props) => {
  const [data, setData] = React.useState({
    firstName: props.user.firstName,
    lastName: props.user.lastName,
    email: props.user.email,
    phone: props.user.phone,
    department: props.user.department,
    faculty: props.user.faculty,
    image: "",
  });
  const [selected, setSelected] = useState(false);

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onPhotoChange = (e) => {
    setData({ ...data, image: e.target.files[0] });
    setSelected(true);
  };
  async function submit() {
    await props.openBackdrop();
    const formData = await new FormData();
    await formData.append("image", data.image);
    await formData.append("firstName", data.firstName);
    await formData.append("lastName", data.lastName);
    await formData.append("email", data.email);
    await formData.append("phone", data.phone);
    await formData.append("department", data.department);
    await formData.append("faculty", data.faculty);
    await props
      .updateUserDetails(formData, props.currentUser.user.id)
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
        <Box align="center" mb={1.5}>
          {props.errors.message && (
            <Alerts message={props.errors.message} severity="error" />
          )}
        </Box>
        <form onSubmit={onSubmit} noValidate autoComplete="off">
          <Box>
            <Box>
              <input
                accept="image/*"
                type="file"
                id="profile-photo"
                onChange={onPhotoChange}
              />
              <label for="profile-photo" className="btn-2">
                Change Photo
              </label>
            </Box>
            {selected && (
              <Box color="gray" fontSize={13}>
                Photo Selected
              </Box>
            )}
          </Box>
          <Box mt={2}>
            <TextField
              id="firstName"
              label="First Name"
              name="firstName"
              value={data.firstName}
              fullWidth
              onChange={onChange}
            />
          </Box>
          <Box mt={2}>
            <TextField
              id="LastName"
              label="Last Name"
              name="lastName"
              fullWidth
              value={data.lastName}
              onChange={onChange}
            />
          </Box>
          <Box mt={2}>
            <TextField
              id="email"
              label="Email"
              name="email"
              value={data.email}
              fullWidth
              onChange={onChange}
            />
          </Box>
          <Box mt={2}>
            <TextField
              id="phone"
              label="Phone Number"
              value={data.phone}
              name="phone"
              fullWidth
              onChange={onChange}
            />
          </Box>
          <Box mt={2}>
            <TextField
              id="department"
              label="Department in School"
              name="department"
              value={data.department}
              fullWidth
              onChange={onChange}
            />
          </Box>
          <Box mt={2}>
            <TextField
              id="faculty"
              label="Faculty in School"
              name="faculty"
              value={data.faculty}
              fullWidth
              onChange={onChange}
            />
          </Box>
          <Box mt={3}>
            <Button
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
