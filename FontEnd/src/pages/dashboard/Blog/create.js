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

const BlogCreate = (props) => {
  document.title = "Create Blog";

  const history = useNavigate();
  const dispatch = useDispatch();
  const [imageSrcs, setImageSrcs] = useState([]);
  const [missingImages, setMissingImages] = useState([]);

  const selectBlogCreateState = (state) => state;
  const blogCreatepageData = createSelector(selectBlogCreateState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
  }));
  const { error, messageError } = useSelector(blogCreatepageData);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter name"),
      description: Yup.string().required("Please Enter description"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  // "http://localhost:8081/api/admin/v1/file-upload",
  //   {
  //     method: "POST",
  //     body: data,
  //     // headers: {
  //     //   Authorization: `Bearer ${token}`,
  //     // },
  //   };
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("upload", file);
            fetch("http://localhost:8081/api/admin/v1/file-upload", {
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
    const oldImageSrcs = imageSrcs;
    setImageSrcs(srcs);
    checkMissingImages(oldImageSrcs, srcs);
  }, [validation.values.description]);

  function checkMissingImages(oldSrcs, newSrcs) {
    const missing = oldSrcs.filter((src) => !newSrcs.includes(src));
    setMissingImages(missing);
    console.log("Missing images:", missing);
  }

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

  const handleDeleteImage = async (url) => {
    try {
      const response = await fetch(
        `http://localhost:8080/delete?publicId=${publicId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.result === "ok") {
        console.log("Image deleted successfully");
      } else {
        console.error("Error deleting image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Blog Create" pageTitle="Blog" />
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
                    <Col md={12}>
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

export default withRouter(BlogCreate);
