import { useEffect, useState, useCallback } from "react";
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

export default function OfficeProductNew() {
  const [data, setData] = useState({
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
  });

  function onSubmit(e) {
    e.preventDefault();
    console.log(data);

    axios({
      url: `${config.server}/api/products`,
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
  }

  const setFieldValue = useCallback(
    (name, value) => setData((data) => ({ ...data, [name]: value })),
    []
  );

  const addVariant = useCallback(() => {
    const variants = [...data.variants];
    variants.push({
      imageId: null,
      title: null,
      sku: null,
      barcode: null,
      price: 0,
      options: [],
    });
    setData((data) => ({ ...data, variants }));
  }, [data]);

  return (
    <LayoutComponent>
      <form onSubmit={onSubmit}>
        <Layout>
          <Layout.Section>
            <TextField
              label="Title"
              value={data.title}
              onChange={(e) => setFieldValue("title", e)}
            />
            <Editor
              initValue={data.description}
              onData={(e) => setFieldValue("description", e)}
            />
            <DropZone
              product={data}
              upload={async (files) => {
                const data = new FormData();
                data.append("files", files);
                return new Promise((resolve, reject) => {
                  axios({
                    url: `${config.server}/api/files`,
                    method: "post",
                    data,
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
              product={data}
              onData={(e) => setFieldValue("variants", e)}
            />
            <Button submit>Save</Button>
          </Layout.Section>
          <Layout.Section secondary>
            <Active
              value={data.isActive}
              onData={(e) => setFieldValue("isActive", e)}
            />
            <ProductType
              value={data.productType}
              onData={(e) => setFieldValue("productType", ...e)}
            />
            <Vendor
              value={data.vendor}
              onData={(e) => setFieldValue("vendor", ...e)}
            />
            <Tags
              value={data.tags}
              onData={(e) => setFieldValue("tags", e)}
              allowMultiple={true}
            />
            <p>{JSON.stringify(data, null, 2)}</p>
          </Layout.Section>
        </Layout>
      </form>
    </LayoutComponent>
  );
}
