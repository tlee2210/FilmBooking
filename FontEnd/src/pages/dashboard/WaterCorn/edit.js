import React, { useState, useEffect } from "react";
import withRouter from "../../../Components/Common/withRouter";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Row,
  Input,
  Label,
  FormFeedback,
  Form,
} from "reactstrap";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../../../slices/message/reducer";
import { Link, useNavigate } from "react-router-dom";
import { createSelector } from "reselect";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {
  UpdateWaterCorn,
  GetEditWaterCorn,
} from "../../../slices/WaterCorn/thunk";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const WaterCornEdit = (props) => {
  document.title = "Edit Water Corn";
  const slug = props.router.params.slug;
  const history = useNavigate();
  const dispatch = useDispatch();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [file, setFile] = useState([]);

  useEffect(() => {
    dispatch(GetEditWaterCorn(slug, props.router.navigate));
  }, [slug, props.router.nav, dispatch]);

  const selectWaterCornCreateState = (state) => state;
  const WaterCornCreatepageData = createSelector(
    selectWaterCornCreateState,
    (state) => ({
      error: state.Message.error,
      messageError: state.Message.messageError,
      item: state.WaterCorn.item,
    })
  );
  const { error, messageError, item } = useSelector(WaterCornCreatepageData);

  useEffect(() => {
    if (item.image) {
      setFile([{ uid: item.image, url: item.image }]);
    }
  }, [item.image]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: item.name || "",
      price: item.price || "",
      Description: item.description || "",
      file: item.image
        ? [
          {
            uid: item.image,
            url: item.image,
          },
        ]
        : [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter a Title"),
      price: Yup.string().required("Please Enter Price"),
      Description: Yup.string().required("Please Enter Description"),
      file: Yup.array()
        .of(
          Yup.mixed().test(
            "fileType",
            "Unsupported File Format",
            (value) =>
              !value.originFileObj ||
              (value.originFileObj && value.type.startsWith("image/"))
          )
        )
        .min(1, "Please upload at least one Image"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("id", item.id);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.Description);
      if (values.file[0].originFileObj) {
        formData.append("file", values.file[0].originFileObj);
      }

      dispatch(UpdateWaterCorn(formData, props.router.navigate));

      // CreateWaterCorn
    },
  });

  useEffect(() => {
    if (error) {
      if (messageError != null) {
        message.error(messageError);
      }
    }
    dispatch(clearNotification());
  }, [error]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFile(newFileList);
    validation.setFieldValue("file", newFileList);
  };

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
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Cinemas Management" pageTitle="Water Corn Edit" />
        <Row>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <Col md={12}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">Water Corn Edit</h5>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          Title
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="product-title-input"
                          placeholder="Enter Title"
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
                        <Label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          Price
                        </Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="product-title-input"
                          placeholder="Enter price"
                          name="price"
                          value={validation.values.price || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.price && validation.touched.price
                              ? true
                              : false
                          }
                        />
                        {validation.errors.price && validation.touched.price ? (
                          <FormFeedback type="invalid">
                            {validation.errors.price}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={2}>
                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          Image
                        </Label>
                        <div className="justify-content-center align-items-center d-flex">
                          <Upload
                            beforeUpload={() => false}
                            listType="picture-card"
                            fileList={file}
                            onPreview={handlePreview}
                            onChange={handleChange}
                          >
                            {validation.values.file.length >= 1
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
                          {validation.errors.file && validation.touched.file ? (
                            <div className="invalid-feedback d-block me-2">
                              {validation.errors.file}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </Col>
                    <Col md={12}>
                      <Card>
                        <CardHeader>
                          <h5 className="card-title mb-0">Description</h5>
                        </CardHeader>
                        <CardBody>
                          {" "}
                          <CKEditor
                            editor={ClassicEditor}
                            data={validation.values.Description}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              validation.setFieldValue("Description", data);
                            }}
                            onBlur={() =>
                              validation.setFieldTouched("Description", true)
                            }
                          />
                          {validation.touched.Description &&
                            validation.errors.Description ? (
                            <div className="invalid-feedback d-block">
                              {validation.errors.Description}
                            </div>
                          ) : (
                            <div className="invalid-feedback d-block"></div>
                          )}
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <div className="mb-3">
              <button type="submit" className="btn btn-success w-sm">
                Submit
              </button>
            </div>
          </Form>
        </Row>
      </Container>
    </div>
  );
};
export default withRouter(WaterCornEdit);
