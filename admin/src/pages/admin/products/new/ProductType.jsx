import React, { useState, useCallback } from "react";
import { Icon, Button, Autocomplete } from "@shopify/polaris";
import { PlusMinor } from '@shopify/polaris-icons';

export default React.memo(AutocompleteComponent);

function AutocompleteComponent(props) {
  const { value: selectedOptions, allowMultiple = false } = props;

  const deselectedOptions = [
    {value: 'type1', label: 'Type 1'},
    {value: 'type2', label: 'Type 2'},
    {value: 'type3', label: 'Type 3'},
  ];

  const [inputValue, setInputValue] = useState(selectedOptions);
  const [options, setOptions] = useState(deselectedOptions);
  const [loading, setLoading] = useState(false);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (!loading) {
        setLoading(true);
      }

      setTimeout(() => {
        if (value === '') {
          setOptions(deselectedOptions);
          setLoading(false);
          return;
        }
        const filterRegex = new RegExp(value, 'i');
        const resultOptions = options.filter((option) =>
          option.label.match(filterRegex),
        );
        setOptions(resultOptions);
        setLoading(false);
      }, 300);
    },
    [deselectedOptions, loading, options],
  );

  const updateSelection = useCallback(
    (selected) => {
      props.onData(selected)
      setInputValue(allowMultiple ? selected.join(', ') : selected[0]);
    },
    [options],
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Product type"
      value={inputValue}
      placeholder="exp: T-Shirt"
    />
  );

  const emptyState = (
    <Button icon={<Icon source={PlusMinor} />}>Add new: {inputValue}</Button>
  );

  return (
    <Autocomplete
      allowMultiple={allowMultiple}
      options={options}
      selected={selectedOptions}
      onSelect={updateSelection}
      emptyState={emptyState}
      loading={loading}
      textField={textField}
    />
  );
}