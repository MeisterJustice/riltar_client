import React, { useState, useEffect } from "react";
import { fetchCategories } from "../../store/actions/categories";
import { fetchSubcategories } from "../../store/actions/subcategories";
import PropTypes from "prop-types";
import axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { isMobileOnly } from "react-device-detect";
import { Box } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import NumberFormat from "react-number-format";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import SellHeader from "./SellHeader";
import { postProduct, postProductImage } from "../../store/actions/products";
import { connect } from "react-redux";
import AlertDialogue from "../general-components/AlertDialogue";
import SimpleBackdrop from "../general-components/Backdrop";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

function getSteps() {
  return ["Overview", "More Info"];
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="&#8358; "
    />
  );
}
NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const SellPage = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [productDetails, setProductDetails] = useState({
    title: "",
    category: "",
    subcategory: "",
    description: "",
    price: "",
    minPrice: "",
    condition: "",
    secondCondition: "",
    city: "",
    address: "",
    isNegotiable: false,
    quantity: 1,
  });
  const [cities, setCities] = useState([]);
  const [tag, setTag] = useState("");
  const [chipData, setChipData] = useState([]);
  const [spec, setSpec] = useState({
    specTitle: "",
    specResult: "",
  });
  const [thumbnail, setThumbnail] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [specificationsTable, setSpecificationsTable] = useState([]);
  const [imageLength, setImageLength] = useState("");
  const steps = getSteps();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [backdropOpen, setBackdropOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleBackdropClose = () => {
    setBackdropOpen(false);
  };
  const handleBackdropToggle = () => {
    setBackdropOpen(!open);
  };

  const handleSpecOnChange = (e) => {
    setSpec({ ...spec, [e.target.name]: e.target.value });
  };

  // const handleDeleteSpecification = (specToDelete) => () => {
  //   setSpecificationsTable((specs) =>
  //     specs.filter((spec) => spec.title !== specToDelete)
  //   );
  // };

  const handleAddSpecification = () => {
    setSpecifications([
      ...specifications,
      { [spec.specTitle]: spec.specResult },
    ]);
    setSpecificationsTable([
      ...specificationsTable,
      { title: [spec.specTitle], result: spec.specResult },
    ]);
    setSpec({ specTitle: "", specResult: "" });
  };

  const handleOnChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setProductDetails({ ...productDetails, category: e.target.value });
  };

  const onThumbnailChange = (e) => {
    setImageLength(e.target.files.length);
    setThumbnail([...e.target.files]);
  };

  const handleQuantityOnChange = (e) => {
    if (e.target.value < 1) {
      return;
    } else {
      setProductDetails({ ...productDetails, quantity: e.target.value });
    }
  };

  const handleNegotiationChange = (e) => {
    setProductDetails({ ...productDetails, isNegotiable: e.target.checked });
  };

  const handleTagOnchange = (e) => {
    setTag(e.target.value);
  };
  const handleAddTag = (e) => {
    e.preventDefault();
    if (chipData.length === 5) {
      return;
    } else {
      setChipData([...chipData, { key: tag, label: tag }]);
      setTag("");
    }
  };

  const handleChipDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    axios
      .get("http://locationsng-api.herokuapp.com/api/v1/states/lagos/lgas")
      .then((data) => {
        setCities(data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    props.fetchCategories();
  }, []);

  useEffect(() => {
    props.fetchSubcategories(productDetails.category);
  }, [productDetails.category]);

  const handleNext = () => {
    if (activeStep === 1) {
      return;
    }
    if (activeStep === 0) {
      if (
        !productDetails.title ||
        !productDetails.description ||
        !productDetails.category ||
        !productDetails.subcategory ||
        !productDetails.price ||
        !productDetails.quantity ||
        !productDetails.condition
      ) {
        handleClickOpen();
        return;
      } else if (
        productDetails.isNegotiable === true &&
        !productDetails.minPrice
      ) {
        handleClickOpen();
        return;
      } else if (productDetails.price <= productDetails.minPrice) {
        handleClickOpen();
        return;
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !productDetails.city ||
      !productDetails.address ||
      !thumbnail ||
      !chipData
    ) {
      handleClickOpen();
      return;
    } else {
      handleBackdropToggle();
      const formData = new FormData();
      thumbnail.forEach((file, i) => {
        formData.append(i, file);
      });
      let tags = [];
      for (var i = 0; i < chipData.length; i++) {
        tags.push(chipData[i].label);
      }
      props
        .postProduct(
          { metaData: specifications, tags, ...productDetails },
          props.currentUser.user.id
        )
        .then((data) => {
          props
            .postProductImage(formData, props.currentUser.user.id, data._id)
            .then((data) => {
              setTimeout(() => {
                handleBackdropClose();
                handleClickOpen2();
                setTimeout(() => {
                  props.history.push("/");
                }, 2500);
              }, 0);
            });
        });
    }
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <StepOne
            title={productDetails.title}
            categories={props.categories}
            subcategories={props.subcategories}
            price={productDetails.price}
            quantity={productDetails.quantity}
            minPrice={productDetails.minPrice}
            condition={productDetails.condition}
            secondCondition={productDetails.secondCondition}
            handleNegotiationChange={handleNegotiationChange}
            isNegotiable={productDetails.isNegotiable}
            NumberFormatCustom={NumberFormatCustom}
            description={productDetails.description}
            handleOnChange={handleOnChange}
            handleCategoryChange={handleCategoryChange}
            handleQuantityOnChange={handleQuantityOnChange}
            category={productDetails.category}
            subcategory={productDetails.subcategory}
            handleAddTag={handleAddTag}
            chipData={chipData}
            tag={tag}
            handleTagOnchange={handleTagOnchange}
            handleChipDelete={handleChipDelete}
          />
        );
      case 1:
        return (
          <StepTwo
            city={productDetails.city}
            thumbnail={productDetails.thumbnail}
            imageLength={imageLength}
            handleOnChange={handleOnChange}
            onThumbnailChange={onThumbnailChange}
            cities={cities}
            address={productDetails.address}
            handleAddTag={handleAddTag}
            chipData={chipData}
            tag={tag}
            handleTagOnchange={handleTagOnchange}
            handleChipDelete={handleChipDelete}
            handleSpecOnChange={handleSpecOnChange}
            handleAddSpecification={handleAddSpecification}
            // handleDeleteSpecification={handleDeleteSpecification}
            specTitle={spec.specTitle}
            specResult={spec.specResult}
            specifications={specificationsTable}
          />
        );
      default:
        return "Unknown stepIndex";
    }
  }

  return (
    <Box className="bg">
      <SellHeader />
      <Box position="fixed">
        <Stepper className="callToAction" activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box className="bg">
        <Box>
          <Box>
            {activeStep !== 0 && (
              <Box display="flex" justifyContent="center">
                <Box>
                  <Button
                    size="large"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    style={{ color: activeStep === 0 ? "gray" : "#0077be" }}
                  >
                    <ArrowBackIcon /> Back to previous step
                  </Button>
                </Box>
              </Box>
            )}
            <Box>{getStepContent(activeStep)}</Box>
            {isMobileOnly ? (
              <Box mt={8}>
                <Box>
                  <Button
                    variant="contained"
                    className="callToAction"
                    size="large"
                    fullWidth
                    onClick={activeStep === 1 ? handleSubmit : handleNext}
                  >
                    {activeStep === 1 ? "Submit Product" : "Next"}
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box pb={3} mt={8} mr={25}>
                <Box textAlign="right">
                  <Button
                    variant="contained"
                    className="callToAction"
                    size="large"
                    onClick={activeStep === 1 ? handleSubmit : handleNext}
                  >
                    {activeStep === 1 ? "Submit Product" : "Next"}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <AlertDialogue
        open={open}
        handleClose={handleClose}
        color="#f2514b"
        message={
          productDetails.isNegotiable === true &&
          productDetails.price <= productDetails.minPrice
            ? "The product price must be greater than the minimum negotiable price!"
            : "Please complete all the required fields before going to the next step!"
        }
      />
      <AlertDialogue
        open={open2}
        handleClose={handleClose2}
        color="#45f542"
        message="SUCCESS!! Your product has been posted"
        open2={true}
        content={true}
      />
      <SimpleBackdrop backdropOpen={backdropOpen} />
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    categories: state.categories,
    subcategories: state.subcategories,
    errors: state.errors,
  };
}

export default connect(mapStateToProps, {
  postProduct,
  postProductImage,
  fetchCategories,
  fetchSubcategories,
})(SellPage);
