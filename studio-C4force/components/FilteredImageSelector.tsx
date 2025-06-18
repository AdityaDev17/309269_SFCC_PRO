import React, {useEffect, useState} from 'react'
import {Autocomplete, Card, Stack, Text, Flex, Spinner} from '@sanity/ui'
import {set, unset} from 'sanity'
import {useClient, useFormValue} from 'sanity'

export default function FilteredImageSelector({onChange, value}) {
  const client = useClient()
  const mediaFolder = useFormValue(['mediaFolder'])
  const [options, setOptions] = useState<{id: string; url: string}[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      const mediaFolderRef = (mediaFolder as {_ref?: string})?._ref
      if (!mediaFolderRef) {
        setOptions([])
        return
      }

      setLoading(true)

      const result = await client.fetch(
        `*[_type == "mediaGroup" && _id == $id][0].assets[]{
          _type == "image" => {
            "url": asset->url,
            "id": asset._ref
          }
        }`,
        {id: mediaFolderRef},
      )

      setOptions(result?.filter(Boolean) || [])
      setLoading(false)
    }

    fetchImages()
  }, [mediaFolder])

  const handleChange = (refId: string) => {
    if (!refId) {
      onChange(unset())
    } else {
      onChange(
        set({
          _type: 'image',
          asset: {_type: 'reference', _ref: refId},
        }),
      )
    }
  }

  return (
    <Stack space={3}>
      {!mediaFolder || !(mediaFolder as {_ref?: string})?._ref ? (
        <Card tone="caution" padding={3} radius={2}>
          <Text>Please select a Media Folder first.</Text>
        </Card>
      ) : loading ? (
        <Flex align="center" justify="center" padding={2}>
          <Spinner muted />
        </Flex>
      ) : (
        <Autocomplete
          id="media-image-autocomplete"
          value={value?.asset?._ref || ''}
          onChange={handleChange}
          options={options.map((img) => ({
            value: img.id,
            title: img.url.split('/').pop()?.slice(0, 20) || img.id.slice(0, 12),
          }))}
          renderOption={(item) => {
            const img = options.find((o) => o.id === item.value)
            return (
              <Card padding={2} radius={2} shadow={1}>
                <Flex align="center" gap={3}>
                  <img
                    src={img?.url}
                    alt="preview"
                    style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: 4}}
                  />
                  <Text size={1}>{item.title}</Text>
                </Flex>
              </Card>
            )
          }}
          placeholder="-- Select an image --"
        />
      )}
    </Stack>
  )
}
