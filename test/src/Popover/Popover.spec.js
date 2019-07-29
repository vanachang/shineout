import React from 'react'
import { mount } from 'enzyme'
import { Popover, Button } from 'shineout'
import { dispatchEvent } from '../../../src/utils/dom/element'

class P extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      v: true,
    }
  }

  render() {
    const { v } = this.state
    return (
      <Button>
        <Popover
          visible={v}
          onVisibleChange={c => {
            this.setState({ v: c })
          }}
        >
          popover
        </Popover>
        Hover
      </Button>
    )
  }
}

/* global SO_PREFIX */
describe('Popover[Base]', () => {
  test('should hover/click to render default', () => {
    jest.useFakeTimers()
    const modalText = 'Some Test Text'
    const wrapperHover = mount(
      <Button>
        <Popover>{modalText}</Popover>
        Hover
      </Button>
    )
    expect(document.querySelectorAll(`.${SO_PREFIX}-popover`).length).toBe(0)
    dispatchEvent(wrapperHover.find('button').instance(), 'mouseenter')
    jest.runAllTimers()
    expect(document.querySelector(`.${SO_PREFIX}-popover .${SO_PREFIX}-popover-content`).innerHTML).toBe(modalText)

    document.body.innerHTML = ''
    const wrapperClick = mount(
      <Button>
        <Popover trigger="click">{modalText}</Popover>
        Click
      </Button>
    )
    expect(document.querySelectorAll(`.${SO_PREFIX}-popover`).length).toBe(0)
    dispatchEvent(wrapperClick.find('button').instance(), 'click')
    jest.runAllTimers()
    expect(document.querySelector(`.${SO_PREFIX}-popover .${SO_PREFIX}-popover-content`).innerHTML).toBe(modalText)

    // render correctly
    expect(document.querySelector(`.${SO_PREFIX}-popover`).innerHTML).toMatchSnapshot()
  })

  test('render not compute position', () => {
    jest.useFakeTimers()
    const modalText = 'Some Test Text'
    const wrapper = mount(
      <Button>
        <Popover>{modalText}</Popover>
        Hover
      </Button>
    )
    const spy = jest.spyOn(wrapper.find('Panel').instance(), 'getPositionStr')

    expect(spy).not.toBeCalled()
    wrapper
      .find('Panel')
      .instance()
      .forceUpdate()
    expect(spy).not.toBeCalled()
  })

  test('should popover width controll', () => {
    jest.useFakeTimers()
    document.body.innerHTML = ''
    const wrapperHover = mount(<P />)
    expect(document.querySelectorAll(`.${SO_PREFIX}-popover`).length).toBe(1)
    dispatchEvent(wrapperHover.find('button').instance(), 'mouseleave')
    jest.runAllTimers()
    console.log(document.querySelector(`.${SO_PREFIX}-popover`).getAttribute('style'))
    expect(
      document
        .querySelector(`.${SO_PREFIX}-popover`)
        .getAttribute('style')
        .indexOf('display: none') > -1
    ).toBeTruthy()
  })
})
