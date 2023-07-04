import React from 'react'

import { Button, Upload, Typography, Input } from 'antd'
import { UserOutlined, TeamOutlined } from '@ant-design/icons'

const Demo = () => {
  return (
    <div>
      <Button type='primary'>
        Helloo <TeamOutlined />
      </Button>
      <Typography.Title level={1}>Hello Again</Typography.Title>
      <Typography.Paragraph level={1}>Hello Again</Typography.Paragraph>
      <Input size='large' placeholder='large size' prefix={<UserOutlined />} />
    </div>
  )
}

export default Demo
