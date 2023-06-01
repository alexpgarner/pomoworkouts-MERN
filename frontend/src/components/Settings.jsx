import Popup from 'reactjs-popup'
import {useEffect} from 'react'
const Settings = ({onFocusDuration,focusDuration,onBreakDuration,breakDuration}) => {
	useEffect(()=>{
		console.log(input)
	},[focusDuration])
  return (
    <Popup
    trigger={<button className="button"> Settings </button>}
    modal
    position = 'left center'
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Settings </div>
        <div className="content">
            <label htmlFor="pomoTime">Pomo Time (min):</label>
            <input id="pomoTime" value={focusDuration} onInput={e => onFocusDuration(e.target.value)}/>

						<label htmlFor="breakTime">Break Time (min):</label>
            <input id="breakTime" value={breakDuration} onInput={e => onBreakDuration(e.target.value)}/>

        </div>
      </div>
    )}
  </Popup>
  )
}

export default Settings