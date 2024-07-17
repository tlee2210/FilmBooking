import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Input,
  Label,
  FormFeedback,
  Form,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { createSelector } from "reselect";
import Flatpickr from "react-flatpickr";

import { Image, Upload, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { CreateUsers } from "../../../slices/User/thunk";
import { PlusOutlined } from "@ant-design/icons";

import { clearNotification } from "../../../slices/message/reducer";
import Select from "react-select";

const CreateUser = () => {
  document.title = "Create User";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const selectState = (state) => state;

  const CreateUserProperties = createSelector(selectState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
  }));
  const { error, messageError } = useSelector(CreateUserProperties);

  useEffect(() => {
    if (error) {
      if (messageError != null) {
        message.error(messageError);
      }
    }
    dispatch(clearNotification());
  }, [error]);

  const RoleOption = [
    { value: "USER", label: "User" },
    { value: "MANAGER", label: "Manager" },
  ];

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      role: "USER",
      email: "",
      phone: "",
      dateOfBirth: "",
      password: "",
      Gender: "",
      fileList: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter a Name"),
      phone: Yup.string().required("Please Enter a phone"),
      role: Yup.string().required("Please Enter a role"),
      dateOfBirth: Yup.date()
        .min(new Date().fp_incr(-65 * 365), "Minimum age is 65 years")
        .max(new Date().fp_incr(-12 * 365), "Maximum age is 12 years")
        .required("Please select a date of birth"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Please enter your password"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please Enter Your Email"),
      Gender: Yup.string()
        .oneOf(
          ["Male", "Female"],
          "Invalid gender. Please choose either Male or Female."
        )
        .required("Please Enter a Gender"),
      fileList: Yup.array()
        .of(
          Yup.mixed().test(
            "fileType",
            "Unsupported File Format",
            (value) => value && value.type.startsWith("image/")
          )
        )
        .min(1, "Please upload at least one Image"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("name", values.name);
      formData.append("password", values.password);
      formData.append("phone", values.phone);
      formData.append("avatar", values.fileList[0].originFileObj);
      if (values.dateOfBirth) {
        const dob = new Date(values.dateOfBirth);
        const formattedDate = [
          dob.getFullYear(),
          ("0" + (dob.getMonth() + 1)).slice(-2),
          ("0" + dob.getDate()).slice(-2),
        ].join("-"); // Format: YYYY-MM-DD

        formData.append("DOB", formattedDate);
      }
      formData.append("gender", values.Gender);
      formData.append("role", values.role);
      dispatch(CreateUsers(formData, navigate));
    },
  });

  // useEffect(() => {
  //   console.log("Current validation errors:", validation.errors);
  // }, [validation.errors]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) =>
    validation.setFieldValue("fileList", newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="User Management" pageTitle="Create User" />
          <Row>
            <Col md={12}>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={12}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="Name">
                            Avatar
                          </Label>
                          <Upload
                            beforeUpload={() => false}
                            listType="picture-card"
                            fileList={validation.values.fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                          >
                            {validation.values.fileList.length >= 1
                              ? null
                              : uploadButton}
                          </Upload>
                          {previewImage && (
                            <Image
                              wrapperStyle={{
                                display: "none",
                              }}
                              preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) =>
                                  setPreviewOpen(visible),
                                afterOpenChange: (visible) =>
                                  !visible && setPreviewImage(""),
                              }}
                              src={previewImage}
                            />
                          )}
                          {validation.errors.fileList ? (
                            <div className="invalid-feedback d-block">
                              {validation.errors.fileList}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="Name">
                            Name
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="Name"
                            placeholder="Enter Name"
                            name="name"
                            value={validation.values.name || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.name && validation.touched.name
                                ? true
                                : false
                            }
                          />
                          {validation.errors.name && validation.touched.name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.name}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="useremail" className="form-label">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email address"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.email}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="Role">
                            Role
                          </Label>
                          <Select
                            name="role"
                            options={RoleOption}
                            id="Role"
                            placeholder="Select Role"
                            classNamePrefix="select"
                            onChange={(option) => {
                              const roleValue = option ? option.value : null;
                              validation.setFieldValue("role", roleValue);
                            }}
                            onBlur={() =>
                              validation.setFieldTouched("role", true)
                            }
                            value={RoleOption.find(
                              (opt) => opt.value === validation.values.role
                            )}
                          />
                          {validation.errors.role && validation.touched.role ? (
                            <FormFeedback type="invalid">
                              {validation.errors.role}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div className="mb-3">
                          <Label htmlFor="username" className="form-label">
                            phone number
                          </Label>
                          <Input
                            name="phone"
                            type="text"
                            placeholder="Enter username"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.phone || ""}
                            invalid={
                              validation.touched.phone &&
                              validation.errors.phone
                                ? true
                                : false
                            }
                          />
                          {validation.touched.phone &&
                          validation.errors.phone ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.phone}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm={4}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="Gender">
                            Gender
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="Gender"
                            placeholder="Enter Gender"
                            name="Gender"
                            value={validation.values.Gender || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.Gender &&
                              validation.touched.Gender
                                ? true
                                : false
                            }
                          />
                          {validation.errors.Gender &&
                          validation.touched.Gender ? (
                            <FormFeedback type="invalid">
                              {validation.errors.Gender}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="mb-3">
                          <Label htmlFor="username" className="form-label">
                            date Of Birth
                          </Label>
                          <Flatpickr
                            className="form-control"
                            placeholder="date Of Birth"
                            value={validation.values.dateOfBirth}
                            onChange={([selectedDate]) => {
                              validation.setFieldValue(
                                "dateOfBirth",
                                selectedDate
                              );
                            }}
                            options={{
                              minDate: new Date().fp_incr(-65 * 365),
                              maxDate: new Date().fp_incr(-12 * 365),
                            }}
                          />
                          {validation.errors.dateOfBirth &&
                          validation.touched.dateOfBirth ? (
                            <div className="text-danger">
                              {validation.errors.dateOfBirth}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="mb-3">
                          <Label htmlFor="userpassword" className="form-label">
                            Password <span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.password || ""}
                            invalid={
                              validation.touched.password &&
                              validation.errors.password
                                ? true
                                : false
                            }
                          />
                          {validation.touched.password &&
                          validation.errors.password ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.password}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                <div className="mb-3">
                  <button type="submit" className="btn btn-success w-sm">
                    Submit
                  </button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateUser;
