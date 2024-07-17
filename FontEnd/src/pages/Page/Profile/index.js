import React, { useState, useEffect } from "react";
import { createSelector } from "reselect";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getprofile,
  UpdateProfile,
  changePassword,
  uploadAvatar,
} from "../../../slices/home/profileHome/thunk";
import { useFormik } from "formik";
import * as Yup from "yup";
import Flatpickr from "react-flatpickr";
// import Select from "react-select";
import avatar from "../../../assets/images/User-avatar.png";
import { clearNotification } from "../../../slices/message/reducer";
import { message } from "antd";

import "./css/Profile.css";
import {
  Card,
  Row,
  CardBody,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
// import { color } from "echarts";

const Tabs = ({ selectedTab, onTabChange }) => {
  const tabs = [
    "Transaction History",
    "Personal Information",
    "Change Password",
  ];

  return (
    <ul className="tabs-tai-khoan">
      {tabs.map((tab, index) => (
        <li
          key={index}
          className={`tab-item-tai-khoan ${
            selectedTab === tab ? "active-tai-khoan" : ""
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </li>
      ))}
    </ul>
  );
};

const Profile = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modal_center, setmodal_center] = useState(false);
  const [DetailBooking, setDetailBooking] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Transaction History");

  useEffect(() => {
    dispatch(getprofile());
  }, [dispatch]);
  const ProfileState = (state) => state;

  const StateData = createSelector(ProfileState, (state) => ({
    success: state.Message.success,
    messageSuccess: state.Message.messageSuccess,
    error: state.Message.error,
    messageError: state.Message.messageError,
    ProfileData: state.HomeProfile.ProfileData,
  }));

  const { error, messageError, ProfileData, success, messageSuccess } =
    useSelector(StateData);

  useEffect(() => {
    if (success) {
      if (messageSuccess != null) {
        message.success(messageSuccess);
      }
    }
    if (error) {
      if (messageError != null) {
        message.error(messageError);
      }
    }
    dispatch(clearNotification());
  }, [dispatch, success, error]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: ProfileData?.name || "",
      email: ProfileData?.email || "",
      phone: ProfileData?.phone || "",
      dayOfBirth: ProfileData?.dob || "",
      gender: ProfileData?.gender || "Male",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter a Name"),
      phone: Yup.string().required("Please Enter a phone"),
      dayOfBirth: Yup.date()
        .min(new Date().fp_incr(-65 * 365), "Minimum age is 65 years")
        .max(new Date().fp_incr(-12 * 365), "Maximum age is 12 years")
        .required("Please select a day of birth"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please Enter Your Email"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      if (values.dayOfBirth) {
        const dob = new Date(values.dayOfBirth);
        const formattedDate = [
          dob.getFullYear(),
          ("0" + (dob.getMonth() + 1)).slice(-2),
          ("0" + dob.getDate()).slice(-2),
        ].join("-"); // Format: YYYY-MM-DD

        console.log(formattedDate);

        formData.append("dob", formattedDate);
      }
      formData.append("gender", values.gender);

      dispatch(UpdateProfile(formData, navigate));
    },
  });

  const passwordValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      password: "",
      old_password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Please enter your password"),
      old_password: Yup.string()
        .min(8, "Old password must be at least 8 characters long")
        .required("Please enter your Old password"),
      confirm_password: Yup.string()
        .min(8, "confirm Password must be at least 8 characters long")
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Please confirm your password"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      const formData = new FormData();
      formData.append("password", values.old_password);
      formData.append("newPassword", values.password);
      formData.append("repeatPassword", values.confirm_password);
      dispatch(changePassword(formData, navigate));
    },
  });

  const formatTime = (timeString) => {
    if (timeString) {
      const [hours, minutes] = timeString.split(":");
      return `${hours}:${minutes}`;
    }
    return "";
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      dispatch(uploadAvatar(formData, navigate));
    }
  };

  document.title = "Profile";

  function tog_center(id) {
    if (id) {
      setDetailBooking(
        ProfileData?.bookingList?.find((item) => item.id === id)
      );
    }
    setmodal_center(!modal_center);
  }
  // console.log(DetailBooking);

  return (
    <div
      className="container-tai-khoan"
      style={{ paddingTop: 120, minHeight: "100vh" }}
    >
      <div className="profile-wrapper-tai-khoan">
        <div className="profile-card-tai-khoan rounded-4 shadow-lg p-3 bg-white rounded">
          <div className="profile-header-tai-khoan">
            <div className="profile-user position-relative d-inline-block mb-4">
              {ProfileData && ProfileData?.avatar ? (
                <img
                  src={ProfileData.avatar}
                  alt="Avatar"
                  className="rounded-circle avatar-xl img-thumbnail user-profile-image material-shadow"
                />
              ) : (
                <img
                  src={avatar}
                  alt={ProfileData?.name}
                  className="rounded-circle avatar-xl img-thumbnail user-profile-image material-shadow"
                />
              )}
              <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                <Input
                  id="profile-img-file-input"
                  type="file"
                  className="profile-img-file-input"
                  onChange={handleFileChange}
                />
                <Label
                  htmlFor="profile-img-file-input"
                  className="profile-photo-edit avatar-xs"
                >
                  <span className="avatar-title rounded-circle bg-light text-body material-shadow">
                    <i className="ri-camera-fill"></i>
                  </span>
                </Label>
              </div>
            </div>

            {/* avatar */}
            <div className="profile-info-tai-khoan">
              <h5 className="profile-name-tai-khoan">{ProfileData?.name}</h5>
              {/* <p className="profile-stars-tai-khoan">0 Stars</p> */}
            </div>
          </div>
          <div className="spending-info-tai-khoan">
            <h6 className="spending-title-tai-khoan">Tổng chi tiêu 2024</h6>
            <p className="spending-amount-tai-khoan">0 đ</p>
            <div className="spending-scale-tai-khoan">
              <span>0 đ</span>
              <span>2.000.000 đ</span>
              <span>4.000.000 đ</span>
            </div>
            <div className="progress-bar-tai-khoan">
              <div
                className="progress-fill-tai-khoan"
                style={{ width: "25%" }}
              ></div>
            </div>
          </div>
          {/* <div className="contact-info-tai-khoan">
            <p>HOTLINE hỗ trợ: 19002224 (9:00 - 22:00)</p>
            <p>Email: hotro@galaxystudio.vn</p>
            <p>Câu hỏi thường gặp</p>
          </div> */}
        </div>
        <div className="tabs-container-tai-khoan">
          <Tabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
          <div className="tab-content-tai-khoan mb-3 ">
            {selectedTab === "Personal Information" && (
              <Form
                className="form-tai-khoan rounded-4 shadow-lg p-3 bg-white rounded"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Card>
                  <CardBody>
                    <Row>
                      {/* <Col md={12}>
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
                      </Col> */}
                      <Col md={6}>
                        <div className="mb-3 me-2">
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
                          <Label htmlFor="email" className="form-label">
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
                      <Col sm={6}>
                        <div className="mb-3 me-2">
                          <Label htmlFor="phone" className="form-label">
                            Phone number
                          </Label>
                          <Input
                            name="phone"
                            type="text"
                            placeholder="Enter Phone number"
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
                      <Col sm={6}>
                        <div className="mb-3">
                          <Label htmlFor="username" className="form-label">
                            day Of Birth
                          </Label>
                          <Flatpickr
                            className="form-control"
                            placeholder="day Of Birth"
                            value={validation.values.dayOfBirth}
                            onChange={([selectedDate]) => {
                              validation.setFieldValue(
                                "dayOfBirth",
                                selectedDate
                              );
                            }}
                            options={{
                              minDate: new Date().fp_incr(-65 * 365),
                              maxDate: new Date().fp_incr(-12 * 365),
                            }}
                          />
                          {validation.errors.dayOfBirth &&
                          validation.touched.dayOfBirth ? (
                            <div className="text-danger">
                              {validation.errors.dayOfBirth}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <div
                            className="form-radio-group-tai-khoan"
                            style={{ paddingTop: 20, cursor: "not-allowed" }}
                          >
                            <Label
                              className="form-radio-tai-khoan"
                              style={{ cursor: "not-allowed" }}
                            >
                              <Input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={validation.values.gender === "Male"}
                                onChange={validation.handleChange}
                              />{" "}
                              Male
                            </Label>
                            <Label
                              className="form-radio-tai-khoan"
                              style={{ cursor: "not-allowed" }}
                            >
                              <Input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={validation.values.gender === "Female"}
                                onChange={validation.handleChange}
                              />{" "}
                              Female
                            </Label>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                {/* <div className="mb-3 m-3">
                  <button type="submit" className="btn btn-success w-sm">
                    Update
                  </button>
                </div> */}

                <Col lg={12}>
                  <div className="hstack gap-2 justify-content-end mt-2 mb-2">
                    <button type="submit" className="btn btn-success">
                      Updates
                    </button>
                    {/* <button
                      type="button"
                      className="btn btn-soft-success"
                      onClick={handleCancel()}
                    >
                      Cancel
                    </button> */}
                  </div>
                </Col>
              </Form>
            )}

            {selectedTab === "Transaction History" && (
              <div className="transaction-history">
                <h5>Transaction History</h5>
                <p>Note: only displays the 20 most recent transactions</p>
                {/* <div className="transaction-month">Tháng 05/2022</div> */}
                {ProfileData && ProfileData.bookingList
                  ? ProfileData.bookingList.map((item, index) => (
                      <div className="transaction" key={index}>
                        <div className="transaction-image">
                          <img src={item?.image} alt="Movie" />
                        </div>
                        <div className="transaction-details">
                          <div className="transaction-info-left">
                            <p style={{ fontWeight: "bold" }}>
                              {item?.movieName}
                            </p>
                            <p>
                              {item?.movieFormat}{" "}
                              {item?.rules ? (
                                <span className="age-restriction">
                                  {item?.rules} yrs
                                </span>
                              ) : null}
                            </p>
                          </div>
                          <div className="transaction-info-right">
                            <p>{item?.cinemaName}</p>
                            <p>
                              <span style={{ fontWeight: "bold" }}>
                                {formatTime(item?.showTime)} -
                              </span>{" "}
                              <span style={{ fontWeight: "bold" }}>
                                {item?.showTimeDate}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="transaction-action">
                          <a
                            style={{ color: "rgb(245, 128, 32)" }}
                            onClick={() => tog_center(item?.id)}
                          >
                            Detail
                          </a>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            )}

            {selectedTab === "Change Password" && (
              <React.Fragment>
                <div className="p-2 rounded-4 shadow-lg p-3 bg-white rounded">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      passwordValidation.handleSubmit();
                      return false;
                    }}
                  >
                    {/* old_password */}
                    <div className="mb-3">
                      <Label htmlFor="userpassword" className="form-label">
                        Old password <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="old_password"
                        type="password"
                        placeholder="Enter Password"
                        onChange={passwordValidation.handleChange}
                        onBlur={passwordValidation.handleBlur}
                        value={passwordValidation.values.old_password || ""}
                        invalid={
                          passwordValidation.touched.old_password &&
                          passwordValidation.errors.old_password
                            ? true
                            : false
                        }
                      />
                      {passwordValidation.touched.old_password &&
                      passwordValidation.errors.old_password ? (
                        <FormFeedback type="invalid">
                          <div>{passwordValidation.errors.old_password}</div>
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="userpassword" className="form-label">
                        Password <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        onChange={passwordValidation.handleChange}
                        onBlur={passwordValidation.handleBlur}
                        value={passwordValidation.values.password || ""}
                        invalid={
                          passwordValidation.touched.password &&
                          passwordValidation.errors.password
                            ? true
                            : false
                        }
                      />
                      {passwordValidation.touched.password &&
                      passwordValidation.errors.password ? (
                        <FormFeedback type="invalid">
                          <div>{passwordValidation.errors.password}</div>
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-2">
                      <Label htmlFor="confirmPassword" className="form-label">
                        Confirm Password <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="confirm_password"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={passwordValidation.handleChange}
                        onBlur={passwordValidation.handleBlur}
                        value={passwordValidation.values.confirm_password || ""}
                        invalid={
                          passwordValidation.touched.confirm_password &&
                          passwordValidation.errors.confirm_password
                            ? true
                            : false
                        }
                      />
                      {passwordValidation.touched.confirm_password &&
                      passwordValidation.errors.confirm_password ? (
                        <FormFeedback type="invalid">
                          <div>
                            {passwordValidation.errors.confirm_password}
                          </div>
                        </FormFeedback>
                      ) : null}
                    </div>

                    <Col lg={12}>
                      <div className="hstack gap-2 justify-content-end mt-2 mb-2">
                        <button type="submit" className="btn  btn-success">
                          change Password
                        </button>
                      </div>
                    </Col>
                  </Form>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
      <Modal
        isOpen={modal_center}
        toggle={() => {
          tog_center();
        }}
        centered
      >
        <ModalHeader
          className="modal-title"
          style={{ borderTop: "14px solid #ff6600" }}
        />

        <ModalBody className="text-center p-5">
          <img
            src={DetailBooking?.image}
            alt={DetailBooking?.movieName}
            colors="primary:#121331,secondary:#08a88a"
            style={{ width: "120px" }}
          ></img>
          <div className="mt-4">
            <h4 className="mb-3">
              {DetailBooking?.movieName} - {DetailBooking?.movieFormat}
              {DetailBooking?.rules ? (
                <span className="age-restriction">
                  {DetailBooking?.rules} yrs
                </span>
              ) : null}
            </h4>
            <Row className="text-muted mb-4">
              <Col md={5}>
                <p className="text-start">Cinema Name: </p>
              </Col>
              <Col md={6}>
                <p className="text-start"> {DetailBooking?.cinemaName}</p>
              </Col>
              <hr style={{ border: "1px dashed black" }} />
              <Col md={5}>
                <p className="text-start">Room: </p>
              </Col>
              <Col md={6}>
                <p className="text-start"> {DetailBooking?.roomName}</p>
              </Col>
              <hr style={{ border: "1px dashed black" }} />
              <Col md={5}>
                <p className="text-start">Show Time: </p>
              </Col>
              <Col md={6}>
                <p className="text-start">
                  {formatTime(DetailBooking?.showTime)} Day{" "}
                  {DetailBooking?.bookingDate}
                </p>
                {/* <p>{DetailBooking?.bookingDate} </p> */}
              </Col>
              <hr style={{ border: "1px dashed black" }} />
              <Col md={5}>
                <p className="text-start">Payment Type: </p>
              </Col>
              <Col md={6}>
                <p className="text-start">{DetailBooking?.paymentType}</p>
              </Col>
              <hr style={{ border: "1px dashed black" }} />
              {DetailBooking && DetailBooking?.quantitySeat ? (
                <React.Fragment>
                  <Col md={5}>
                    <p className="text-start">Quantity Seat: </p>
                  </Col>
                  <Col md={6}>
                    <p className="text-start">{DetailBooking?.quantitySeat}</p>
                  </Col>
                  <hr style={{ border: "1px dashed black" }} />
                </React.Fragment>
              ) : null}
              {DetailBooking && DetailBooking?.quantityDoubleSeat ? (
                <React.Fragment>
                  <Col md={5}>
                    <p className="text-start">Quantity DoubleSeat: </p>
                  </Col>
                  <Col md={6}>
                    <p className="text-start">
                      {DetailBooking?.quantityDoubleSeat}
                    </p>
                  </Col>
                  <hr style={{ border: "1px dashed black" }} />
                </React.Fragment>
              ) : null}
              {DetailBooking &&
              DetailBooking?.bookingWaterCorn &&
              DetailBooking?.bookingWaterCorn.length > 0 ? (
                <React.Fragment>
                  <Col md={5}>
                    <p className="text-start">Water Corn: </p>
                  </Col>
                  <Col md={6}>
                    {DetailBooking && DetailBooking?.bookingWaterCorn
                      ? DetailBooking?.bookingWaterCorn.map((item, index) => (
                          <p className="text-start" key={index}>
                            {item.quantity}X {item.name}
                          </p>
                        ))
                      : null}
                  </Col>
                  <hr style={{ border: "1px dashed black" }} />
                </React.Fragment>
              ) : null}
              <Col md={5}>
                <p className="text-start">Total Price: </p>
              </Col>
              <Col md={6}>
                <p className="text-start">{DetailBooking?.totalPrice} VND</p>
              </Col>
            </Row>
            <div className="hstack gap-2 justify-content-center">
              <Button color="light" onClick={() => setmodal_center(false)}>
                Close
              </Button>
              {/* <Link to="#" className="btn btn-danger">
                Try Again
              </Link> */}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Profile;
