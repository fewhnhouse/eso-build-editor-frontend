import React, { ReactNode } from 'react'
import Flex from '../../../components/Flex'
import { Select, Typography } from 'antd'
import styled from 'styled-components'
import { SelectProps } from 'antd/lib/select'
import { IModification } from '../BuildStateContext'

const { Option } = Select

const StyledIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: 0px 10px;
`

const StyledFlex = styled(Flex)`
  width: 100%;
`

const StyledTitleFlex = styled(Flex)`
  flex: 1;
`

const StyledText = styled(Typography.Text)`
  color: rgba(0, 0, 0, 0.25);
  white-space: normal;
`

export interface ICustomSelectProps extends SelectProps {
  items: IModification[]
  className?: string
}
export const CustomSelect = ({
  items,
  className,
  ...props
}: ICustomSelectProps) => (
  <Select
    className={className}
    size='large'
    placeholder='Select a glyph'
    {...props}
  >
    {items.map((item, index) => (
      <Option value={item.type} key={index}>
        <Flex direction='column' justify='flex-start' align='flex-start'>
          <StyledFlex direction='row' justify='space-between' align='center'>
            {item.type}
            <StyledIcon
              src={`${process.env.REACT_APP_IMAGE_SERVICE}/${
                item.modificationType
              }s/${item.icon.trim()}`}
            />
          </StyledFlex>
          <StyledText>{item.description}</StyledText>
        </Flex>
      </Option>
    ))}
  </Select>
)

export interface ISelectWithTitleProps extends ICustomSelectProps {
  title: string | ReactNode
}
export const SelectWithTitle = ({
  items,
  title,
  className,
  ...props
}: ISelectWithTitleProps) => (
  <StyledTitleFlex
    className={className}
    direction='column'
    justify='flex-start'
    align='flex-start'
  >
    <Typography.Text strong>{title}</Typography.Text>
    <StyledCustomSelect items={items} {...props} />
  </StyledTitleFlex>
)

const StyledCustomSelect = styled(CustomSelect)`
  width: 100%;
`
