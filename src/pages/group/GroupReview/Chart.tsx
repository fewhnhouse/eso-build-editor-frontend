import React, { useState, useCallback, useMemo } from 'react'
import {
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  Legend,
  PolarRadiusAxis,
  Tooltip,
} from 'recharts'
import { IBuild } from '../../build/BuildStateContext'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { Select } from 'antd'
import { IRaid } from '../../raid/RaidStateContext'

interface IChartData {
  name: string
  id: string
  build: {
    name: string
  }
  membersCount: number
  raidMembersCount?: number
}
interface IChartProps {
  chartData: IChartData[]
}

const OWN_RAIDS = gql`
  query ownRaids(
    $where: RaidWhereInput
    $orderBy: RaidOrderByInput
    $first: Int
    $last: Int
    $skip: Int
    $after: String
    $before: String
  ) {
    ownRaids(
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
      roles {
        id
        builds {
          id
          build {
            id
            name
          }
        }
      }
    }
  }
`

export default ({ chartData }: IChartProps) => {
  const { data, error, loading } = useQuery(OWN_RAIDS)
  const [selectedRaid, setSelectedRaid] = useState<string | undefined>(
    undefined
  )

  const raid: any = useMemo(() => {
    return data && data.ownRaids.find((raid: IRaid) => raid.id === selectedRaid)
  }, [selectedRaid])

  console.log(raid)

  const builds: any[] = raid
    ? raid.roles.flatMap((role: any) =>
        role.builds.flatMap((sortedBuild: any) => sortedBuild.build)
      )
    : []
  const raidChartData: IChartData[] = builds.reduce((prev, curr) => {
    const index = prev.findIndex((build: any) => build.name === curr.name)
    if (index > -1) {
      return prev.map((build: any, index: number) => ({
        ...build,
        membersCount: build.raidMembersCount + 1,
      }))
    } else {
      return [...prev, { ...curr, raidMembersCount: 1 }]
    }
  }, [])

  const combinedChartData = chartData.map(data => {
    const raidDataPoint = raidChartData.find(
      dataPoint => dataPoint.id === data.id
    )
    if (raidDataPoint) {
      return {
        ...data,
        raidMembersCount: raidDataPoint.membersCount,
      }
    } else {
      return data
    }
  })

  console.log(raidChartData, chartData, combinedChartData)
  const onChange = (value: string) => {
    setSelectedRaid(value)
    console.log(value)
  }

  return (
    <>
      <Select
        loading={loading}
        showSearch
        value={selectedRaid}
        size='large'
        style={{ width: '100%' }}
        placeholder='Select a person'
        optionFilterProp='children'
        onChange={onChange}
        filterOption
      >
        {data &&
          data.ownRaids.map((ownRaid: IRaid) => (
            <Select.Option key={ownRaid.id} value={ownRaid.id}>
              {ownRaid.name}
            </Select.Option>
          ))}
      </Select>

      <RadarChart
        outerRadius={200}
        width={1200}
        height={700}
        data={combinedChartData}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey='name' />
        <PolarRadiusAxis angle={30} />
        <Radar
          dot
          name='ESO'
          dataKey='membersCount'
          stroke='#82ca9d'
          fill='#82ca9d'
          fillOpacity={0.6}
        />
        {raid && (
          <Radar
            dot
            name={raid.name}
            dataKey='raidMembersCount'
            stroke='#8884d8'
            fill='#8884d8'
            fillOpacity={0.6}
          />
        )}
        <Tooltip />
        <Legend />
      </RadarChart>
    </>
  )
}
