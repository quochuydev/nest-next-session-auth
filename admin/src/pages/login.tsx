import React, { useCallback, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  FormLayout,
  TextField,
} from "@shopify/polaris";

export default function FormOnSubmitExample() {
  const [newsletter, setNewsletter] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = useCallback((_event) => {
    setNewsletter(false);
  }, []);

  const handleNewsLetterChange = useCallback(
    (value) => setNewsletter(value),
    []
  );

  const handleChange = useCallback(
    (name, value) => setData({ ...data, [name]: value }),
    [data]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <Checkbox
          label="Sign up for the Polaris newsletter"
          checked={newsletter}
          onChange={handleNewsLetterChange}
        />

        <TextField
          value={data.email}
          onChange={(value) => handleChange("email", value)}
          label="Email"
          autoComplete="email"
          helpText={
            <span>
              We’ll use this email address to inform you on future changes to
              Polaris.
            </span>
          }
        />

        <TextField
          value={data.password}
          onChange={(value) => handleChange("password", value)}
          label="password"
          type="password"
          autoComplete="password"
          helpText={
            <span>
              We’ll use this email address to inform you on future changes to
              Polaris.
            </span>
          }
        />

        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
  );
}
