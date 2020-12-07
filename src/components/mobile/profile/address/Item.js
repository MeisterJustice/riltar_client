import React from "react";
import { Box } from "@material-ui/core";

const Item = (props) => {
  const updateAddress = (id) => {
    props.openBackdrop();
    props
      .updateAddressInfo({ id }, props.currentUser.user.id, id)
      .then(() => {
        props.closeBackdrop();
        props.openSnackbar();
      })
      .catch((e) => {
        props.closeBackdrop();
      });
  };
  return (
    <Box mt={4} width={1}>
      <Box display="flex" justifyContent="space-between">
        <Box fontWeight={600}>Your Address</Box>
        <Box
          color="#ff6600"
          fontWeight={600}
          className="cursor"
          onClick={props.displayForm}
        >
          Add New
        </Box>
      </Box>
      {props.address.map((data, index) => (
        <Box key={data.id}>
          <Box
            border={1}
            p={2}
            mt={2}
            display="flex"
            justifyContent="space-between"
          >
            <Box>
              <Box>state: {data.state}</Box>
              <Box mt={1}>city: {data.city}</Box>
              <Box mt={1}>address: {data.address}</Box>
              <Box mt={1}>phone number: {data.phone}</Box>
            </Box>
            <Box
              onClick={() => updateAddress(data.id)}
              className="cursor"
              bgcolor={data.isDefault ? "#ff6600" : "gray"}
              height={20}
              width={20}
              borderRadius="50%"
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Item;
