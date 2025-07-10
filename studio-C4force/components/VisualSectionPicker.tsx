import React, {useState} from 'react'
import {Button, Card, Grid, Stack, Text, useToast, Layer} from '@sanity/ui'
import {AddIcon, CloseIcon} from '@sanity/icons'
import {PatchEvent, insert} from 'sanity'
import {useFormValue} from 'sanity'
import {SECTION_LIBRARY} from '../schemaTypes/section-library'
import styles from './VisualSectionPicker.module.css'

export default function VisualSectionPicker({onAdd}) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const toast = useToast()

  const filtered = SECTION_LIBRARY.filter(
    (s) => activeCategory === 'All' || s.category === activeCategory,
  )

  const handleAdd = (type) => {
    const newSection = {_type: type, _key: crypto.randomUUID()}
    onAdd(newSection)
    setPickerOpen(false)
    toast.push({title: `${type} added`, status: 'success'})
  }

  return (
    <>
      <Button
        icon={AddIcon}
        text="Add Section"
        tone="primary"
        onClick={() => setPickerOpen(true)}
      />

      {pickerOpen && (
        <Layer>
          <Card className={styles.modal} padding={4} shadow={2}>
            <Stack space={3}>
              <Button
                icon={CloseIcon}
                text="Close"
                tone="critical"
                onClick={() => setPickerOpen(false)}
              />

              <Grid columns={4} gap={3}>
                {filtered.map((sec) => (
                  <Card
                    key={sec.type}
                    padding={2}
                    radius={2}
                    className={styles.sectionCard}
                    onClick={() => handleAdd(sec.type)}
                  >
                    <img src={sec.thumbnail} alt={sec.title} className={styles.sectionImage} />
                    <Text align="center" size={1} weight="bold">
                      {sec.title}
                    </Text>
                  </Card>
                ))}
              </Grid>

              <Grid columns={3} gap={2}>
                {['All', ...new Set(SECTION_LIBRARY.map((s) => s.category))].map((cat) => (
                  <Button
                    key={cat}
                    text={cat}
                    tone={activeCategory === cat ? 'primary' : 'default'}
                    onClick={() => setActiveCategory(cat)}
                  />
                ))}
              </Grid>
            </Stack>
          </Card>
        </Layer>
      )}
    </>
  )
}
