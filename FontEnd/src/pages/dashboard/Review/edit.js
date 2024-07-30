import React, { useState, useEffect } from "react"
import BreadCrumb from "../../../Components/Common/BreadCrumb"
import { createSelector } from "reselect"
import withRouter from "../../../Components/Common/withRouter"
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
} from "reactstrap"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { upload } from "@testing-library/user-event/dist/cjs/utility/upload.js"
import { PlusOutlined } from "@ant-design/icons"
import { Image, Upload, message } from "antd"
import { clearNotification } from "../../../slices/message/reducer"
import Select from "react-select"

// CreateBlog
import { editReview, updateReview } from "../../../slices/Review/thunk"
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const BlogEdit = (props) => {
  document.title = "Create Blog"
  const slug = props.router.params.slug
  // console.log(slug);
  const history = useNavigate()
  const dispatch = useDispatch()
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    dispatch(editReview(slug, props.router.navigate))
  }, [dispatch, slug, props.router.navigate])

  const [imageSrcs, setImageSrcs] = useState([])
  // const [missingImages, setMissingImages] = useState([]);

  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState("")

  const selectBlogCreateState = (state) => state
  const blogCreatepageData = createSelector(selectBlogCreateState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    item: state.Review.item,
    SelectOption: state.Review.SelectOption,
    SelectMovie: state.Review.SelectMovie,
  }))
  const { error, messageError, item, SelectOption, SelectMovie } =
    useSelector(blogCreatepageData)

  useEffect(() => {
    if (error) {
      if (messageError != null) {
        message.error(messageError)
      }
    }
    dispatch(clearNotification())
  }, [error])

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
  )

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: item.name || "",
      type: item.type || "",
      movie: item.movieid || "",
      description: item.description || "",
      file: item.thumbnail
        ? [{ uid: item.thumbnail, url: item.thumbnail }]
        : [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter name"),
      movie: Yup.string().required("Please Enter movie"),
      type: Yup.string().required("Please Enter type"),
      description: Yup.string().required("Please Enter description"),
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
      // console.log(values);
      const formData = new FormData()
      formData.append("id", item.id)
      formData.append("name", values.name)
      formData.append("movieId", values.movie)
      formData.append("type", values.type)
      formData.append("description", values.description)

      if (values.file[0].originFileObj) {
        formData.append("file", values.file[0].originFileObj)
      }

      imageSrcs.forEach((image, index) => {
        // console.log("image: ", image);
        formData.append(`url[${index}]`, image)
      })
      dispatch(updateReview(formData, props.router.navigate))
    },
  })

  useEffect(() => {
    if (item.thumbnail) {
      setFileList([{ uid: item.thumbnail, url: item.thumbnail }])
    }
  }, [item.thumbnail])

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    validation.setFieldValue("file", newFileList)
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData()
          loader.file.then((file) => {
            body.append("upload", file)
            body.append("type", "blog")

            fetch("http://localhost:8081/api/admin/file-upload/v1", {
              method: "POST",
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({ default: res.url })
              })
              .catch((err) => {
                reject(err)
              })
          })
        })
      },
    }
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader)
    }
  }

  useEffect(() => {
    const htmlContent = validation.values.description
    const srcs = getImageSrcs(htmlContent)
    // const oldImageSrcs = imageSrcs;
    setImageSrcs(srcs)
  }, [validation.values.description])

  function getImageSrcs(html) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, "text/html")
    const images = doc.querySelectorAll("img")
    const srcs = []
    images.forEach((img) => {
      const publicId = img.src.split("/").slice(-2).join("/")
      srcs.push(publicId)
    })
    return srcs
  }

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Blog Create" pageTitle="Blog" />
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            validation.handleSubmit()
            return false
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
                          thumbnail
                        </Label>
                        <div className="justify-content-center align-items-center d-flex">
                          <Upload
                            beforeUpload={() => false}
                            listType="picture-card"
                            fileList={fileList || []}
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
                                validation.errors.name &&
                                validation.touched.name
                                  ? true
                                  : false
                              }
                            />
                            {validation.errors.name &&
                            validation.touched.name ? (
                              <FormFeedback type="invalid">
                                {validation.errors.name}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="name">
                              Type
                            </Label>
                            <Select
                              name="type"
                              options={SelectOption}
                              placeholder="Select type"
                              classNamePrefix="select"
                              onChange={(option) => {
                                validation.setFieldValue("type", option.value)
                              }}
                              onBlur={() =>
                                validation.setFieldTouched("type", true)
                              }
                              value={SelectOption?.find(
                                (opt) => opt.value === validation.values.type
                              )}
                              className={
                                validation.errors.movie &&
                                validation.touched.movie
                                  ? "is-invalid"
                                  : ""
                              }
                            />
                            {validation.errors.type &&
                            validation.touched.type ? (
                              <FormFeedback type="invalid">
                                {validation.errors.type}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="name">
                              Movie Name
                            </Label>
                            <Select
                              name="movie"
                              options={SelectMovie}
                              placeholder="Select Movie"
                              classNamePrefix="select"
                              onChange={(option) => {
                                validation.setFieldValue("movie", option.value)
                              }}
                              onBlur={() =>
                                validation.setFieldTouched("movie", true)
                              }
                              value={SelectMovie?.find(
                                (opt) => opt.value === validation.values.movie
                              )}
                              className={
                                validation.errors.movie &&
                                validation.touched.movie
                                  ? "is-invalid"
                                  : ""
                              }
                            />
                            {validation.errors.movie &&
                            validation.touched.movie ? (
                              <FormFeedback type="invalid">
                                {validation.errors.movie}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
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
                              const data = editor.getData()
                              validation.setFieldValue("description", data)
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
  )
}

export default withRouter(BlogEdit)
