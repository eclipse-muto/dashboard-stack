/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
//
//  Copyright (c) 2022 Composiv.ai, Eteration A.S. and others
//
// All rights reserved. This program and the accompanying materials
// are made available under the terms of the Eclipse Public License v2.0
// and Eclipse Distribution License v1.0 which accompany this distribution.
//
// The Eclipse Public License is available at
//    http://www.eclipse.org/legal/epl-v10.html
//    and the Eclipse Distribution License is available at
//    http://www.eclipse.org/org/documents/edl-v10.php.
//
// Contributors:
//    Composiv.ai, Eteration A.S. - initial API and implementation
//
//
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardTitle,
  CardBody,
  DataList,
  DataListItem,
  DataListCell,
  DataListItemRow,
  DataListItemCells,
  SearchInput
} from '@patternfly/react-core'

import { useLazyQuery } from '@apollo/client'
import { GETTHINGS } from '../../api/query/things'

const StackList = () => {
  const [stacks, setStacks] = useState<any[]>([])

  const [filterValue, setFilterValue] = React.useState('')
  const [getStacksWithIdLike] = useLazyQuery(GETTHINGS, {
    fetchPolicy: 'no-cache'
  })

  const getStacks = (nameLike) => {
    getStacksWithIdLike({
      variables: {
        filter: `and(eq(definition,"ai.composiv.sandbox.f1tenth:Stack:1.0.0"),like(thingId,"*${nameLike}*"))`
      },
      fetchPolicy: 'no-cache'
    }).then((result) => {
      if (result?.data?.things) {
        setStacks(result?.data?.things.items?.slice(0).reverse())
      }
    })
  }

  useEffect(() => {
    getStacks('*')
  }, [])

  const onFilterChange = (value, _event) => {
    setFilterValue(value)
    if (filterValue) getStacks(filterValue)
  }

  return (
    <>
      <Card style={{ textAlign: 'left', margin: '10px' }} component="div" >
        <CardTitle
          style={{
            textAlign: 'center',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            fontWeight: 500,
            background: 'black',
            color: 'white'
          }}
        >
         Stacks
        </CardTitle>
        <CardBody>
          <br />
          <SearchInput
            placeholder="Name includes"
            value={filterValue}
            onChange={onFilterChange}
            onClear={(evt) => onFilterChange('', evt)}
          />

          <DataList aria-label="single action data list example ">
            {stacks.map((stack) => {
              return (
                <DataListItem
                  aria-labelledby="single-action-item1"
                  key={stack.thingId}
                >
                  <DataListItemRow>
                    <DataListItemCells
                      dataListCells={[
                        <DataListCell key="primary content">
                          <span id="single-action-item1">{stack.thingId}</span>
                        </DataListCell>,
                        <DataListCell key="secondary content">
                          {stack.features.stack.properties?.name}
                        </DataListCell>
                      ]}
                    />

                  </DataListItemRow>
                </DataListItem>
              )
            })}
          </DataList>
        </CardBody>
      </Card>
    </>
  )
}

export default StackList
