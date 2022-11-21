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
import React, { useState } from 'react'
import {
  Card,
  CardTitle,
  CardBody,
  DataList,
  DataListItem,
  DataListCell,
  DataListItemRow,
  DataListItemCells,
  SearchInput,
  Spinner
} from '@patternfly/react-core'

import { GetStacksWitdIdLike } from '../../api/query/things'

const StackList = () => {
  const [nameLike, setNameLike] = useState('')
  const { data: sdata, isLoading: isStackListLoading } = GetStacksWitdIdLike({ nameLike })
  const stacks:any[] = sdata?.data?.items

  const onFilterChange = (value, _event) => {
    setNameLike(value)
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
            value={nameLike}
            onChange={onFilterChange}
            onClear={(evt) => onFilterChange('', evt)}
          />
          { isStackListLoading ? <Spinner isSVG size="lg" aria-label="Loading stacks" /> : null }

          <DataList aria-label="single action data list example ">
            {stacks?.map((stack) => {
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
