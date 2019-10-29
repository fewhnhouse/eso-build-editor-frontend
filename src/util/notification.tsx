import React from 'react'
import Flex from '../components/Flex'
import { Input, Tooltip, Icon, message } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export const createNotification = (
  title: string,
  description: string,
  id: string,
  path: string
) => ({
  message: title,
  description: (
    <Flex direction='column' align='center' justify='center'>
      <div>{description}</div>
      <div>
        <Input
          addonAfter={
            <Tooltip title='Copy to clipboard'>
              <CopyToClipboard
                text={`${window.location.origin}/${path}/${id}`}
                onCopy={() => message.success('Copied to clipboard.')}
              >
                <Icon type='share-alt' />
              </CopyToClipboard>
            </Tooltip>
          }
          defaultValue={`${window.location.origin}/${path}/${id}`}
        />
      </div>
    </Flex>
  ),
})
