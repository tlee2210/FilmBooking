import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { createSelector } from "reselect";
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
  Button,
} from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { upload } from "@testing-library/user-event/dist/cjs/utility/upload.js";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, message } from "antd";
import { clearNotification } from "../../../slices/message/reducer";
// CreateBlog
import { CreatePromotion } from "../../../slices/Promotion/thunk";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const promotionCreate = (props) => {
  document.title = "Create Promotion";

  const history = useNavigate();
  const dispatch = useDispatch();
  const [imageSrcs, setImageSrcs] = useState([]);
  // const [missingImages, setMissingImages] = useState([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const selectPromotionCreateState = (state) => state;
  const PromotionCreatepageData = createSelector(
    selectPromotionCreateState,
    (state) => ({
      error: state.Message.error,
      messageError: state.Message.messageError,
    })
  );
  const { error, messageError } = useSelector(PromotionCreatepageData);

  useEffect(() => {
    if (error) {
      if (messageError != null) {
        message.error(messageError);
      }
    }
    dispatch(clearNotification());
  }, [error]);

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

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
      file: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter name"),
      description: Yup.string().required("Please Enter description"),
      file: Yup.array()
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
      // console.log(values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("file", values.file[0].originFileObj);
      imageSrcs.forEach((image, index) => {
        // console.log("image: ", image);
        formData.append(`url[${index}]`, image);
      });
      dispatch(CreatePromotion(formData, props.router.navigate));
    },
  });

  const handleChange = ({ fileList: newFileList }) =>
    validation.setFieldValue("file", newFileList);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("upload", file);
            body.append("type", "Promotion");
            fetch("http://localhost:8081/api/admin/file-upload/v1", {
              method: "POST",
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({ default: res.url });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  useEffect(() => {
    const htmlContent = validation.values.description;
    const srcs = getImageSrcs(htmlContent);
    // const oldImageSrcs = imageSrcs;
    setImageSrcs(srcs);
    // checkMissingImages(oldImageSrcs, srcs);
  }, [validation.values.description]);

  // function checkMissingImages(oldSrcs, newSrcs) {
  //   const missing = oldSrcs.filter((src) => !newSrcs.includes(src));
  //   setMissingImages((prevMissing) => [...prevMissing, ...missing]);
  //   console.log("Missing images:", missing);
  // }

  function getImageSrcs(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const images = doc.querySelectorAll("img");
    const srcs = [];
    images.forEach((img) => {
      const publicId = img.src.split("/").slice(-2).join("/");
      srcs.push(publicId);
    });
    return srcs;
  }

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Promotion Create" pageTitle="Promotion" />
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={2}>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="name">
                          Thumbnail
                        </Label>
                        <div className="justify-content-center align-items-center d-flex">
                          <Upload
                            beforeUpload={() => false}
                            listType="picture-card"
                            fileList={validation.values.file}
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
                            <div className="invalid-feedback d-block">
                              {validation.errors.file}
                            </div>
                          ) : null}
                        </div>
                        {validation.errors.file && validation.touched.file ? (
                          <FormFeedback type="invalid">
                            {validation.errors.file}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={10}>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="name">
                          Name
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="product-title-input"
                          placeholder="Enter name"
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
                    <Col md={12}>
                      <Card>
                        <CardHeader>
                          <h5 className="card-title mb-0">Description</h5>
                        </CardHeader>
                        <CardBody>
                          <CKEditor
                            editor={ClassicEditor}
                            config={{ extraPlugins: [uploadPlugin] }}
                            data={validation.values.description}
                            onChange={(event, editor) => {
                              // console.log("event: ", event);
                              // console.log("editor: ", editor);
                              const data = editor.getData();
                              validation.setFieldValue("description", data);
                            }}
                            // onReady={(editor) => {
                            //   console.log("Editor is ready to use: ", editor);
                            // }}
                            onBlur={() =>
                              validation.setFieldTouched("description", true)
                            }
                          />
                          {validation.touched.description &&
                            validation.errors.description ? (
                            <div className="invalid-feedback d-block">
                              {validation.errors.description}
                            </div>
                          ) : null}
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <div className="mb-3">
              <Button type="submit" className="btn btn-success w-sm">
                Submit
              </Button>
            </div>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default withRouter(promotionCreate);
