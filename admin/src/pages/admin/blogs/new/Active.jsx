import React, { useState, useCallback } from "react";
import { Select, Stack, DataTable, Tag } from "@shopify/polaris";

export default function Active(props){
    const options = [
        { label: 'Is active', value: true },
        { label: 'Is draft', value: false }
    ]

    return <Select options={options} onChange={props.onData} value={props.value} />
}