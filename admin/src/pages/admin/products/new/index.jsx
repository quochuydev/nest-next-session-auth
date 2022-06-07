import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { Layout, Button, Checkbox, TextField } from "@shopify/polaris";

import config from "../../../../utils/config";
import Editor from "../../../../components/Editor";
import DropZone from "../../../../components/DropZone";
import Variants from "./Variants";
import ProductType from "./ProductType";
import Vendor from "./ProductType";
import Tags from "./ProductType";
import Active from "./Active";
import LayoutComponent from "../../../../components/Layout";
import { useFormik } from "formik";

export default function OfficeProductNew() {
  const formik = useFormik({
    initialValues: {
      title: null,
      handle: null,
      description: null,
      options: [],
      productType: null,
      vendor: null,
      tags: [],
      isActive: true,
      variants: [
        {
          imageId: null,
          title: null,
          sku: null,
          barcode: null,
          price: 0,
          options: [],
        },
      ],
    },
    onSubmit: (data) => {
      console.log(data);

      axios({
        url: `${config.server}/api.back-office.product.create`,
        method: "post",
        data,
      })
        .then((res) => {
          var result = res.data;
          console.log("result", result);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const { values, handleSubmit, setFieldValue, handleChange } = formik;

  const addVariant = useCallback(() => {
    setFieldValue("variants", [
      ...values.variants,
      {
        imageId: null,
        title: null,
        sku: null,
        barcode: null,
        price: 100000,
        options: [],
      },
    ]);
  }, [values.variants, setFieldValue]);

  return (
    <LayoutComponent>
      <form onSubmit={handleSubmit}>
        <Layout>
          <Layout.Section>
            <TextField
              label="Title"
              value={values.title}
              onChange={(e) => setFieldValue("title", e)}
            />

            {useMemo(
              () => (
                <Editor
                  initValue={values.description}
                  onData={(e) => setFieldValue("description", e)}
                />
              ),
              [values.description, setFieldValue]
            )}

            <DropZone
              product={values}
              upload={async (files) => {
                const data = new FormData();
                data.append("files", files[0]);
                return new Promise((resolve, reject) => {
                  axios({
                    url: `${config.server}/files`,
                    method: "post",
                    data,
                    headers: { "Content-Type": "multipart/form-data" },
                  })
                    .then((res) => {
                      console.log("resData.files", res.data);
                      resolve(res.data);
                    })
                    .catch((error) => {
                      console.log(error);
                      reject(error);
                    });
                });
              }}
            />

            <Button onClick={addVariant}>Add variant</Button>
            <Variants
              product={values}
              onData={(e) => setFieldValue("variants", e)}
            />
            <Button submit>Save</Button>
          </Layout.Section>
          <Layout.Section secondary>
            {/* <Active
              value={values.isActive}
              onData={(e) => setFieldValue("isActive", e)}
            />
            <ProductType
              value={values.productType}
              onData={(e) => setFieldValue("productType", ...e)}
            />
            <Vendor
              value={values.vendor}
              onData={(e) => setFieldValue("vendor", ...e)}
            />
            <Tags
              value={values.tags}
              onData={(e) => setFieldValue("tags", e)}
              allowMultiple={true}
            /> */}
            <p>{JSON.stringify(values, null, 2)}</p>
          </Layout.Section>
        </Layout>
      </form>
    </LayoutComponent>
  );
}
