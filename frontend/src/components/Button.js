import PropTypes from 'prop-types'
const Button = ({color,text,onClick,className}) => {//can use props but we destructed props object for what we want passed in
    //console.log(color,text)
    return (
    <button 
        onClick = {onClick}
        className = {className}
        >
            {text}
    </button>
  )
}

Button.defaultProps = {
    color : 'steelblue',
}

Button.propTypes = {
    color : PropTypes.string,
    text : PropTypes.string,
    onClick : PropTypes.func
}
export default Button   