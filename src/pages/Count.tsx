import React, { useState, useEffect, Dispatch, FC } from 'react'
import './count.less'
import { connect } from '@/redux'

export const Count: FC<{
  number: number
  add: () => void
}> = props => {
  return (
    <div>
      <div>{props.number}</div>
      {/* <div className="test"></div> */}
      <button onClick={props.add}>+</button>
    </div>
  )
}

const mapStateToProps = (state: { number: number }, ownProps: any) => {
  return {
    number: state.number,
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<{ type: string; payload: number }>,
  ownProps: any,
) => {
  return {
    add: () =>
      dispatch({ type: 'INCREMENT', payload: ownProps?.addNumber ?? 1 }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Count)
