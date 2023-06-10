import Popup from 'reactjs-popup'

const Settings = ({startBTN,onStartBTN,onFocusDuration,focusDuration,onBreakDuration,breakDuration}) => {


  return (
    <Popup
    trigger={<button className="button" > Settings </button>}
    modal
		onOpen = {()=>startBTN === true ? onStartBTN():0}
  >
    {close => (
      <div className="modal-pop">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Settings </div>
        <div className="content">
            <label htmlFor="pomoTime">Pomo Time (min):</label>
            <input id="pomoTime" value={focusDuration} onInput={e => onFocusDuration(Number(e.target.value))}/>

						<label htmlFor="breakTime">Break Time (min):</label>
            <input id="breakTime" value={breakDuration} onInput={e => onBreakDuration(Number(e.target.value))}/>

        </div>
      </div>
    )}
  </Popup>
  )
}

export default Settings