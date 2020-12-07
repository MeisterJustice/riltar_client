import React from "react";

import {
  Box,
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

const StepOne = React.memo((props) => {
  return (
    <Box mt={5}>
      <Container>
        <Box
          width={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            width={{ xs: "100%", md: "70%" }}
            bgcolor="#FFFFFF"
            py={3}
            boxShadow={3}
          >
            <Box mx={5}>
              <Box mt={3}>
                <label className="label">Product Title</label>
                <Box
                  display="inline"
                  ml={0.5}
                  fontSize={20}
                  fontWeight={600}
                  color="#f2514b"
                >
                  *
                </Box>
                <Box mt={1}>
                  <TextField
                    style={{
                      border: "1px solid black",
                    }}
                    multiline
                    placeholder="Product title goes here"
                    rows={3}
                    value={props.title}
                    name="title"
                    onChange={props.handleOnChange}
                    margin="dense"
                    fullWidth
                    InputProps={{
                      style: {
                        fontSize: 28,
                        fontWeight: "550",
                        color: "rgb(77, 76, 76)",
                      },
                    }}
                  />
                </Box>
              </Box>
              <Box mt={3}>
                <label className="label">Product Description</label>
                <Box
                  display="inline"
                  ml={0.5}
                  fontSize={20}
                  fontWeight={600}
                  color="#f2514b"
                >
                  *
                </Box>
                <Box mt={1}>
                  <TextField
                    style={{
                      border: "1px solid black",
                    }}
                    multiline
                    placeholder="Write a great description for your product"
                    rows={5}
                    value={props.description}
                    name="description"
                    onChange={props.handleOnChange}
                    margin="dense"
                    fullWidth
                    InputProps={{
                      style: {
                        fontSize: 26,
                        fontWeight: "550",
                        color: "rgb(77, 76, 76)",
                      },
                    }}
                  />
                </Box>
              </Box>
              <Box mt={4}>
                <Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <label id="category" className="label">
                        Category
                      </label>
                      <Box
                        display="inline"
                        ml={0.5}
                        fontSize={20}
                        fontWeight={600}
                        color="#f2514b"
                      >
                        *
                      </Box>
                      <Box mt={1}>
                        <Select
                          style={{
                            border: "1px solid black",
                            borderBottom: "none",
                          }}
                          id="category"
                          value={props.category}
                          onChange={props.handleCategoryChange}
                          name="category"
                          fullWidth
                        >
                          {props.categories.map((data) => (
                            <MenuItem key={data._id} value={data._id}>
                              {data.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <label id="subcategory" className="label">
                        Subcategory
                      </label>
                      <Box
                        display="inline"
                        ml={0.5}
                        fontSize={20}
                        fontWeight={600}
                        color="#f2514b"
                      >
                        *
                      </Box>
                      <Box mt={1}>
                        <Select
                          style={{
                            border: "1px solid black",
                            borderBottom: "none",
                          }}
                          id="subcategory"
                          value={props.subcategory}
                          onChange={props.handleOnChange}
                          disabled={!props.category ? true : false}
                          name="subcategory"
                          fullWidth
                        >
                          {props.subcategories.map((data) => (
                            <MenuItem key={data._id} value={data._id}>
                              {data.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              <Box mt={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} lg={3}>
                    <label className="label">Price</label>
                    <Box
                      display="inline"
                      ml={0.5}
                      fontSize={20}
                      fontWeight={600}
                      color="#f2514b"
                    >
                      *
                    </Box>
                    <Box mt={1}>
                      <TextField
                        style={{
                          border: "1px solid black",
                          borderBottom: "none",
                        }}
                        fullWidth
                        value={props.price}
                        onChange={props.handleOnChange}
                        name="price"
                        InputProps={{
                          inputComponent: props.NumberFormatCustom,
                          style: {
                            fontSize: 20,
                            fontWeight: "550",
                            color: "rgb(77, 76, 76)",
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <label id="category" className="label">
                      Quantity
                    </label>
                    <Box
                      display="inline"
                      ml={0.5}
                      fontSize={20}
                      fontWeight={600}
                      color="#f2514b"
                    >
                      *
                    </Box>
                    <Box mt={1}>
                      <TextField
                        style={{
                          border: "1px solid black",
                          borderBottom: "none",
                        }}
                        placeholder="Product Quantity"
                        value={props.quantity}
                        name="quantity"
                        type="number"
                        min={1}
                        onChange={props.handleQuantityOnChange}
                        fullWidth
                        InputProps={{
                          style: {
                            fontSize: 20,
                            fontWeight: "550",
                            color: "rgb(77, 76, 76)",
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={5} lg={3}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={props.isNegotiable}
                            onChange={props.handleNegotiationChange}
                            name="isNegotiable"
                            color="primary"
                          />
                        }
                        label="Is Negotiable?"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={7} lg={3}>
                    <Box
                      style={{ transition: ".5s all ease" }}
                      display={!props.isNegotiable ? "none" : "block"}
                    >
                      <label style={{ fontSize: 14 }} className="label">
                        Minimum price you're willing to accept
                      </label>
                      <Box
                        display="inline"
                        ml={0.5}
                        fontSize={20}
                        fontWeight={600}
                        color="#f2514b"
                      >
                        *
                      </Box>
                      <Box mt={1}>
                        <TextField
                          style={{
                            border: "1px solid black",
                            borderBottom: "none",
                          }}
                          fullWidth
                          disabled={!props.isNegotiable}
                          value={props.minPrice}
                          onChange={props.handleOnChange}
                          name="minPrice"
                          InputProps={{
                            inputComponent: props.NumberFormatCustom,
                            style: {
                              fontSize: 13,
                              fontWeight: "550",
                              color: "rgb(77, 76, 76)",
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <label id="category" className="label">
                      Condition
                    </label>
                    <Box
                      display="inline"
                      ml={0.5}
                      fontSize={20}
                      fontWeight={600}
                      color="#f2514b"
                    >
                      *
                    </Box>
                    <Box mt={1}>
                      <Select
                        style={{
                          border: "1px solid black",
                          borderBottom: "none",
                          paddingBottom: 5,
                        }}
                        value={props.condition}
                        onChange={props.handleOnChange}
                        name="condition"
                        fullWidth
                      >
                        <MenuItem value="Brand New">Brand New</MenuItem>
                        <MenuItem value="Fairly Used">Fairly Used</MenuItem>
                        <MenuItem value="Refurbished">Refurbished</MenuItem>
                      </Select>
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <label id="category" className="label">
                      Second Condition
                    </label>
                    <Box mt={1}>
                      <Select
                        style={{
                          border: "1px solid black",
                          borderBottom: "none",
                          paddingBottom: 5,
                        }}
                        value={props.secondCondition}
                        onChange={props.handleOnChange}
                        name="secondCondition"
                        fullWidth
                      >
                        <MenuItem value="Fine Condition">
                          Fine Condition
                        </MenuItem>
                        <MenuItem value="Cracked">Cracked</MenuItem>
                        <MenuItem value="Needs a little repair">
                          Needs a little repair
                        </MenuItem>
                        <MenuItem value="Needs severe repair">
                          Needs severe repair
                        </MenuItem>
                        <MenuItem value="Looks a bit old">
                          Looks a bit old
                        </MenuItem>
                      </Select>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
});
export default StepOne;
