import React from "react";
import { Box, Grid } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import HomeIcon from "@material-ui/icons/Home";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const LeftGrid = (props) => {
  return (
    <Grid xs={12} md={8} lg={7} item>
      <Box className="productBackground" py={2} width={1} boxShadow={3}>
        <Box ml={1.5} display="flex" justifyContent="flex-star">
          <Box>
            <RateReviewOutlinedIcon />
          </Box>
          <Box ml={2} fontWeight={550}>
            Review Your Delivery Info
          </Box>
        </Box>
        <Box fontWeight={500} fontSize={13} mt={2.5} border={1} mx={1}>
          <Box my={1} mx={1}>
            <Box display="flex" justifyContent="space-start">
              <Box>
                <PersonOutlineIcon
                  style={{ color: "#0077be" }}
                  fontSize="small"
                />
              </Box>
              <Box ml={2}>
                {props.currentUser.user.firstName}{" "}
                {props.currentUser.user.lastName}
              </Box>
            </Box>
            {props.address.map((address) => (
              <Box key={address.id}>
                {address.isDefault && (
                  <Box>
                    <Box mt={1} display="flex" justifyContent="space-start">
                      <Box>
                        <HomeIcon
                          style={{ color: "#0077be" }}
                          fontSize="small"
                        />
                      </Box>
                      <Box ml={2}>
                        {address.address}, {address.city}, {address.state},{" "}
                        {address.country}
                      </Box>
                    </Box>
                    <Box mt={1} display="flex" justifyContent="space-start">
                      <Box>
                        <PhoneAndroidIcon
                          style={{ color: "#0077be" }}
                          fontSize="small"
                        />
                      </Box>
                      <Box ml={2}>{address.phone}</Box>
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
            <Box
              color="#0077be"
              onClick={props.handleAddressClickOpen}
              fontSize={16.5}
              mt={2}
              fontWeight={500}
              className="cursor hover"
            >
              CHANGE
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="productBackground" my={4} py={2} width={1} boxShadow={3}>
        <Box ml={1.5} display="flex" justifyContent="flex-star">
          <Box>
            <InfoOutlinedIcon />
          </Box>
          <Box ml={2} fontWeight={550}>
            Shipping FAQs
          </Box>
        </Box>
        <Box fontWeight={500} fontSize={14} mt={2.5} border={1} mx={1}>
          <Box my={1} mx={1}>
            <Box>
              <Box>What are my payment options?</Box>
              <Box mt={1.5} fontSize={13}>
                <Box>
                  You can choose between{" "}
                  <span style={{ fontWeight: "500", color: "#0077be" }}>
                    payment on delivery
                  </span>{" "}
                  or{" "}
                  <span style={{ fontWeight: "500", color: "#0077be" }}>
                    pay now
                  </span>{" "}
                  when purchasing from a non-business account, but only the{" "}
                  <span style={{ fontWeight: "500", color: "#0077be" }}>
                    pay now
                  </span>{" "}
                  option is available when purchasing from a business account
                </Box>
              </Box>
            </Box>
            <Box mt={2}>
              <Box>What happens after I place this order?</Box>
              <Box mt={1.5} fontSize={13}>
                <Box>
                  Your delivery information will be sent to seller and seller's
                  mobile number will be sent to you via SMS. Then, the seller
                  will{" "}
                  <span style={{ fontWeight: "500", color: "#0077be" }}>
                    contact you to arrange delivery.
                  </span>
                </Box>
              </Box>
            </Box>
            <Box mt={2}>
              <Box>Riltar's payment recommendation?</Box>
              <Box mt={1.5} fontSize={13}>
                <Box>
                  To guarantee your safety and convenience, we recommend you
                  always choose the{" "}
                  <span style={{ fontWeight: "500", color: "#0077be" }}>
                    pay now
                  </span>{" "}
                  payment option for all orders as to avoid meeting up with
                  seller with large sums of money in your pocket.{" "}
                  <span style={{ fontWeight: "500", color: "#0077be" }}>
                    Money Back Guarantee
                  </span>{" "}
                  is placed on all order cancellations.
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default LeftGrid;
