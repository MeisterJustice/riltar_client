import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  Box,
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  Chip,
  Button,
  Paper,
} from "@material-ui/core";

const StepTwo = React.memo((props) => {
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
              <Box mt={4}>
                <Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <label for="city" className="label">
                        City
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
                          id="city"
                          style={{
                            border: "1px solid black",
                            borderBottom: "none",
                            paddingBottom: 5,
                          }}
                          value={props.city}
                          onChange={props.handleOnChange}
                          name="city"
                          fullWidth
                        >
                          {props.cities.map((city, index) => (
                            <MenuItem key={index} value={city}>
                              {city}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <label for="address" className="label">
                        Address
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
                          id="address"
                          style={{
                            border: "1px solid black",
                            borderBottom: "none",
                          }}
                          placeholder="Hostel B"
                          fullWidth
                          value={props.address}
                          name="address"
                          onChange={props.handleOnChange}
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
                  </Grid>
                </Box>
              </Box>
              <Box textAlign="center" mt={3}>
                <Box>
                  <Box display="inline" className="label">
                    Add Product Images (5 max)
                  </Box>
                  <Box
                    display="inline"
                    ml={0.5}
                    fontSize={20}
                    fontWeight={600}
                    color="#f2514b"
                  >
                    *
                  </Box>
                </Box>
                <Box mt={1}>
                  <Box mb={1}>The first image will be used as thumbnail</Box>
                  <Box>
                    <input
                      accept="image/png,image/jpeg"
                      multiple
                      type="file"
                      id="image"
                      onChange={props.onThumbnailChange}
                    />
                    <label for="image" className="btn-2">
                      upload
                    </label>
                  </Box>
                  <Box color="gray">
                    {props.imageLength < 1
                      ? ""
                      : props.imageLength + " images selected"}
                  </Box>
                </Box>
              </Box>
              <Box mt={4}>
                <Box>
                  <label for="tags" className="label">
                    Product Tags
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
                    <form onSubmit={props.handleAddTag}>
                      <TextField
                        id="tags"
                        style={{
                          border: "1px solid black",
                          borderBottom: "none",
                        }}
                        placeholder="Add a maximum of 5 tags/keywords to better your product's search ranking"
                        rows={5}
                        fullWidth
                        disabled={props.chipData.length === 5}
                        value={props.tag}
                        onChange={props.handleTagOnchange}
                        InputProps={{
                          style: {
                            fontSize: 20,
                            fontWeight: "550",
                            color: "rgb(77, 76, 76)",
                          },
                        }}
                      />
                    </form>
                  </Box>
                </Box>
              </Box>

              <Box
                mt={3}
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
                className="chip-root"
              >
                {props.chipData.map((data) => (
                  <li key={data.key}>
                    <Chip
                      className="chip"
                      label={data.label}
                      onDelete={props.handleChipDelete(data)}
                    />
                  </li>
                ))}
              </Box>
              <Box py={2} mt={3} border={2} borderColor="#0077be">
                <Box textAlign="center">
                  <label style={{ color: "#0077be" }} className="label">
                    Add Product Specifications
                  </label>
                </Box>
                <Box my={3} mx={1}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <label for="spec-title" className="label">
                        Title
                      </label>
                      <Box mt={1}>
                        <TextField
                          id="spec-title"
                          style={{
                            border: "1px solid black",
                            borderBottom: "none",
                          }}
                          placeholder="Brand"
                          fullWidth
                          value={props.specTitle}
                          name="specTitle"
                          onChange={props.handleSpecOnChange}
                          InputProps={{
                            style: {
                              fontSize: 17,
                              fontWeight: "500",
                              color: "rgb(77, 76, 76)",
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <label for="spec-result" className="label">
                        Result
                      </label>
                      <Box mt={1}>
                        <TextField
                          id="spec-result"
                          style={{
                            border: "1px solid black",
                            borderBottom: "none",
                          }}
                          placeholder="Sony"
                          fullWidth
                          value={props.specResult}
                          name="specResult"
                          onChange={props.handleSpecOnChange}
                          InputProps={{
                            style: {
                              fontSize: 17,
                              fontWeight: "500",
                              color: "rgb(77, 76, 76)",
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Box mt={1}>
                    <Button
                      className="callToAction"
                      onClick={props.handleAddSpecification}
                      fullWidth
                    >
                      ADD
                    </Button>
                  </Box>
                  <Box mt={2}>
                    <TableContainer component={Paper}>
                      <Table
                        size="medium"
                        aria-label="product specifications table"
                      >
                        {props.specifications.length > 0 && (
                          <TableHead
                            style={{
                              backgroundColor: "#0077be",
                              color: "#FFFFFF",
                            }}
                          >
                            <TableRow>
                              <TableCell>Title</TableCell>
                              <TableCell align="right">Result</TableCell>
                            </TableRow>
                          </TableHead>
                        )}
                        <TableBody>
                          {props.specifications.map((data, i) => (
                            <TableRow key={i}>
                              <TableCell component="th" scope="row">
                                {data.title}
                              </TableCell>
                              <TableCell align="right">{data.result}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
});
export default StepTwo;
