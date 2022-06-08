import React, { useState, useCallback } from "react";
import _ from 'lodash';
import { Select, DataTable } from "@shopify/polaris";
import { WithContext as ReactTags } from 'react-tag-input';
import './reactTags.css';

function RenderOption(props){
    const { value, tags } = props;

    const [selectedTags, setSelectedTags] = useState(tags.map(e => ({ id: e, text: e })));
    const [selected, setSelected] = useState(value);
    const handleSelectChange = useCallback((value) => setSelected(value), []);

    const options = [
        { label: 'Size', value: 'Size' },
        { label: 'Color', value: 'Color' },
    ];

    function handleDelete(i) {
        setSelectedTags(selectedTags.filter((tag, index) => index !== i));
    }

    const handleDrag = useCallback((tag, currPos, newPos) => {
        const newTags = [...selectedTags].slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setSelectedTags(newTags);
    }, []);

    const Keys = {
        TAB: 9,
        SPACE: 32,
        COMMA: 188,
    };

    return [<Select options={options} onChange={handleSelectChange} value={selected} />,
        <ReactTags 
            tags={selectedTags}
            handleDelete={handleDelete}
            handleAddition={tag => setSelectedTags(prev => [...prev, tag])}
            handleDrag={handleDrag}
            delimiters={[Keys.TAB, Keys.SPACE, Keys.COMMA]}
        />];
}

export default function Tags(props) {
    const { product } = props;

    const rows = [];

    const genTags = (product, index) => {
        const result = product.variants.map(e => e.option1);
        return _.uniqBy(result);
    };

    product.options.map((e, i) => rows.push(RenderOption({ value: e, tags: genTags(product, i), onData: e => console.log(e) })))

    return (<DataTable columnContentTypes={['text', 'text']} headings={['', '']} rows={rows} />)
}