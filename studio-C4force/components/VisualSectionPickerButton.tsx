import React, {useState} from 'react'
import {Button, Card, Stack, Flex, Box, Text} from '@sanity/ui'
import {AddIcon} from '@sanity/icons'
import {SECTION_LIBRARY} from '../schemaTypes/section-library'

export default function VisualSectionPickerButton({onInsert}) {
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')

  const handleAddSection = (sectionType) => {
    onInsert({_type: sectionType}) // ✅ This uses native insert -> opens Sanity’s default editor
    setIsPickerOpen(false)
  }

  const filteredSections =
    activeCategory === 'All'
      ? SECTION_LIBRARY
      : SECTION_LIBRARY.filter((section) => section.category === activeCategory)

  return (
    <div>
      {/* Sanity's "Add Item" button override */}
      <Button
        icon={AddIcon}
        text="Add Section"
        tone="primary"
        onClick={() => setIsPickerOpen(true)}
      />

      {/* Visual Picker Modal */}
      {isPickerOpen && (
        <Box padding={4} marginTop={4} style={{border: '1px solid #ccc', borderRadius: '8px'}}>
          <Stack space={4}>
            <Button text="Close Picker" tone="critical" onClick={() => setIsPickerOpen(false)} />

            {/* Category Tabs */}
            <Flex gap={3} wrap="wrap">
              {['All', 'Hero', 'Editorial', 'Content First', 'Presentation First', 'Product'].map(
                (category) => (
                  <Button
                    key={category}
                    text={category}
                    tone={activeCategory === category ? 'primary' : 'default'}
                    onClick={() => setActiveCategory(category)}
                  />
                ),
              )}
            </Flex>

            {/* Visual Section Grid */}
            <Flex wrap="wrap" gap={4}>
              {filteredSections.map((section) => (
                <Card
                  key={section.type}
                  padding={3}
                  radius={2}
                  style={{
                    cursor: 'pointer',
                    width: '150px',
                    border: '1px solid #ddd',
                    textAlign: 'center',
                  }}
                  onClick={() => handleAddSection(section.type)}
                  shadow={1}
                >
                  <Stack space={2} align="center">
                    <Box style={{height: '100px', width: '100%', overflow: 'hidden'}}>
                      <img
                        src={section.thumbnailUrl}
                        alt={section.title}
                        style={{width: '100%', objectFit: 'cover'}}
                      />
                    </Box>
                    <Text>{section.title}</Text>
                  </Stack>
                </Card>
              ))}
            </Flex>
          </Stack>
        </Box>
      )}
    </div>
  )
}
