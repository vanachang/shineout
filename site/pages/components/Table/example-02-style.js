/**
 * cn - 边框和底纹
 * en - Style (bordered, striped)
 */
import React from 'react'
import { Table } from 'shineout'
import { getData } from 'doc/data/table'

export default function () {
  const columns = [
    {
      title: 'id',
      render: 'id',
      width: 36,
    },
    {
      title: 'Name',
      render: d => `${d.firstName} ${d.lastName}`,
    },
    {
      title: 'Country',
      render: 'country',
    },
    {
      title: 'Position',
      render: 'position',
    },
    {
      title: 'Office',
      render: 'office',
    },
  ]

  const data = getData(4)

  return (
    <Table keygen="id" striped bordered columns={columns} data={data} />
  )
}