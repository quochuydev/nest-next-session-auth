import React, { useCallback } from "react";
import { useIndexResourceState, IndexTable, Card, TextField, Thumbnail, Button } from "@shopify/polaris";
import { NoteMinor } from '@shopify/polaris-icons';

function Variant(props){
  const { variant, index, selectedResources, handleChange, removeLine } = props
  const { id, title, price, sku, barcode, imageId, image } = variant;

  return <IndexTable.Row
    id={index}
    key={id}
    selected={selectedResources.includes(index)}
    position={index}
  >
    <IndexTable.Cell>
        <Thumbnail source={image || NoteMinor} />  
    </IndexTable.Cell>
    {/* <IndexTable.Cell>
        <TextField value={title} onChange={value => handleChange(index, 'title', value)} />
    </IndexTable.Cell> */}
    <IndexTable.Cell>
        <TextField value={String(price)} onChange={value => handleChange(index, 'price', value)} type="number" />
    </IndexTable.Cell>
    <IndexTable.Cell>
        <TextField value={sku} onChange={value => handleChange(index, 'sku', value)} />
    </IndexTable.Cell>
    <IndexTable.Cell>
        <TextField value={barcode} onChange={value => handleChange(index, 'barcode', value)} />
    </IndexTable.Cell>
    <IndexTable.Cell>
        <TextField value={variant.options[0]} onChange={value => handleChange(index, 'options', [value, variant.options[1]])} />
    </IndexTable.Cell>
    <IndexTable.Cell>
        <TextField value={variant.options[1]} onChange={value => handleChange(index, 'options', [variant.options[0], value])} />
    </IndexTable.Cell>
    <IndexTable.Cell>
      <Button onClick={() => removeLine(index)}>Remove</Button>
    </IndexTable.Cell>
  </IndexTable.Row>
}

export default React.memo(Variants);

function Variants(props) {
  const { product } = props;
  const { variants } = product;
  
  const resourceName = {
    singular: 'variant',
    plural: 'variants',
  };

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
  } = useIndexResourceState(variants);

  const promotedBulkActions = [
    {
      content: 'Edit variants',
      onAction: () => console.log('Todo: implement bulk edit', selectedResources),
    },
  ];

  const bulkActions = [
    {
      content: 'Delete variants',
      onAction: () => console.log('Todo: implement bulk delete', selectedResources),
    },
  ];

  const handleChange = useCallback((index, name, value) => {
    const newVariants = variants.map((e, i) => (i === index ? ({ ...e, [name]: value }) : e));
    props.onData(newVariants);
  }, [props, variants]);


  const removeLine = (index) => {
    const newVariants = variants.filter((e, i) => i !== index);
    props.onData(newVariants);
  }

  const rowMarkup = variants.map(
    (variant, index) => <Variant {...{ key: index, variant, index, selectedResources, handleChange, removeLine }}/>
  );

  const headings = [
    {title: 'Image'},
    // {title: 'Title'},
    {title: 'Price'},
    {title: 'SKU'},
    {title: 'Barcode'},
    {title: <>Option 1</>},
    {title: 'Option 2'}
  ]

  return (
    <Card>
      <IndexTable
        resourceName={resourceName}
        itemCount={variants.length}
        selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
        onSelectionChange={handleSelectionChange}
        bulkActions={bulkActions}
        promotedBulkActions={promotedBulkActions}
        headings={headings}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}