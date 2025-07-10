import React from 'react'
import {PatchEvent, insert} from 'sanity'
import {Stack, Text} from '@sanity/ui'
import VisualSectionPicker from './VisualSectionPicker'

export default function CustomArrayInput(props) {
  const {value = [], onChange, renderDefault} = props

  const handleAdd = (section) => {
    onChange(PatchEvent.from(insert([section], 'after', [-1])))
  }

  return (
    <Stack space={4}>
      {renderDefault(props)}
      <VisualSectionPicker onAdd={handleAdd} />
    </Stack>
  )
}
