import React, { useState, CSSProperties } from 'react'
import { SkillImg, SkillFrame, ISkill } from './SkillSlot'
import { Popover, Modal } from 'antd'
import { SkillCardContent } from './SkillCard'
import { useMediaQuery } from 'react-responsive'

const DesktopSlot = ({
  skill,
  size,
}: {
  skill: ISkill
  size: 'small' | 'normal'
}) => {
  return (
    <Popover
      placement={'top'}
      mouseEnterDelay={0.5}
      content={<SkillCardContent skill={skill} />}
    >
      <SkillImg
        size={size}
        src={`${process.env.REACT_APP_IMAGE_SERVICE}/skills/${skill.icon}`}
      />
    </Popover>
  )
}

const MobileSlot = ({
  skill,
  size,
}: {
  skill: ISkill
  size: 'small' | 'normal'
}) => {
  const [visible, setVisible] = useState(false)
  const toggleModal = () => {
    setVisible((visible) => !visible)
  }

  return (
    <>
      <Modal
        bodyStyle={{ display: 'flex', justifyContent: 'center', margin: 0 }}
        visible={visible}
        onCancel={toggleModal}
        footer={null}
        title='Skill Details'
      >
        <SkillCardContent skill={skill} />
      </Modal>
      <SkillImg
        onClick={toggleModal}
        size={size}
        src={`${process.env.REACT_APP_IMAGE_SERVICE}/skills/${skill.icon}`}
      />
    </>
  )
}

const DisplaySlot = ({
  skill,
  style,
  size = 'small',
}: {
  skill?: ISkill
  style?: CSSProperties
  size?: 'small' | 'normal'
}) => {
  const isMobile = useMediaQuery({ maxWidth: 800 })

  return skill !== undefined && skill !== null ? (
    <SkillFrame size={size} style={style}>
      {isMobile ? (
        <MobileSlot skill={skill} size={size} />
      ) : (
        <DesktopSlot skill={skill} size={size} />
      )}
    </SkillFrame>
  ) : (
    <SkillFrame size={size} style={style} />
  )
}

export default DisplaySlot
