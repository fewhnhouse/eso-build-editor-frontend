import React, { useState, CSSProperties } from 'react'
import {
  List,
  Divider,
  Input,
  Select,
  Button,
  Card,
  Icon,
  Typography,
} from 'antd'
import styled from 'styled-components'
import { useTrail, animated } from 'react-spring'
import Flex from '../../../components/Flex'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Scrollbars from 'react-custom-scrollbars'
import { IRaidState } from '../../raid/RaidStateContext'
import { applicationAreas } from '../../build/RaceAndClass/RaceClass'
import { useDrag } from 'react-dnd'
const { Option } = Select
const { Text } = Typography

const Description = styled.div`
  font-size: ${props => props.theme.fontSizes.small};
  line-height: 1.5;
  color: ${(props: { newEffect?: boolean }) =>
    props.newEffect ? '#2ecc71' : 'rgba(0, 0, 0, 0.45)'};
  text-align: left;
`

const Title = styled.div`
  font-size: ${props => props.theme.fontSizes.normal};
  line-height: 1.5;
  font-weight: 500;
  color: ${props => props.theme.colors.grey.dark};
  margin-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
`

const StyledCard = styled(Card)`
  border-color: ${props => props.theme.mainBorderColor};
  background: 'white';
  border-width: 2px;
  margin: ${props => props.theme.margins.small};
  width: 90%;
  max-width: ${props => props.theme.widths.medium};
`

const ListContainer = styled.div`
  width: 100%;
  max-width: 420px;
  min-width: 370px;
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease-in-out;
`

const StyledFlexOuter = styled(Flex)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px;
  padding: ${props => props.theme.paddings.mini};
  transition: opacity 0.2s ease-in-out;
`

const StyledFlexInner = styled(Flex)`
  width: 100%;
`

const StyledInput = styled(Input)`
  width: 100%;
  margin: ${props => props.theme.paddings.small};
`

const StyledDivider = styled(Divider)`
  margin: ${props => props.theme.paddings.small} 0px;
`

const StyledFlexExpanded = styled(Flex)`
  margin: 0px ${props => props.theme.paddings.small};
  overflow: auto;
  width: 100%;
`

const StyledFlexExpandedSecond = styled(Flex)`
  margin: 0px ${props => props.theme.paddings.small};
  width: 100%;
`

const StyledScrollbars = styled(Scrollbars)`
  max-width: 420px;
  width: 100%;
  min-width: 370px;
`

const StyledList = styled(List)`
  height: 100%;
`

export function titleCase(str: string): string {
  let string = str.toLowerCase().split(' ')
  for (var i = 0; i < string.length; i++) {
    string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1)
  }
  return string.join(' ')
}

export const GET_RAIDS = gql`
  query raids(
    $where: RaidWhereInput
    $orderBy: RaidOrderByInput
    $first: Int
    $last: Int
    $skip: Int
    $after: String
    $before: String
  ) {
    raids(
      where: $where
      orderBy: $orderBy
      first: $first
      last: $last
      skip: $skip
      after: $after
      before: $before
    ) {
      id
      owner {
        id
        name
      }
      name
      applicationArea
      roles {
        id
        builds {
          id
        }
      }
    }
  }
`

interface IRaid {
  id: string
  owner?: {
    id: string
    name: string
  }
  name: string
  applicationArea: string
  roles: {
    id: string
    builds: {
      id: string
    }[]
  }[]
}

export default () => {
  const [selectedAppArea, setSelectedAppArea] = useState<string[]>([])
  const [expanded, setExpanded] = useState(false)
  const [searchText, setSearchText] = useState('')

  // const [, dispatch] = useContext(RaidContext);
  const { loading, data } = useQuery<{ raids: IRaid[] }, {}>(GET_RAIDS, {
    variables: {
      where: {
        AND: [
          {
            OR: [
              { name_contains: searchText },
              { name_contains: searchText.toLowerCase() },
              { name_contains: searchText.toUpperCase() },
              { name_contains: titleCase(searchText) },
            ],
          },
          {
            applicationArea_in: selectedAppArea.length
              ? selectedAppArea
              : applicationAreas.map(appArea => appArea.key),
          },
        ],
      },
    },
  })

  const handleAreaSelectChange = (classes: string[]) => {
    setSelectedAppArea(classes)
  }

  const handleExpandChange = () => {
    setExpanded(expanded => !expanded)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  return (
    <ListContainer>
      <>
        <StyledFlexOuter direction='column' justify='center' align='center'>
          <StyledFlexInner direction='row' justify='center' align='center'>
            <StyledInput
              placeholder='Search for Raids'
              allowClear
              value={searchText}
              onChange={handleSearchChange}
              size='large'
              type='text'
            />
            <Button
              size='large'
              icon={expanded ? 'shrink' : 'arrows-alt'}
              onClick={handleExpandChange}
            />
          </StyledFlexInner>
          {expanded && (
            <>
              <StyledDivider />
              <StyledFlexExpanded
                direction='row'
                justify='center'
                align='center'
              >
                <Select
                  mode='multiple'
                  style={{ width: '100%', margin: '5px 10px' }}
                  placeholder='Filter by Application Area...'
                  onChange={handleAreaSelectChange}
                >
                  {applicationAreas.map((applicationArea, index) => (
                    <Option key={applicationArea.key}>
                      {applicationArea.label}
                    </Option>
                  ))}
                </Select>
              </StyledFlexExpanded>
            </>
          )}
        </StyledFlexOuter>
        {data && data.raids && (
          <RaidsList raids={data.raids} loading={loading} />
        )}
      </>
    </ListContainer>
  )
}

interface IRaidsListProps {
  raids: IRaid[]
  loading: boolean
}
const RaidsList = ({ raids, loading }: IRaidsListProps) => {
  const trail = useTrail(raids.length, {
    opacity: 1,
    transform: 'translate(0px, 0px)',
    from: {
      opacity: 0,
      transform: 'translate(0px, -40px)',
    },
    config: { mass: 1, tension: 2000, friction: 300 },
  })

  return (
    <StyledScrollbars autoHide>
      <StyledList
        loading={loading}
        dataSource={trail}
        renderItem={(style: any, index) => {
          const raid = raids[index]
          const size = raid.roles.reduce((prev, curr) => {
            return prev + curr.builds.length
          }, 0)
          const applicationArea = applicationAreas.find(
            area => area.key === raid.applicationArea
          )

          return (
            <DraggableRaid
              size={size}
              applicationArea={applicationArea ? applicationArea.label : ''}
              raid={raid}
              style={style}
            />
          )
        }}
      />
    </StyledScrollbars>
  )
}

const DraggableRaid = ({
  raid,
  size,
  applicationArea,
  style,
}: {
  raid: IRaid
  size: number
  applicationArea: string
  style: CSSProperties
}) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'Raid',
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  return (
    <animated.div
      ref={drag}
      style={{ ...style, display: 'inline-flex', width: '100%' }}
    >
      <StyledCard key={raid.id} hoverable>
        <Title>
          <Flex direction='row' justify='space-between'>
            {raid.name ? raid.name : 'Unnamed raid'}
            <Text>
              <Icon type='team' />
              {size}
            </Text>
          </Flex>
        </Title>
        <StyledDivider />
        <Description>{applicationArea}</Description>
      </StyledCard>
    </animated.div>
  )
}
